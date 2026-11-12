/*
 * The breach story, played imperatively on the SVG that Breach.tsx renders (per-frame writes go
 * straight to the DOM, never through React state).
 *   POST /me/become-admin, ssh admin@votre-site.ch: the arrow slams into the slope, squashes,
 *     bounces back elastically and settles, red; the mountain shudders and a little snow dust
 *     puffs off; the label shakes red and "403 · refusé" shows under the line.
 *   GET /admin/recover: the arrow digs through along the crack, fast: the mountain vibrates, chips
 *     of rock fly out behind the tip, the summit tears loose and springs up; the arrow comes out on
 *     the right with a green trace, and "faille trouvée" appears.
 * The result holds 10 s, then the mountain closes and the story plays again.
 * States are written as `data-*` attributes, which Breach.tsx styles; parts are found by `data-part`.
 */
import {
  ATTEMPTS,
  CHAR,
  CRACK,
  EXIT_X,
  LIFT,
  PEAK,
  ROCK,
  X0,
  Y,
  type Attempt,
  type Query
} from './scene'

/** Matches `useTimers()`: timeouts that are all cancelled together. */
export interface Timers {
  at: (ms: number, fn: () => void) => void
  clear: () => void
}

export interface Breach {
  /** Sizes the pills to their text; again once the web font has loaded. */
  layout: () => void
  /** Plays the story from the start, in a loop. */
  play: () => void
  /** Stops and shows the closed mountain with the first request. */
  idle: () => void
  /** Stops and shows the outcome, for reduced motion. */
  showResult: () => void
  /** Cancels every pending frame and timeout. */
  stop: () => void
}

type Verdict = 'rejected' | 'through'
type Placement = { cx: number } | { right: number }
type Easing = (t: number) => number

const SVG_NS = 'http://www.w3.org/2000/svg'
/* pills are sized from the measured text, with the same padding on both sides */
const PAD = 13
const ICON = 12
const GAP = 8
const GRAVITY = 520
const HOLD_MS = 10000
const STATUS: Record<Verdict, string> = {
  rejected: '403 · refusé',
  through: '200 · accès admin'
}
const BREAKTHROUGH = ATTEMPTS[ATTEMPTS.length - 1]

const linear: Easing = t => t
/** Keeps accelerating right up to the impact. */
const easeIn: Easing = t => t * t * t
const smoothstep: Easing = t => t * t * (3 - 2 * t)
/** A hard first bite, then steady and fast. */
const dig: Easing = t => (t < 0.15 ? t * 2.2 : 0.33 + (t - 0.15) * 0.788)
const rnd = (a: number, b: number) => a + Math.random() * (b - a)
const deg = (rad: number) => (rad * 180) / Math.PI

/** Sets `data-<key>`, or removes it when there is no value. */
const setData = (el: Element, key: string, value?: string) => {
  if (value === undefined) el.removeAttribute(`data-${key}`)
  else el.setAttribute(`data-${key}`, value)
}

const textWidth = (text: SVGTextContentElement) =>
  text.getComputedTextLength() || (text.textContent ?? '').length * CHAR

export const createBreach = (
  svg: SVGSVGElement,
  { at, clear }: Timers
): Breach => {
  const find = <T extends Element>(selector: string, root: Element = svg) => {
    const el = root.querySelector<T>(selector)
    if (!el) throw new Error(`Breach: missing ${selector}`)
    return el
  }
  const part = <T extends Element>(name: string, root?: Element) =>
    find<T>(`[data-part="${name}"]`, root)
  const shake = part<SVGGElement>('shake')
  const summit = part<SVGGElement>('summit')
  const trace = part<SVGPathElement>('trace')
  const arrow = part<SVGGElement>('arrow')
  const chips = part<SVGGElement>('chips')
  const bubble = part<SVGGElement>('bubble')
  const bubbleRect = find<SVGRectElement>('rect', bubble)
  const bubbleText = find<SVGTextElement>('text', bubble)
  const method = part<SVGTSpanElement>('method')
  const path = part<SVGTSpanElement>('path')
  const status = part<SVGTextElement>('status')
  const name = part<SVGGElement>('name')
  const found = part<SVGGElement>('found')

  const traceLength = trace.getTotalLength()
  /** Where the crack ends on the trace (0..1); the rest is the way out. */
  const crackEnd =
    (traceLength - (EXIT_X - CRACK[CRACK.length - 1][0])) / traceLength

  /* ---- time: a stopped frame or timeout never fires, so a story awaiting it just ends ---- */
  const frames = new Set<number>()
  const nextFrame = (fn: FrameRequestCallback) => {
    const id = requestAnimationFrame(now => {
      frames.delete(id)
      fn(now)
    })
    frames.add(id)
  }
  const tween = (
    ms: number,
    fn: (eased: number, k: number) => void,
    ease = linear
  ) =>
    new Promise<void>(resolve => {
      const t0 = performance.now()
      const step = (now: number) => {
        const k = Math.min(1, (now - t0) / ms)
        fn(ease(k), k)
        if (k < 1) nextFrame(step)
        else resolve()
      }
      nextFrame(step)
    })
  const wait = (ms: number) => new Promise<void>(resolve => at(ms, resolve))
  const stop = () => {
    clear()
    frames.forEach(id => cancelAnimationFrame(id))
    frames.clear()
  }

  /* ---- layout ---- */
  const fitBubble = () =>
    bubbleRect.setAttribute(
      'width',
      (textWidth(bubbleText) + PAD * 2).toFixed(1)
    )
  const setQuery = (query: Query) => {
    method.textContent = query.method
    path.textContent = ` ${query.path}`
    fitBubble()
  }
  /** An icon pill, centred on `cx` or right-aligned on `right`. */
  const fitPill = (pill: SVGGElement, place: Placement) => {
    const rect = find<SVGRectElement>('rect', pill)
    const icon = part<SVGGElement>('icon', pill)
    const text = find<SVGTextElement>('text', pill)
    const w = PAD + ICON + GAP + textWidth(text) + PAD
    const x = 'cx' in place ? place.cx - w / 2 : place.right - w
    const cy =
      Number(rect.getAttribute('y')) + Number(rect.getAttribute('height')) / 2
    rect.setAttribute('x', x.toFixed(1))
    rect.setAttribute('width', w.toFixed(1))
    icon.setAttribute(
      'transform',
      `translate(${(x + PAD + ICON / 2).toFixed(1)} ${cy})`
    )
    text.setAttribute('x', (x + PAD + ICON + GAP).toFixed(1))
  }
  const layout = () => {
    fitPill(name, { cx: PEAK[0] })
    fitPill(found, { right: EXIT_X })
    fitBubble()
  }

  /* ---- one frame of the scene ---- */
  const setBubble = (state?: Verdict | 'swap') =>
    setData(bubble, 'state', state)
  /** No state hides the arrow. */
  const setArrow = (state?: Verdict | 'flying') =>
    setData(arrow, 'state', state)
  const setStatus = (verdict?: Verdict) => {
    status.textContent = verdict ? STATUS[verdict] : ''
    setData(status, 'verdict', verdict)
  }
  const setFound = (shown: boolean) =>
    found.toggleAttribute('data-shown', shown)
  const showVerdict = (verdict: Verdict) => {
    setArrow(verdict)
    setBubble(verdict)
    setStatus(verdict)
  }
  const hideArrow = () => {
    setArrow()
    setStatus()
  }
  const arrowAt = (x: number, y: number, angle = 0, sx = 1, sy = 1) =>
    arrow.setAttribute(
      'transform',
      `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${angle.toFixed(1)}) scale(${sx.toFixed(3)} ${sy.toFixed(3)})`
    )
  /** The point at `f` (0..1) along the trace, with the heading there. */
  const onTrace = (f: number): [x: number, y: number, angle: number] => {
    const l = traceLength * f
    const q = trace.getPointAtLength(l)
    const b = trace.getPointAtLength(Math.max(0, l - 3))
    return [q.x, q.y, l < 3 ? 0 : deg(Math.atan2(q.y - b.y, q.x - b.x))]
  }
  const setTrace = (f: number) => {
    trace.style.strokeDashoffset = (1 - f).toFixed(4)
  }
  const setShake = (dx: number, dy: number) => {
    shake.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`
  }
  /** k: 0 closed -> 1 fully lifted; wobble adds a little extra tilt. */
  const setSummit = (k: number, wobble = 0) => {
    summit.style.transform = `translate(${(LIFT.dx * k).toFixed(2)}px, ${(LIFT.dy * k).toFixed(2)}px) rotate(${(LIFT.deg * k + wobble).toFixed(3)}deg)`
  }

  /** A chip of rock (or a puff of snow) flung from (x, y) at (vx, vy), falling under gravity. */
  const chip = (
    x: number,
    y: number,
    vx: number,
    vy: number,
    color: string,
    s: number,
    ms: number
  ) => {
    const el = document.createElementNS(SVG_NS, 'path')
    el.setAttribute(
      'd',
      Math.random() < 0.5
        ? `M${-s} ${-s * 0.7}L${s} ${-s * 0.4}L${s * 0.2} ${s}Z`
        : `M${-s} ${-s}H${s * 0.8}V${s * 0.8}H${-s}Z`
    )
    el.setAttribute('fill', color)
    chips.appendChild(el)
    const spin = rnd(-540, 540)
    const keyframes = [0, 0.25, 0.5, 0.75, 1].map(k => {
      const t = (k * ms) / 1000
      const px = x + vx * t
      const py = y + vy * t + 0.5 * GRAVITY * t * t
      return {
        transform: `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) rotate(${(spin * k).toFixed(0)}deg)`,
        opacity: k < 0.6 ? 1 : 1 - (k - 0.6) / 0.4
      }
    })
    el.animate(keyframes, { duration: ms, easing: 'linear', fill: 'forwards' })
    at(ms + 60, () => el.remove())
  }

  const reset = () => {
    setFound(false)
    setBubble()
    hideArrow()
    setTrace(0)
    setSummit(0)
    setShake(0, 0)
    chips.replaceChildren()
  }

  /* ---- the story ---- */
  /** The arrow flies along the level line and hits the slope at full speed. */
  const approach = () => {
    arrowAt(X0, Y)
    setArrow('flying')
    return tween(620, f => arrowAt(X0 + (CRACK[0][0] - X0) * f, Y), easeIn)
  }

  const bounceOff = async () => {
    const [ix] = CRACK[0]
    showVerdict('rejected')
    for (let i = 0; i < 7; i++) {
      const snow = i % 3 ? '#ffffff' : '#9fd8e8'
      chip(
        ix - 2,
        Y + rnd(-3, 3),
        rnd(-130, -40),
        rnd(-160, -50),
        snow,
        rnd(1.4, 2.4),
        rnd(420, 620)
      )
    }
    /* elastic rebound off the wall: decaying bounces, squashed on contact; the mountain shudders */
    await tween(760, t => {
      const d = 30 * Math.exp(-5 * t) * Math.abs(Math.sin(2.5 * Math.PI * t))
      const squash = 1 - 0.38 * Math.exp(-28 * t)
      arrowAt(ix - d, Y, 0, squash, 1 + (1 - squash) * 0.6)
      const s = 2.2 * Math.exp(-14 * t)
      setShake(Math.sin(t * 90) * s, Math.cos(t * 70) * s * 0.5)
    })
    setShake(0, 0)
  }

  /** Chips fly back out of the hole, behind the tip. */
  const debris = (x: number, y: number, heading: number) => {
    const a = ((heading + 180 + rnd(-60, 60)) * Math.PI) / 180
    const speed = rnd(150, 320)
    const color = ROCK[(Math.random() * ROCK.length) | 0]
    chip(
      x,
      y,
      Math.cos(a) * speed,
      Math.sin(a) * speed - 120,
      color,
      rnd(1.8, 3.4),
      rnd(520, 820)
    )
  }

  const breakThrough = async () => {
    showVerdict('through')
    /* digging: fast, the mountain vibrates, chips fly back out of the hole, the summit tears loose */
    let lastChip = 0
    await tween(
      820,
      (f, k) => {
        const p = f * crackEnd
        setTrace(p)
        const [x, y, heading] = onTrace(p)
        arrowAt(x, y, heading)
        const v = 2.4 * (1 - k * 0.4)
        setShake(rnd(-v, v), rnd(-v, v) * 0.6)
        setSummit(Math.min(1, k * 0.7), rnd(-0.4, 0.4))
        const now = performance.now()
        if (now - lastChip > 30) {
          lastChip = now
          debris(x, y, heading)
          debris(x, y, heading)
        }
      },
      dig
    )
    setShake(0, 0)
    setFound(true) // the finding shows as the arrow comes out next to it
    /* out the other side, while the summit springs to rest */
    const out = tween(260, f => {
      const p = crackEnd + (1 - crackEnd) * f
      setTrace(p)
      const [x, y] = onTrace(p)
      arrowAt(x, y)
    })
    const settle = tween(700, t =>
      setSummit(1 - 0.3 * Math.exp(-6 * t) * Math.cos(t * 4 * Math.PI))
    ).then(() => setSummit(1))
    await Promise.all([out, settle])
  }

  const tryAttempt = async (attempt: Attempt) => {
    setBubble('swap') // the old request fades out before the new one is written
    at(160, () => {
      setQuery(attempt)
      setBubble()
    })
    await wait(520)
    await approach()
    if (attempt.through) {
      await breakThrough()
      return
    }
    await bounceOff()
    at(500, hideArrow)
    await wait(800)
  }

  /** The mountain closes back up before the story starts again. */
  const close = () => {
    setFound(false)
    hideArrow()
    setBubble('swap')
    return tween(
      500,
      f => {
        setSummit(1 - f)
        setTrace(1 - f)
      },
      smoothstep
    )
  }

  const story = async () => {
    for (;;) {
      stop()
      reset()
      for (const attempt of ATTEMPTS) await tryAttempt(attempt)
      await wait(HOLD_MS)
      await close()
    }
  }

  return {
    layout,
    play: () => {
      story().catch(reportError)
    },
    idle: () => {
      stop()
      reset()
      setQuery(ATTEMPTS[0])
    },
    showResult: () => {
      stop()
      reset()
      setQuery(BREAKTHROUGH)
      setTrace(1)
      setSummit(1)
      const [x, y] = onTrace(1)
      arrowAt(x, y)
      setFound(true)
      showVerdict('through')
    },
    stop
  }
}
