import { type RefObject, useEffect } from 'react'
import { useTimers } from '@/hooks/useTimers'
import { PEAKS } from './peaks'

export interface IntroRefs {
  card: RefObject<HTMLElement>
  lines: RefObject<SVGSVGElement>
  pen: RefObject<SVGGElement>
  tags: RefObject<HTMLElement[]>
}

/** The page's one motion curve (`ease-quart`, `--e` in Hero.css). */
const ease = cubicBezier(0.25, 1, 0.5, 1)
/** Never wait longer than this for the fonts before starting. */
const FONTS_WAIT = 600
/** Along-the-ridge samples used to find where the pen meets each summit. */
const SAMPLES = 500

/** A CSS `cubic-bezier()` timing function (Newton's method on x, then y). */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const X = (t: number) => ((ax * t + bx) * t + cx) * t
  const Y = (t: number) => ((ay * t + by) * t + cy) * t
  const dX = (t: number) => (3 * ax * t + 2 * bx) * t + cx
  return (x: number) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let t = x
    for (let i = 0; i < 6; i++) {
      const d = dX(t)
      if (Math.abs(d) < 1e-6) break
      t -= (X(t) - x) / d
    }
    return Y(Math.min(1, Math.max(0, t)))
  }
}

/** Where along `path` (0..1) it passes closest to (x, y). */
const nearestFraction = (path: SVGPathElement, x: number, y: number) => {
  const length = path.getTotalLength()
  let best = 0
  let bestDistance = Infinity
  for (let i = 0; i <= SAMPLES; i++) {
    const q = path.getPointAtLength((length * i) / SAMPLES)
    const distance = (q.x - x) ** 2 + (q.y - y) ** 2
    if (distance < bestDistance) {
      bestDistance = distance
      best = i / SAMPLES
    }
  }
  return best
}

/**
 * The homepage intro, about 1.5 s once the fonts are in (or after 600 ms at most). Runs only
 * when the inline script in index.html set `html.intro` (not with reduced motion):
 *   0     title lines rise, then the faces, the sentence and the actions (CSS, `.intro-go`)
 *   250   a pen traces the front ridge left to right (1100 ms); as it passes each summit,
 *         that summit's label rises and its shading line and snow edge draw in (420 ms)
 *   330   the back ridge traces behind it (1100 ms)
 *   1050  the light tint fades in under the drawing (`.tint-on`)
 *   1800  done (`.intro-end`)
 * Without the traced drawing (phones, tablets) the labels just arrive in order. Any scroll
 * finishes everything at once.
 */
export const useIntroPen = ({ card, lines, pen, tags }: IntroRefs) => {
  const { at, clear } = useTimers()

  useEffect(() => {
    const root = document.documentElement
    const range = card.current
    const svg = lines.current
    const tip = pen.current
    const labels = tags.current ?? []
    if (!root.classList.contains('intro') || !range || !svg || !tip) return

    const frames = new Set<number>()
    const frame = (fn: FrameRequestCallback) => {
      const id = requestAnimationFrame(now => {
        frames.delete(id)
        fn(now)
      })
      frames.add(id)
    }
    const cancelFrames = () => {
      frames.forEach(id => cancelAnimationFrame(id))
      frames.clear()
    }

    let done = false
    const finish = () => {
      if (done) return
      done = true
      clear()
      cancelFrames()
      window.removeEventListener('scroll', onScroll)
      root.classList.add('intro-go', 'intro-end')
      svg.querySelectorAll<SVGElement>('[data-line]').forEach(line => {
        line.style.strokeDashoffset = '0'
      })
      tip.classList.add('is-off')
      range.classList.add('tint-on')
      labels.forEach(label => label.classList.add('is-on'))
    }
    // any scroll means the visitor wants the content
    const onScroll = () => {
      if (window.scrollY > 4) finish()
    }

    // already played (e.g. the hero mounts again after a route change): show the end state
    if (root.classList.contains('intro-end')) {
      finish()
      return
    }

    /** Draws a `pathLength=1` stroke in: dash offset 1 → 0. */
    const draw = (
      path: SVGPathElement | null | undefined,
      delay: number,
      duration: number,
      onTick?: (progress: number) => void
    ) => {
      if (!path) return
      at(delay, () => {
        const t0 = performance.now()
        const step = (now: number) => {
          if (done) return
          const k = Math.min(1, (now - t0) / duration)
          const e = ease(k)
          path.style.strokeDashoffset = (1 - e).toFixed(4)
          onTick?.(e)
          if (k < 1) frame(step)
        }
        frame(step)
      })
    }

    const start = () => {
      if (done) return
      // reloaded mid-page: no intro
      if (window.scrollY > 4) {
        finish()
        return
      }
      root.classList.add('intro-go')
      const drawn =
        getComputedStyle(svg).display !== 'none' &&
        !root.classList.contains('no-morph')
      const main = svg.querySelector<SVGPathElement>('[data-line=main]')

      if (!drawn || !main) {
        labels.forEach((label, i) =>
          at(450 + i * 80, () => label.classList.add('is-on'))
        )
        at(1200, finish)
        return
      }

      const back = svg.querySelector<SVGPathElement>('[data-line=back]')
      const spines = svg.querySelectorAll<SVGPathElement>('[data-line=spine]')
      const snow = svg.querySelectorAll<SVGPathElement>('[data-line=snow]')
      const length = main.getTotalLength()
      // where along the ridge each summit sits, so its label appears exactly when the pen gets there
      const reachAt = PEAKS.map(({ x, y }) => nearestFraction(main, x, y))
      const reached = new Set<number>()
      const reach = (i: number) => {
        if (reached.has(i)) return
        reached.add(i)
        labels[i].classList.add('is-on')
        draw(spines[i], 0, 420)
        draw(snow[i], 60, 420)
      }

      at(220, () => tip.classList.remove('is-off'))
      draw(main, 250, 1100, e => {
        const q = main.getPointAtLength(length * e)
        tip.setAttribute(
          'transform',
          `translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})`
        )
        reachAt.forEach((fraction, i) => {
          if (e >= fraction) reach(i)
        })
        if (e >= 0.995) tip.classList.add('is-off')
      })
      draw(back, 330, 1100)
      at(1050, () => range.classList.add('tint-on'))
      at(1800, finish)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    // start once the fonts are in (no reflow mid-animation) or the wait is over, whichever
    // comes first, two frames after that
    let queued = false
    const queueStart = () => {
      if (done || queued) return
      queued = true
      frame(() => frame(start))
    }
    at(FONTS_WAIT, queueStart)
    document.fonts.ready.then(queueStart, reportError)

    return () => {
      done = true
      clear()
      cancelFrames()
      window.removeEventListener('scroll', onScroll)
    }
  }, [card, lines, pen, tags, at, clear])
}
