import { type Ref, useMemo, useRef } from 'react'
import elwan from '@/assets/team/elwan.webp'
import lionel from '@/assets/team/lionel.webp'
import { ArrowRight } from '@/components/home/shared/Icons'
import { button, container, cx, ico } from '@/components/home/shared/ui'
import { type Count, KPIS } from './kpis'
import { type Peak, PEAKS } from './peaks'
import { RangeArt, RangeLines } from './RangeArt'
import { useHeroCounters } from './useHeroCounters'
import { type MorphRefs, useHeroMorph } from './useHeroMorph'
import { useIntroPen } from './useIntroPen'
import { useTagPlacement } from './useTagPlacement'
import './Hero.css'

// `delay`: when the line rises in the intro (Hero.css), 70 ms apart
const TITLE = [
  { text: 'Sites web,' },
  { text: 'applications et', delay: '.07s' },
  { text: 'cybersécurité.', delay: '.14s', muted: true }
]

const FACES = [
  { src: elwan, name: 'Elwan' },
  { src: lionel, name: 'Lionel' }
]

/** Without the intro, the labels fade in one after another once placed. */
const TAG_FADE_DELAYS = ['', 'delay-900', 'delay-1100', 'delay-1300', '']

/** A summit label; script sets `left`, `top` and `--lift` (the leader line's height). */
const tagClass = ({ main }: Peak, i: number) =>
  cx(
    'pointer-events-none absolute z-2 inline-flex items-center gap-1.75 rounded-full border border-[rgba(208,225,232,.9)] bg-[rgba(255,255,255,.9)] font-mono tracking-[.02em] whitespace-nowrap',
    // `transform`, not `translate`: the intro rises the labels with `translate`
    '[transform:translate(-50%,calc(-100%-var(--lift,22px)))]',
    'opacity-0 transition-opacity duration-800 ease-[ease] in-[.is-ready]:opacity-100',
    TAG_FADE_DELAYS[i],
    'after:absolute after:top-full after:left-1/2 after:h-[calc(var(--lift,22px)-3px)] after:w-px',
    main
      ? 'py-1.25 pr-2.75 pl-2.25 text-[11.5px] text-ink after:bg-[linear-gradient(var(--color-ink),transparent)]'
      : 'px-2.25 py-1 text-[10.5px] text-cyan-700 after:bg-[linear-gradient(var(--color-cyan-600),transparent)] max-[600px]:hidden'
  )

/** Grid of four, two per row below 1000px (then the third cell starts a row). */
const kpiClass = (i: number) =>
  cx(
    'border-line px-5.5 pt-[clamp(14px,2.4vh,26px)] pb-[clamp(14px,2.2vh,24px)] max-[600px]:px-4 max-[600px]:pt-5 max-[600px]:pb-5',
    i > 0 && 'border-l',
    i === 2 && 'max-[1000px]:border-l-0',
    i < 2 && 'max-[1000px]:border-b'
  )

/** A figure that counts up: the number itself starts at 0 and is driven by script. */
const CountFigure = ({
  count,
  numberRef
}: {
  count: Count
  numberRef: Ref<HTMLSpanElement>
}) => (
  <>
    {count.before}
    <span ref={numberRef}>0</span>
    {count.after}
  </>
)

/**
 * The first screen: the title, who we are, the two actions, then the Prealps drawing that
 * shrinks from full width into a card as the page scrolls, with a skill label on each summit
 * and the numbers row under it.
 */
const Hero = () => {
  const scene = useRef<HTMLElement>(null)
  const pin = useRef<HTMLDivElement>(null)
  const top = useRef<HTMLDivElement>(null)
  const slot = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const kpis = useRef<HTMLDivElement>(null)
  const art = useRef<SVGSVGElement>(null)
  const lines = useRef<SVGSVGElement>(null)
  const pen = useRef<SVGGElement>(null)
  // indexed like PEAKS and KPIS
  const tags = useRef<HTMLDivElement[]>([])
  const figures = useRef<HTMLSpanElement[]>([])

  const morphRefs = useMemo<MorphRefs>(
    () => ({ scene, pin, top, slot, card, kpis }),
    []
  )
  const introRefs = useMemo(() => ({ card, lines, pen, tags }), [])

  // order matters: labels are placed before the morph first moves the card, as in the original
  const counters = useHeroCounters(figures)
  useTagPlacement(card, art, tags)
  useHeroMorph(morphRefs, counters)
  useIntroPen(introRefs)

  return (
    // --p: morph progress, 0 = full-width drawing, 1 = docked card (set by useHeroMorph)
    <section className='[--p:0]' ref={scene}>
      <div
        ref={pin}
        className='relative flex min-h-[calc(100vh-64px)] flex-col overflow-clip pt-[clamp(20px,5vh,64px)] pb-[clamp(16px,3vh,28px)] in-[.no-morph]:static'
      >
        <div
          ref={top}
          className={cx(
            container,
            'relative z-3 w-full pt-[clamp(8px,4vh,48px)] pb-[clamp(18px,3.4vh,36px)] max-[860px]:pt-0 max-[860px]:pb-8'
          )}
        >
          <h1 className='text-[clamp(38px,min(7.8vw,10.8vh),112px)] leading-[.96] font-bold tracking-[-.06em] text-fg'>
            {TITLE.map(({ text, delay, muted }) => (
              // each line rises out of its own mask in the intro
              <span
                key={text}
                className={cx(
                  'mt-[-.06em] mb-[-.2em] block overflow-hidden pt-[.06em] pb-[.2em] min-[861px]:whitespace-nowrap',
                  muted && 'text-primary'
                )}
              >
                <span
                  data-intro='line'
                  className='block'
                  style={delay ? { '--d': delay } : undefined}
                >
                  {text}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-intro='rise'
            style={{ '--d': '.24s' }}
            className='mt-[clamp(18px,3.6vh,36px)] flex items-center gap-4 text-[19px] leading-[1.45] tracking-[-.01em] text-muted max-[600px]:text-[17px]'
          >
            <span className='flex flex-none'>
              {FACES.map(({ src, name }, i) => (
                <img
                  key={name}
                  src={src}
                  alt={name}
                  width='44'
                  height='44'
                  className={cx(
                    'size-11 max-w-none rounded-full bg-cyan-100 object-cover shadow-[0_0_0_3px_#fff]',
                    i > 0 && '-ml-3'
                  )}
                />
              ))}
            </span>
            <span>
              Nous sommes <b className='font-medium text-fg'>Elwan et Lionel</b>
              , deux ingénieurs à Fribourg.
            </span>
          </p>
          <div className='mt-[clamp(18px,3vh,30px)] flex flex-wrap items-center gap-x-7.5 gap-y-3.5'>
            <a
              href='#contact'
              data-intro='act'
              style={{ '--d': '.32s' }}
              className={button('lg')}
            >
              Nous contacter <ArrowRight className={ico} />
            </a>
            <a
              href='#realisations'
              data-intro='act'
              style={{ '--d': '.38s' }}
              className='group inline-flex items-center gap-2 text-[16px] font-medium text-primary [transition:color_.2s] hover:text-primary-hover'
            >
              Voir nos réalisations <ArrowRight className={ico} />
            </a>
          </div>
        </div>

        <div className={cx(container, 'flex w-full flex-1 flex-col')}>
          {/* where the card docks; the card itself is positioned over it by script */}
          <div
            ref={slot}
            aria-hidden='true'
            className='h-[clamp(300px,44vh,480px)] min-h-0 flex-none in-[.no-morph]:hidden'
          />
          <div
            ref={card}
            className={cx(
              'absolute z-1 max-h-none min-h-0 flex-none overflow-hidden rounded-t-card border border-b-0 border-[rgba(226,237,241,var(--p))] bg-white will-change-[left,top,width,height]',
              // without the morph: a plain card in the flow
              'in-[.no-morph]:relative in-[.no-morph]:z-auto in-[.no-morph]:max-h-170 in-[.no-morph]:min-h-[clamp(260px,30vw,440px)] in-[.no-morph]:flex-1 in-[.no-morph]:border-line',
              'max-[600px]:in-[.no-morph]:h-75 max-[600px]:in-[.no-morph]:min-h-0 max-[600px]:in-[.no-morph]:flex-none'
            )}
          >
            <RangeArt svgRef={art} />
            <RangeLines svgRef={lines} penRef={pen} />
            {PEAKS.map((peak, i) => (
              <div
                key={peak.label}
                data-tag=''
                className={tagClass(peak, i)}
                ref={el => {
                  if (el) tags.current[i] = el
                }}
              >
                {peak.main && (
                  <span className='size-1.5 rounded-full bg-cyan-500 shadow-[0_0_0_3px_var(--color-cyan-100)]' />
                )}
                {peak.label}
                <span className='text-muted'>{`· ${peak.detail}`}</span>
              </div>
            ))}
          </div>
          {/* fades in and rises under the card as it docks; while morphing, script also
              sets its width, height and transform */}
          <div
            ref={kpis}
            className={cx(
              'relative z-2 grid grid-cols-[repeat(4,1fr)] rounded-b-card border border-t-0 border-line bg-white max-[1000px]:grid-cols-[1fr_1fr]',
              'opacity-[clamp(0,calc(var(--p)*2-1),1)] [transform:translateY(calc((1-var(--p))*32px))] in-[.no-morph]:opacity-100 in-[.no-morph]:transform-none'
            )}
          >
            {KPIS.map(({ figure, caption }, i) => (
              <div key={caption} className={kpiClass(i)}>
                <b className='block text-[clamp(22px,2.4vw,30px)] leading-[1.1] font-medium tracking-[-.04em] text-fg tabular-nums'>
                  {typeof figure === 'string' ? (
                    figure
                  ) : (
                    <CountFigure
                      count={figure}
                      numberRef={el => {
                        if (el) figures.current[i] = el
                      }}
                    />
                  )}
                </b>
                <span className='mt-1.5 block text-[14px] text-muted'>
                  {caption}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
