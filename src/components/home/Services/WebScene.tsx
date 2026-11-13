import { useCallback, useRef } from 'react'
import { cx } from '@/components/home/shared/ui'
import hero from '@/assets/work/schweizer-solaire-hero.jpg'
import logo from '@/assets/work/schweizer-solaire-logo.png'
import { flag, reflow, restart, type Scheduler } from './scheduler'
import { panel, stage as stageClass, stageSvg } from './stage'
import { need, type SceneProps, type Timeline, useScene } from './useScene'

/** The line the visitor types into the hero title. */
const TITLE = 'Panneaux solaires'

/**
 * The page builds itself: at each time (ms), one flag on the page reveals one layer. The layers
 * read them with `group-data-[…]/build:` variants.
 */
const STEPS: ReadonlyArray<readonly [layer: string, ms: number]> = [
  ['bg', 100],
  ['top', 240],
  ['nav', 340],
  ['l1', 500],
  ['l2', 580],
  ['p', 680],
  ['btn', 780]
]

type Point = readonly [x: number, y: number]

/** Where the cursor waits before it comes in, off the bottom-right of the stage. */
const OFFSTAGE: Point = [680, 440]

/** The browser's loading bar; animates `transform`, so the bar's resting state is a transform too. */
const LOAD_FRAMES: Keyframe[] = [
  { transform: 'scaleX(0)', opacity: 1 },
  { transform: 'scaleX(.7)', opacity: 1, offset: 0.45 },
  { transform: 'scaleX(1)', opacity: 1, offset: 0.85 },
  { transform: 'scaleX(1)', opacity: 0 }
]

/** A title line of the hero: hidden 6px low, rises in when its layer flag is set. */
const heroLine =
  'block min-h-[.98em] translate-y-1.5 text-[24px] leading-[.98] font-extrabold tracking-[-.01em] uppercase opacity-0 [transition:opacity_.35s_var(--ease-brand),translate_.4s_var(--ease-brand)]'

/** A link or button of the nav bar: fades in with the bar. */
const navItem =
  'opacity-0 [transition:opacity_.3s_var(--ease-brand)] group-data-nav/build:opacity-100'

/** A hero button: rises 4px as it fades in. */
const heroButton =
  'translate-y-1 rounded-xs border px-2 py-1.25 text-[6.5px] font-bold opacity-0 [transition:opacity_.3s_var(--ease-brand),translate_.35s_var(--ease-brand)] group-data-btn/build:translate-y-0 group-data-btn/build:opacity-100'

/** 1 · Sites web: the real Schweizer Solaire site builds itself, then a line of its title is edited right on the page. */
const WebScene = (props: SceneProps) => {
  const ill = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const buildRef = useRef<HTMLDivElement>(null)
  const loadRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLElement>(null)
  const typedRef = useRef<HTMLSpanElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  const timeline = useCallback(({ at }: Scheduler): Timeline => {
    const root = need(ill)
    const stage = need(stageRef)
    const build = need(buildRef)
    const load = need(loadRef)
    const line = need(lineRef)
    const typed = need(typedRef)
    const cursor = need(cursorRef)

    // Position on the stage from layout, so neither the scale nor a running transition skews it.
    const posOf = (el: HTMLElement, dx: number, dy: number): Point => {
      let x = dx
      let y = dy
      for (
        let n: Element | null = el;
        n instanceof HTMLElement && n !== stage;
        n = n.offsetParent
      ) {
        x += n.offsetLeft
        y += n.offsetTop
      }
      return [x, y]
    }
    const rest = () => posOf(line, 236, 118)
    const moveTo = ([x, y]: Point, ms: number) => {
      cursor.style.transitionDuration = `${ms}ms`
      cursor.style.transform = `translate(${x}px, ${y}px)`
    }
    const click = () => {
      restart(cursor, 'ring')
      flag(cursor, 'press')
      at(140, () => flag(cursor, 'press', false))
    }
    const loadBar = () =>
      load.animate(LOAD_FRAMES, { duration: 900, easing: 'ease-out' })

    const reset = () => {
      STEPS.forEach(([layer]) => flag(build, layer, false))
      flag(build, 'l3', false)
      flag(line, 'editing', false)
      typed.textContent = ''
      flag(cursor, 'press', false)
      flag(cursor, 'ring', false)
      moveTo(OFFSTAGE, 0)
      load.getAnimations().forEach(animation => animation.cancel())
      reflow(root)
    }

    const play = () => {
      reset()
      loadBar()
      STEPS.forEach(([layer, ms]) => at(ms, () => flag(build, layer)))
      at(1100, () => moveTo(posOf(line, 22, 14), 850))
      at(2000, () => {
        click()
        flag(build, 'l3')
        flag(line, 'editing')
      })
      // One letter every 60 ms.
      for (let i = 1; i <= TITLE.length; i++) {
        at(2250 + (i - 1) * 60, () => {
          typed.textContent = TITLE.slice(0, i)
        })
      }
      at(2250 + TITLE.length * 60 + 400, () => {
        flag(line, 'editing', false)
        loadBar()
        moveTo(rest(), 900)
      })
    }

    const done = () => {
      reset()
      STEPS.forEach(([layer]) => flag(build, layer))
      flag(build, 'l3')
      typed.textContent = TITLE
      moveTo(rest(), 0)
    }

    return { play, done }
  }, [])

  useScene(ill, props, timeline)

  return (
    <div
      className={panel}
      ref={ill}
      role='img'
      aria-label='Le site de Schweizer Solaire se construit, puis le client écrit lui-même une ligne du titre, directement sur la page.'
    >
      <div className={stageClass} ref={stageRef} aria-hidden='true'>
        <svg className={stageSvg} viewBox='0 0 640 400'>
          <use href='#g-hills' />
        </svg>

        {/* the browser window */}
        <div className='absolute top-8.5 left-21.25 h-81.5 w-117.5 overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(10,48,68,.08),0_14px_28px_-18px_rgba(10,48,68,.3),0_40px_70px_-40px_rgba(10,48,68,.5)]'>
          <div className='relative flex h-8 items-center gap-1.5 border-b border-[#edf3f5] bg-[#fbfdfe] px-3'>
            <i className='size-2.25 rounded-full bg-[#dce7ec]' />
            <i className='size-2.25 rounded-full bg-[#dce7ec]' />
            <i className='size-2.25 rounded-full bg-[#dce7ec]' />
            <span className='absolute top-1.5 left-1/2 flex h-5 -translate-x-1/2 items-center gap-1.5 rounded-[6px] bg-[#eff5f7] px-3.5 font-mono text-[10.5px] text-muted'>
              <svg viewBox='0 0 12 12' className='size-2.5 text-muted-2'>
                <rect
                  x='2.5'
                  y='5.5'
                  width='7'
                  height='5'
                  rx='1.2'
                  fill='currentColor'
                />
                <path
                  d='M4 5.5V4a2 2 0 0 1 4 0v1.5'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.3'
                />
              </svg>
              schweizersolaire.ch
            </span>
            <span
              ref={loadRef}
              className='absolute inset-x-0 -bottom-px h-0.5 origin-left bg-[linear-gradient(90deg,var(--color-cyan-500),var(--color-primary))] opacity-0 [transform:scaleX(0)]'
            />
          </div>

          {/* the page; its layers come in as the flags on `build` are set */}
          <div className='relative h-73.5'>
            <div className='group/build absolute inset-0' ref={buildRef}>
              <div className='absolute inset-0 overflow-hidden bg-[#f3f6f7]'>
                <img
                  className='absolute inset-0 size-full max-w-none scale-[1.03] object-cover object-[60%_50%] opacity-0 [transition:opacity_.45s_var(--ease-brand),scale_1s_var(--ease-brand)] group-data-bg/build:scale-100 group-data-bg/build:opacity-100'
                  src={hero}
                  alt=''
                />
                <div className='absolute inset-0 bg-[linear-gradient(90deg,rgba(20,24,22,.62),rgba(20,24,22,.1)_70%)] opacity-0 [transition:opacity_.45s_var(--ease-brand)] group-data-bg/build:opacity-100' />
                <div className='absolute inset-x-0 top-0 flex h-3.75 -translate-y-full items-center gap-3 bg-[#1e2124] px-3 text-[6.5px] tracking-[.02em] text-[#c9cdd1] [transition:translate_.35s_var(--ease-brand)] group-data-top/build:translate-y-0'>
                  <span>026 675 11 58</span>
                  <span>info@schweizersolaire.ch</span>
                  <span className='ml-auto'>Avenches</span>
                </div>
                <div className='absolute inset-x-0 top-3.75 flex h-7.5 -translate-y-1.5 items-center gap-2.5 border-b-2 border-[#e8b54a] bg-white px-3 opacity-0 [transition:translate_.35s_var(--ease-brand),opacity_.3s_var(--ease-brand)] group-data-nav/build:translate-y-0 group-data-nav/build:opacity-100'>
                  <img className='h-5.5 w-auto' src={logo} alt='' />
                  <span className='ml-auto flex gap-2.25 text-[6.5px] font-semibold text-[#2b2f33]'>
                    <span className={navItem}>Savoir-faire</span>
                    <span className={navItem}>Réalisations</span>
                    <span className={navItem}>Entreprise</span>
                    <span className={navItem}>Contact</span>
                  </span>
                  <span
                    className={cx(
                      navItem,
                      'rounded-xs bg-[#e8b54a] px-2 py-1.25 text-[6.5px] font-bold text-[#1e2124]'
                    )}
                  >
                    Demander une offre
                  </span>
                </div>
                <div className='absolute top-16 right-[40%] left-4'>
                  <b
                    className={cx(
                      heroLine,
                      'text-white group-data-l1/build:translate-y-0 group-data-l1/build:opacity-100'
                    )}
                  >
                    Charpente
                  </b>
                  <b
                    className={cx(
                      heroLine,
                      'text-white group-data-l2/build:translate-y-0 group-data-l2/build:opacity-100'
                    )}
                  >
                    Rénovation
                  </b>
                  {/* the line the visitor edits: a thin frame and a caret while `data-editing` is set */}
                  <b
                    ref={lineRef}
                    className={cx(
                      heroLine,
                      'group/line relative text-[#f0be52] italic group-data-l3/build:translate-y-0 group-data-l3/build:opacity-100',
                      'after:absolute after:-inset-x-1.5 after:-top-1 after:-bottom-0.75 after:rounded-sm after:bg-[rgba(132,210,229,.1)] after:opacity-0 after:shadow-[inset_0_0_0_1.5px_var(--color-cyan-300)] after:[transition:opacity_.2s] data-editing:after:opacity-100'
                    )}
                  >
                    <span ref={typedRef} />
                    <i className='ml-0.5 hidden h-[.9em] w-0.5 animate-blink bg-current align-[-.06em] group-data-editing/line:inline-block' />
                  </b>
                  <p className='mt-2 max-w-42.5 text-[7px] leading-[1.45] text-[rgba(255,255,255,.85)] opacity-0 [transition:opacity_.35s_var(--ease-brand)] group-data-p/build:opacity-100'>
                    Une entreprise de la Broye, à Domdidier et Avenches depuis
                    2010.
                  </p>
                  <div className='mt-2.25 flex gap-1.25'>
                    <span
                      className={cx(
                        heroButton,
                        'border-[#e8b54a] bg-[#e8b54a] text-[#1e2124]'
                      )}
                    >
                      Demander une offre
                    </span>
                    {/* a beat after the first one */}
                    <span
                      className={cx(
                        heroButton,
                        'border-[rgba(255,255,255,.7)] text-white group-data-btn/build:delay-[.08s]'
                      )}
                    >
                      Voir nos réalisations
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* the visitor's cursor; the timeline moves it with an inline transform */}
        <div
          ref={cursorRef}
          className={cx(
            'group/cur pointer-events-none absolute top-0 left-0 z-4 [transform:translate(680px,440px)] [transition:transform_.8s_cubic-bezier(.65,0,.25,1)]',
            'after:absolute after:-top-3.25 after:-left-3.25 after:size-6.5 after:rounded-full after:border-[1.5px] after:border-white after:opacity-0 data-ring:after:animate-ripple'
          )}
        >
          <svg
            viewBox='0 0 18 18'
            className='-mt-0.5 -ml-0.5 size-4.5 origin-[2px_2px] [filter:drop-shadow(0_2px_3px_rgba(10,48,68,.3))] [transition:scale_.12s] group-data-press/cur:scale-[.8]'
          >
            <path
              d='M2 2l13.5 6.2-5.9 1.8-2.2 5.8z'
              fill='#0f7aa8'
              stroke='#fff'
              strokeWidth='1.5'
              strokeLinejoin='round'
            />
          </svg>
          <span className='absolute top-3.75 left-3.25 rounded-[2px_7px_7px_7px] bg-primary px-1.75 pt-0.5 pb-0.75 text-[10.5px] font-semibold whitespace-nowrap text-white'>
            Lionel
          </span>
        </div>
      </div>
    </div>
  )
}

export default WebScene
