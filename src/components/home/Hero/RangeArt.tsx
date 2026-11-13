import type { Ref, SVGProps } from 'react'
import { ART_H, ART_W, PEAKS } from './peaks'

/* The Fribourg Prealps, drawn in a 1600 × 560 box. Both pictures share the same two ridges:
   the coloured art (shown once the card is formed) and the traced lines (shown at the top of
   the page, drawn in by the intro pen). */
const VIEW_BOX = `0 0 ${ART_W} ${ART_H}`

const BACK_RIDGE =
  'M0 354 C75 347 125 326 183 302 L255 266 C300 282 329 310 377 322 C440 313 487 278 544 257 C608 275 645 307 701 314 C754 298 805 256 867 237 C921 255 961 294 1020 305 C1097 287 1141 249 1203 238 C1274 260 1315 302 1377 314 C1460 307 1521 333 1600 340'
const MAIN_RIDGE =
  'M0 406 C70 390 130 358 178 320 L300 200 L338 233 C373 275 412 310 455 331 C515 319 569 307 610 300 C659 307 707 332 746 337 L860 160 L900 223 L927 270 L965 255 L984 288 C1041 310 1095 321 1150 306 L1250 225 L1300 274 C1390 323 1514 349 1600 362'
/** A ridge closed down to the bottom of the box, as a filled shape. */
const filled = (ridge: string) => `${ridge} L1600 560 L0 560 Z`
const BACK_FILL = filled(BACK_RIDGE)
const MAIN_FILL = filled(MAIN_RIDGE)

// Per summit, in source paint order (not always PEAKS order).
const LIGHT_FACES = [
  'M300 200 L180 350 L290 350 Z',
  'M610 300 L490 450 L600 450 Z',
  'M860 160 L740 310 L850 310 Z',
  'M1250 225 L1130 375 L1240 375 Z',
  'M965 255 L845 405 L955 405 Z'
]
const SHADED_FACES = [
  {
    d: 'M300 200 L455 200 L455 331 L436.4 500 L369.75 500 L315.5 335 Z',
    opacity: 1
  },
  {
    d: 'M610 300 L746 300 L746 337 L729.68 500 L671.2 500 L623.6 390 Z',
    opacity: 0.85
  },
  {
    d: 'M860 160 L1090 160 L1090 316 L1062.4 490 L963.5 490 L883 308.5 Z',
    opacity: 1
  },
  {
    d: 'M1250 225 L1600 225 L1600 362 L1558 525 L1407.5 525 L1285 360 Z',
    opacity: 1
  },
  {
    d: 'M965 255 L1012 255 L1012 300 L1006.36 365 L986.15 365 L969.7 304.5 Z',
    opacity: 0.9
  }
]
const SNOW_CAPS = [
  'M300 200 L253 251 L275 244 L290 261 L304 244 L321 255 L339 234 Z',
  'M610 300 L586 312 L603 308 L614 318 L627 310 L639 315 Z',
  'M860 160 L799 255 L825 244 L838 264 L856 240 L878 270 L891 246 L910 248 Z',
  'M965 255 L946 274 L959 271 L968 280 L976 275 L984 288 Z',
  'M1250 225 L1197 272 L1225 265 L1239 282 L1254 260 L1272 280 L1285 264 L1301 275 Z'
]
const SNOW_HIGHLIGHTS = [
  'M300 200 L282 232 L303 244 L321 255 L339 234 Z',
  'M860 160 L843 231 L856 240 L878 270 L891 246 L900 223 Z',
  'M1250 225 L1238 260 L1254 260 L1272 280 L1285 264 L1301 275 Z'
]
// Line drawing, in PEAKS order: the intro draws spine i and snow edge i when the pen reaches peak i.
const SPINES = [
  'M300 200 L315.5 335 L369.75 500',
  'M610 300 L623.6 390 L671.2 500',
  'M860 160 L883 308.5 L963.5 490',
  'M965 255 L969.7 304.5 L986.15 365',
  'M1250 225 L1285 360 L1407.5 525'
]
const SNOW_EDGES = [
  'M251.2 248.0 L275.0 244.0 L290.0 261.0 L304.0 244.0 L321.0 255.0 L339.8 235.1',
  'M583.9 304.8 L603.0 308.0 L614.0 318.0 L627.0 310.0 L641.6 306.7',
  'M799.2 254.4 L825.0 244.0 L838.0 264.0 L856.0 240.0 L878.0 270.0 L891.0 246.0 L913.5 246.5',
  'M942.2 264.0 L959.0 271.0 L968.0 280.0 L976.0 275.0 L984.0 288.0',
  'M1195.0 269.6 L1225.0 265.0 L1239.0 282.0 L1254.0 260.0 L1272.0 280.0 L1285.0 264.0 L1300.0 274.0'
]

/** The coloured range: the picture inside the docked card. Its viewBox is reframed by script. */
export const RangeArt = ({ svgRef }: { svgRef: Ref<SVGSVGElement> }) => (
  <svg
    ref={svgRef}
    data-art=''
    className='absolute inset-0 size-full'
    preserveAspectRatio='xMidYMax slice'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    viewBox={VIEW_BOX}
  >
    <defs>
      <linearGradient
        id='v2-base-back'
        x1='0'
        y1='230'
        x2='0'
        y2='470'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#b9e4f0' />
        <stop offset='1' stopColor='#84d2e5' />
      </linearGradient>
      <linearGradient
        id='v2-base-main'
        x1='0'
        y1='160'
        x2='0'
        y2='470'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#5fc0dc' />
        <stop offset='.55' stopColor='#2fa8cb' />
        <stop offset='1' stopColor='#1a7499' />
      </linearGradient>
      <linearGradient id='v2-base-shade' x2='0' y2='1'>
        <stop stopColor='#0f4a66' stopOpacity='.9' />
        <stop offset='.55' stopColor='#1a7499' stopOpacity='.6' />
        <stop offset='1' stopColor='#1a7499' stopOpacity='0' />
      </linearGradient>
      <linearGradient id='v2-base-lit' x2='0' y2='1'>
        <stop stopColor='#b9e4f0' stopOpacity='.55' />
        <stop offset='1' stopColor='#84d2e5' stopOpacity='0' />
      </linearGradient>
      <clipPath id='v2-base-main-clip'>
        <path d={MAIN_FILL} />
      </clipPath>
    </defs>

    <g className='will-change-transform'>
      <path d={BACK_FILL} fill='url(#v2-base-back)' />
    </g>

    <g className='will-change-transform'>
      <path d={MAIN_FILL} fill='url(#v2-base-main)' />
      <g clipPath='url(#v2-base-main-clip)'>
        {LIGHT_FACES.map(d => (
          <path key={d} d={d} fill='url(#v2-base-lit)' />
        ))}
        {SHADED_FACES.map(({ d, opacity }) => (
          <path key={d} d={d} fill='url(#v2-base-shade)' opacity={opacity} />
        ))}
        {SNOW_CAPS.map(d => (
          <path key={d} d={d} fill='#dcf0f6' />
        ))}
        {SNOW_HIGHLIGHTS.map(d => (
          <path key={d} d={d} fill='#f1f9fc' />
        ))}
      </g>
    </g>

    {PEAKS.map(({ x, y, label }) => (
      <circle key={label} cx={x} cy={y} r='0' />
    ))}
  </svg>
)

type Stroke = 'main' | 'back' | 'spine' | 'snow'

const STROKES: Record<Stroke, SVGProps<SVGPathElement>> = {
  main: { stroke: '#0f5f82', strokeWidth: 1.8 },
  back: { stroke: '#7dbfd4', strokeWidth: 1.4 },
  spine: { stroke: 'url(#ln-fade)', strokeWidth: 1.3 },
  snow: { stroke: '#1a7499', strokeOpacity: 0.5, strokeWidth: 1.1 }
}

/**
 * One traced stroke. `pathLength=1` with a dash of 1 lets the intro draw it in by moving the
 * dash offset from 1 to 0; `data-line` is how the intro finds it.
 */
const Line = ({
  kind,
  d,
  mask
}: {
  kind: Stroke
  d: string
  mask?: string
}) => (
  <path
    data-line={kind}
    d={d}
    mask={mask}
    pathLength={1}
    fill='none'
    strokeLinecap='round'
    strokeLinejoin='round'
    strokeDasharray={1}
    {...STROKES[kind]}
  />
)

/** A light tint under the strokes; `data-tint` lets the intro fade it in last. */
const Tint = ({ d, fill }: { d: string; fill: string }) => (
  <path data-tint='' d={d} fill={fill} />
)

interface RangeLinesProps {
  svgRef: Ref<SVGSVGElement>
  penRef: Ref<SVGGElement>
}

/**
 * The traced range shown at the top of the page; it fades out as the card forms (and is not
 * shown at all without the morph).
 */
export const RangeLines = ({ svgRef, penRef }: RangeLinesProps) => (
  <svg
    ref={svgRef}
    className='pointer-events-none absolute inset-0 z-1 size-full opacity-[clamp(0,calc(2.4-2.4*var(--p,0)),1)] in-[.no-morph]:hidden'
    viewBox={VIEW_BOX}
    preserveAspectRatio='xMidYMax slice'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
  >
    <defs>
      <linearGradient
        id='ln-fade'
        gradientUnits='userSpaceOnUse'
        x1='0'
        y1='160'
        x2='0'
        y2='470'
      >
        <stop stopColor='#1a7499' stopOpacity='.6' />
        <stop offset='1' stopColor='#1a7499' stopOpacity='0' />
      </linearGradient>
      <clipPath id='ln-main-clip'>
        <path d={MAIN_FILL} />
      </clipPath>
      {/* the back ridge's line is hidden where the front range stands before it */}
      <mask
        id='ln-behind'
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width={ART_W}
        height={ART_H}
      >
        <rect width={ART_W} height={ART_H} fill='#fff' />
        <path d={MAIN_FILL} fill='#000' />
      </mask>
    </defs>

    <g>
      <Tint d={BACK_FILL} fill='#f6fafc' />
      <Line kind='back' d={BACK_RIDGE} mask='url(#ln-behind)' />
    </g>

    <g>
      <Tint d={MAIN_FILL} fill='#edf5f8' />
      {/* snow caps: just whiter than the range, far from their final colour */}
      <g clipPath='url(#ln-main-clip)'>
        {SNOW_CAPS.map(d => (
          <Tint key={d} d={d} fill='#fcfeff' />
        ))}
      </g>
      <Line kind='main' d={MAIN_RIDGE} />
      {SPINES.map(d => (
        <Line key={d} kind='spine' d={d} />
      ))}
      {SNOW_EDGES.map(d => (
        <Line key={d} kind='snow' d={d} />
      ))}
      {/* the intro's pen tip, parked at the start of the main ridge until the trace begins */}
      <g
        ref={penRef}
        className='is-off pointer-events-none transition-opacity duration-300 ease-quart [&.is-off]:opacity-0'
        transform='translate(0 406)'
      >
        <circle r='10' fill='#2fa8cb' opacity={0.16} />
        <circle r='3.4' fill='#0f5f82' />
      </g>
    </g>
  </svg>
)
