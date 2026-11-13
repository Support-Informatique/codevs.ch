import { useCallback, useRef } from 'react'
import { Pulse } from '@/components/home/shared/Icons'
import { cx } from '@/components/home/shared/ui'
import { prefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { easeInOut, flag, reflow, restart, type Scheduler } from './scheduler'
import { cap, panel, stage, stageSvg } from './stage'
import { need, type SceneProps, type Timeline, useScene } from './useScene'

/** Each site sends a heartbeat this often, in ms… */
const PERIOD = 2800
/** …which takes this long to climb to the summit. */
const TRAVEL = 1100
/** The sites take turns: site i sends this many ms after site 0. */
const STAGGER = 700

/**
 * The client sites on the hills around the mountain, as cards (`left`/`top` in the 640 × 400
 * stage), each linked to the Wigud station on the summit (320, 150) by a curve that starts at
 * the card's inner edge. The third one goes down in the story.
 */
const SITES = [
  {
    site: 'jeunessecharmey.ch',
    left: 22,
    top: 104,
    d: 'M192 126Q258 100 320 150'
  },
  { site: 'pay-event.ch', left: 34, top: 226, d: 'M204 248Q246 174 320 150' },
  {
    site: 'schweizersolaire.ch',
    left: 448,
    top: 104,
    d: 'M448 126Q382 100 320 150'
  },
  { site: '10kmpayerne.ch', left: 436, top: 226, d: 'M436 248Q394 174 320 150' }
] as const
const DOWN = 2
const DOWN_SITE = SITES[DOWN].site

const ALL_UP = 'Tous les sites en ligne'
const FIXED = 'De retour en ligne en 4 min'

type Tone = 'bad' | 'warn' | 'ok'

/** Sets or clears `data-state`, which the element styles with `data-[state=…]:` variants. */
const setState = (el: HTMLElement | SVGElement, state?: string) => {
  if (state) el.dataset.state = state
  else delete el.dataset.state
}

const hide = (dot: SVGCircleElement) => dot.setAttribute('opacity', '0')

/** Puts a dot at `p` (0 → 1) along a path. */
const place = (dot: SVGCircleElement, path: SVGPathElement, p: number) => {
  const point = path.getPointAtLength(path.getTotalLength() * p)
  dot.setAttribute('cx', point.x.toFixed(1))
  dot.setAttribute('cy', point.y.toFixed(1))
  dot.setAttribute('opacity', '1')
}

/**
 * 4 · Hébergement & suivi: our sites around the mountain send a heartbeat up to Wigud on the
 * summit. One stops; Wigud raises the alert, a fix goes down and the site is back online.
 */
const HostScene = (props: SceneProps) => {
  const ill = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const lightRefs = useRef<(HTMLElement | null)[]>([])
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const beatRefs = useRef<(SVGCircleElement | null)[]>([])
  const fixRef = useRef<SVGCircleElement>(null)
  const ringRef = useRef<HTMLSpanElement>(null)
  const noteRef = useRef<HTMLDivElement>(null)
  const noteTextRef = useRef<HTMLSpanElement>(null)
  const statusRef = useRef<HTMLSpanElement>(null)

  const timeline = useCallback(({ at, every, tween }: Scheduler): Timeline => {
    const root = need(ill)
    const all = <T,>(refs: (T | null)[]) =>
      refs.map(el => need({ current: el }))
    const cards = all(cardRefs.current)
    const lights = all(lightRefs.current)
    const words = all(wordRefs.current)
    const paths = all(pathRefs.current)
    const beats = all(beatRefs.current)
    const fix = need(fixRef)
    const ring = need(ringRef)
    const note = need(noteRef)
    const noteText = need(noteTextRef)
    const status = need(statusRef)

    const setCard = (i: number, word: string, state?: 'down' | 'fix') => {
      setState(cards[i], state)
      setState(paths[i], state)
      words[i].textContent = word
    }
    const setStatus = (text: string, tone?: Tone) => {
      status.textContent = text
      setState(status, tone)
    }
    const setNote = (text: string, tone: Tone) => {
      flag(note, 'on')
      setState(note, tone)
      noteText.textContent = text
    }

    /** Sites that send nothing (the one that is down), and when each may send again. */
    const silent = new Set<number>()
    const resumeAt = SITES.map(() => 0)

    /**
     * From `start` on, every site sends a heartbeat each PERIOD: its light pulses, a dot
     * climbs to the summit and the station pings as it arrives. Runs until the scene stops.
     */
    const heartbeat = (start: number) => {
      const sent = SITES.map(() => -1)
      const arrived = SITES.map(() => -1)
      every(time => {
        SITES.forEach((_, i) => {
          const local = time - start - i * STAGGER
          const cycle = Math.floor(local / PERIOD)
          const leftAt = start + i * STAGGER + cycle * PERIOD
          if (local < 0 || silent.has(i) || leftAt < resumeAt[i]) {
            hide(beats[i])
            return
          }
          const phase = local - cycle * PERIOD
          if (phase < TRAVEL) {
            if (sent[i] !== cycle) {
              sent[i] = cycle
              restart(lights[i], 'beat')
            }
            place(beats[i], paths[i], easeInOut(phase / TRAVEL))
            return
          }
          hide(beats[i])
          if (sent[i] === cycle && arrived[i] !== cycle) {
            arrived[i] = cycle
            restart(ring, 'ping')
          }
        })
        return true
      })
    }

    const reset = () => {
      SITES.forEach((_, i) => {
        setCard(i, 'En ligne')
        hide(beats[i])
        flag(lights[i], 'beat', false)
      })
      hide(fix)
      flag(ring, 'ping', false)
      flag(root, 'alert', false)
      flag(note, 'on', false)
      setState(note)
      setStatus(ALL_UP)
    }

    const play = () => {
      reset()
      flag(root, 'on', false)
      reflow(root)
      at(100, () => flag(root, 'on'))
      heartbeat(performance.now() + 900)

      // the site stops answering: it goes red and sends nothing more
      at(3900, () => {
        silent.add(DOWN)
        setCard(DOWN, 'Hors ligne', 'down')
        setStatus('1 site hors ligne', 'bad')
        flag(root, 'alert')
      })
      // Wigud alerts us
      at(4600, () => setNote('Le site ne répond plus', 'bad'))
      // the fix goes down from the summit
      at(5700, () => {
        setCard(DOWN, 'Réparation…', 'fix')
        setStatus('Réparation en cours', 'warn')
        flag(root, 'alert', false)
        tween(1000, p => place(fix, paths[DOWN], 1 - p))
      })
      // back online, and it beats again
      at(6800, () => {
        hide(fix)
        setCard(DOWN, 'En ligne')
        restart(lights[DOWN], 'beat')
        setStatus(ALL_UP, 'ok')
        setNote(FIXED, 'ok')
        silent.delete(DOWN)
        resumeAt[DOWN] = performance.now() + 400
      })
    }

    const done = () => {
      reset()
      flag(root, 'on')
      setStatus(ALL_UP, 'ok')
      setNote(FIXED, 'ok')
      // the heartbeats are ambient: they keep going, unless motion is reduced
      if (!prefersReducedMotion()) heartbeat(performance.now() + 400)
    }

    return { play, done }
  }, [])

  useScene(ill, props, timeline)

  return (
    <div
      className={cx(panel, 'group/host')}
      ref={ill}
      role='img'
      aria-label={`Suivi des sites : quatre sites envoient régulièrement un signal à Wigud, notre outil de surveillance. ${DOWN_SITE} ne répond plus, Wigud nous alerte, le site est réparé et de nouveau en ligne.`}
    >
      <div className={stage} aria-hidden='true'>
        <svg className={stageSvg} viewBox='0 0 640 400'>
          <path
            d='M0 400V340L54 322L108 336L170 306L238 342L300 330L372 346L438 312L500 336L560 318L640 334V400Z'
            fill='url(#g-hill-a)'
          />
          <use
            href='#g-peak'
            transform='translate(320 150) scale(.7) translate(-300 -72)'
          />
          <path
            d='M0 400V356L80 346L170 340L200 332L260 336L320 330L380 336L440 328L470 338L560 348L640 344V400Z'
            fill='url(#g-hill-b)'
          />
          <line
            className='stroke-ink stroke-[1.2] opacity-50'
            x1='320'
            y1='88'
            x2='320'
            y2='146'
          />
          {/* the links from each site up to the summit */}
          {SITES.map(({ site, d }, i) => (
            <path
              key={site}
              ref={el => {
                pathRefs.current[i] = el
              }}
              d={d}
              className='fill-none stroke-[#a9c6d1] stroke-[1.3] opacity-0 [stroke-dasharray:3_5] [transition:opacity_.6s_var(--ease-brand)_.35s,stroke_.3s] group-data-on/host:opacity-100 data-[state=down]:stroke-[#e5484d] data-[state=fix]:stroke-primary'
            />
          ))}
          {/* the heartbeats: one dot per site, moved along its link by script */}
          {SITES.map(({ site }, i) => (
            <circle
              key={site}
              ref={el => {
                beatRefs.current[i] = el
              }}
              r='3.5'
              opacity='0'
              className='fill-white stroke-cyan-500 stroke-2 [filter:drop-shadow(0_0_4px_rgba(132,210,229,.95))]'
            />
          ))}
          {/* the fix, going down to the site */}
          <circle
            ref={fixRef}
            r='5'
            opacity='0'
            className='fill-primary stroke-white stroke-2 [filter:drop-shadow(0_0_6px_rgba(15,122,168,.6))]'
          />
          {/* the station's light on the summit */}
          <circle
            cx='320'
            cy='150'
            r='3.5'
            className='fill-white stroke-cyan-500 stroke-2 [transition:stroke_.3s] group-data-alert/host:stroke-[#e5484d]'
          />
        </svg>

        {/* the station pings each time a heartbeat reaches it */}
        <span
          ref={ringRef}
          className='absolute top-37.5 left-80 -mt-5 -ml-5 size-10 rounded-full border-[1.5px] border-cyan-500 opacity-0 data-ping:animate-ripple group-data-alert/host:border-[#e5484d] group-data-alert/host:animate-ripple-loop'
        />
        <span className='absolute top-15 left-80 z-3 flex h-7 -translate-x-1/2 items-center gap-1.5 rounded-[14px] bg-white pr-3.25 pl-2.5 font-mono text-[11.5px] whitespace-nowrap text-fg shadow-[0_0_0_1px_#d3e1e7,0_6px_16px_-10px_rgba(10,48,68,.35)] [transition:color_.3s,box-shadow_.3s] group-data-alert/host:text-[#d42f35] group-data-alert/host:shadow-[0_0_0_1px_#f3b5b7,0_6px_16px_-10px_rgba(229,72,77,.5)]'>
          <Pulse className='size-3.5 text-primary [transition:color_.3s] group-data-alert/host:text-[#e5484d]' />
          Wigud
        </span>

        {SITES.map(({ site, left, top }, i) => (
          <div
            key={site}
            ref={el => {
              cardRefs.current[i] = el
            }}
            style={{ left, top, '--d': `${i * 90}ms` }}
            className={cx(
              'group/card absolute z-2 flex h-11 w-42.5 translate-y-1.5 items-center gap-2.5 rounded-[10px] bg-white px-3 opacity-0',
              'shadow-[0_0_0_1px_rgba(10,48,68,.08),0_10px_22px_-14px_rgba(10,48,68,.35)] data-[state=down]:shadow-[0_0_0_1.5px_#f0a7aa,0_10px_22px_-14px_rgba(229,72,77,.5)]',
              '[transition:opacity_.45s_var(--ease-brand)_var(--d),translate_.55s_var(--ease-brand)_var(--d),box-shadow_.3s] group-data-on/host:translate-y-0 group-data-on/host:opacity-100'
            )}
          >
            <i
              ref={el => {
                lightRefs.current[i] = el
              }}
              className={cx(
                'relative size-2 flex-none rounded-full bg-cyan-500 [transition:background-color_.3s]',
                'group-data-[state=down]/card:bg-[#e5484d] group-data-[state=fix]/card:bg-[#e8a317]',
                'after:absolute after:-inset-1.5 after:rounded-full after:border-[1.5px] after:border-cyan-500 after:opacity-0 data-beat:after:animate-ripple',
                'group-data-[state=down]/card:after:animate-ripple-loop group-data-[state=down]/card:after:border-[#e5484d]'
              )}
            />
            <span className='min-w-0 leading-[1.25]'>
              <b className='block truncate font-mono text-[11px] font-medium text-fg'>
                {site}
              </b>
              <span
                ref={el => {
                  wordRefs.current[i] = el
                }}
                className='block text-[11px] text-muted [transition:color_.3s] group-data-[state=down]/card:text-[#d42f35] group-data-[state=fix]/card:text-[#b7790f]'
              >
                En ligne
              </span>
            </span>
          </div>
        ))}

        {/* Wigud's alert, as it shows on our phones */}
        <div
          ref={noteRef}
          className='group/note absolute top-4.5 right-6 z-4 flex w-60 -translate-y-2 gap-2.5 rounded-[12px] bg-white p-2.5 opacity-0 shadow-[0_0_0_1px_rgba(10,48,68,.08),0_14px_28px_-16px_rgba(10,48,68,.4)] [transition:opacity_.35s_var(--ease-brand),translate_.45s_var(--ease-brand)] data-on:translate-y-0 data-on:opacity-100'
        >
          <span className='grid size-7.5 flex-none place-items-center rounded-[8px] bg-primary text-white [transition:background-color_.3s] group-data-[state=bad]/note:bg-[#e5484d]'>
            <Pulse className='size-4' />
          </span>
          <span className='min-w-0 flex-1 leading-[1.3]'>
            <span className='flex justify-between font-mono text-[9.5px] tracking-[.06em] text-muted-2 uppercase'>
              <span>Wigud</span>
              <span>maintenant</span>
            </span>
            <b className='block text-[12px] font-semibold text-fg'>
              {DOWN_SITE}
            </b>
            <span
              ref={noteTextRef}
              className='block text-[11.5px] text-muted [transition:color_.3s] group-data-[state=bad]/note:text-[#d42f35] group-data-[state=ok]/note:text-primary'
            />
          </span>
        </div>

        <span
          ref={statusRef}
          className={cx(
            cap,
            'absolute top-5.5 left-6 [transition:color_.3s] data-[state=bad]:text-[#d42f35] data-[state=ok]:text-primary data-[state=warn]:text-[#b7790f]'
          )}
        >
          {ALL_UP}
        </span>
        <span className={cx(cap, 'absolute bottom-4.5 left-6 text-ink/55')}>
          Hébergé en Suisse · Sauvegarde chaque nuit
        </span>
      </div>
    </div>
  )
}

export default HostScene
