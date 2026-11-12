import { useId, type ReactNode } from 'react'
import { cx } from '@/components/home/shared/ui'
import {
  BOTTOM_CLIP,
  FROM_PEAK,
  LIT_FACE,
  SHADE_FACE,
  TOP_CLIP,
  TRACE_D,
  WIRE_D,
  X0,
  Y
} from './scene'
import { useBreach } from './useBreach'

/*
 * breachStory.ts drives the motion through `data-*` attributes; the looks for each state are the
 * `data-[…]:` / `group-data-[…]:` variants below.
 *   bubble  data-state: swap (text fades out) | rejected (red, shakes) | through (green)
 *   arrow   data-state: flying | rejected | through (absent: hidden)
 *   status  data-verdict: rejected | through (absent: hidden)
 *   found   data-shown
 */

/** The colour of the request's text, per state of its bubble. */
const queryText =
  'group-data-[state=rejected]/bubble:fill-[#d42f35] group-data-[state=through]/bubble:fill-[#157a57]'

const PILLS = {
  name: {
    rect: 'fill-white stroke-[#d3e1e7] stroke-1',
    icon: 'fill-none stroke-primary stroke-[1.25]',
    text: 'fill-fg'
  },
  found: {
    rect: 'fill-[#effaf5] stroke-[#1a8f66] stroke-1',
    icon: 'fill-none stroke-[#1a8f66] stroke-[1.3]',
    text: 'fill-[#157a57]'
  }
}

interface PillProps {
  part: keyof typeof PILLS
  x: number
  y: number
  width: number
  textX: number
  icon: ReactNode
  className?: string
  children: string
}

/** A rounded label with an icon; breachStory.ts re-fits it to the measured text. */
const Pill = ({
  part,
  x,
  y,
  width,
  textX,
  icon,
  className,
  children
}: PillProps) => (
  <g data-part={part} className={className}>
    <rect
      x={x}
      y={y}
      width={width}
      height='28'
      rx='14'
      className={PILLS[part].rect}
    />
    <g
      data-part='icon'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={PILLS[part].icon}
    >
      {icon}
    </g>
    <text x={textX} y={y + 18.5} className={PILLS[part].text}>
      {children}
    </text>
  </g>
)

const Globe = () => (
  <>
    <circle r='6' />
    <ellipse rx='2.6' ry='6' />
    <path d='M-6 0H6' />
  </>
)

const Bug = () => (
  <>
    <ellipse cy='1.2' rx='3.4' ry='4.4' />
    <path d='M-1.8 -3.2a1.8 1.8 0 0 1 3.6 0M0 -1.2V5.6M-3.4 0.4H-6M3.4 0.4H6M-3.2 3.4L-5.6 5.2M3.2 3.4L5.6 5.2M-2.6 -2.2L-4.8 -4.2M2.6 -2.2L4.8 -4.2' />
  </>
)

/** Both halves of the mountain shake and tilt around the point where the crack meets the line. */
const pivot = 'transform-view origin-[300px_212px]'

/**
 * The mountain "votre-site.ch" and the requests fired at it (motion in breachStory.ts). Everything
 * that moves starts empty or at rest here and is written imperatively.
 */
const Breach = () => {
  const svgRef = useBreach()
  // Unique ids for the defs; useId's colons are not valid in url(#…) references.
  const uid = `brk${useId().replace(/:/g, '')}`
  const id = (name: string) => `${uid}-${name}`
  const url = (name: string) => `url(#${id(name)})`

  return (
    <svg
      ref={svgRef}
      viewBox='0 0 560 340'
      aria-hidden='true'
      className='block h-auto w-full overflow-visible font-mono text-[11.5px]'
    >
      <defs>
        <linearGradient
          id={id('lit')}
          x1='0'
          y1='72'
          x2='0'
          y2='340'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#5fc0dc' />
          <stop offset='.55' stopColor='#2fa8cb' />
          <stop offset='1' stopColor='#1a7499' />
        </linearGradient>
        <linearGradient
          id={id('shade')}
          x1='0'
          y1='72'
          x2='0'
          y2='340'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#1a7499' />
          <stop offset='1' stopColor='#0f4a66' />
        </linearGradient>
        <linearGradient
          id={id('back')}
          x1='0'
          y1='200'
          x2='0'
          y2='340'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#d3eff6' />
          <stop offset='1' stopColor='#b9e4f0' />
        </linearGradient>
        <clipPath id={id('top')}>
          <path d={TOP_CLIP} />
        </clipPath>
        <clipPath id={id('bot')}>
          <path d={BOTTOM_CLIP} />
        </clipPath>
        <g id={id('mtn')}>
          <path d={LIT_FACE} fill={url('lit')} />
          <path d='M232 212 L198 258 L236 284 Z' fill='#fff' opacity='.08' />
          <path
            d='M198 258 L152 296 L104 340 L196 340 L214 300 Z'
            fill='#0f4a66'
            opacity='.2'
          />
          <path d={SHADE_FACE} fill={url('shade')} />
          <path
            d='M392 248 L420 262 L448 300 L406 300 Z'
            fill='#0a3044'
            opacity='.16'
          />
          <path d='M326 118 L344 150 L330 160 Z' fill='#0a3044' opacity='.12' />
          <path
            d={`${FROM_PEAK} L244 190 L276 238 Z`}
            fill='#fff'
            opacity='.13'
          />
          <path
            d={`${FROM_PEAK} L226 318 L250 340 L276 258 Z`}
            fill='#fff'
            opacity='.06'
          />
          <path
            d={`${FROM_PEAK} L366 206 L334 240 Z`}
            fill='#0a3044'
            opacity='.14'
          />
          <path
            d={`${FROM_PEAK} L276 122 L284 116 L290 130 L296 119 L300 132 Z`}
            fill='#f1f9fc'
          />
          <path
            d={`${FROM_PEAK} L300 132 L306 138 L313 121 L318 129 L328 122 Z`}
            fill='#dcf0f6'
          />
        </g>
      </defs>

      <path
        d='M0 340 L0 300 L60 280 L118 296 L176 262 L250 318 L410 318 L470 272 L520 290 L560 276 L560 340 Z'
        fill={url('back')}
      />
      <g data-part='shake' className={pivot}>
        <use href={`#${id('mtn')}`} clipPath={url('bot')} />
        <g data-part='summit' className={pivot}>
          <use href={`#${id('mtn')}`} clipPath={url('top')} />
          <path
            d='M300 54 V70'
            className='fill-none stroke-ink stroke-[1.2] opacity-50'
          />
          <Pill
            part='name'
            x={241}
            y={27}
            width={118}
            textX={266}
            icon={<Globe />}
          >
            votre-site.ch
          </Pill>
        </g>
        {/* drawn in by its dash offset: 1 hidden -> 0 fully drawn (pathLength 1) */}
        <path
          data-part='trace'
          d={TRACE_D}
          pathLength='1'
          strokeDasharray='1 2'
          strokeDashoffset='1'
          strokeLinecap='round'
          strokeLinejoin='round'
          className='fill-none stroke-[#1a8f66] stroke-[1.8]'
        />
      </g>
      <path
        d={WIRE_D}
        strokeDasharray='3 4'
        className='fill-none stroke-[#b9cbd3] stroke-[1.3]'
      />
      <g
        data-part='bubble'
        className={cx(
          'group/bubble transform-fill origin-center',
          'data-[state=rejected]:animate-shake'
        )}
      >
        <rect
          x='16'
          y={Y - 44}
          width='200'
          height='28'
          rx='14'
          className={cx(
            'fill-white stroke-[#d3e1e7] stroke-1',
            '[transition:fill_.25s,stroke_.25s,width_.25s_var(--ease-quart)]',
            'group-data-[state=rejected]/bubble:fill-[#fff5f5] group-data-[state=rejected]/bubble:stroke-[#f4b4b6]',
            'group-data-[state=through]/bubble:fill-[#effaf5] group-data-[state=through]/bubble:stroke-[#1a8f66]'
          )}
        />
        <text
          x='29'
          y={Y - 25.5}
          className='[transition:opacity_.16s] group-data-[state=swap]/bubble:opacity-0'
        >
          <tspan
            data-part='method'
            className={cx('fill-primary font-medium', queryText)}
          />
          <tspan data-part='path' className={cx('fill-fg', queryText)} />
        </text>
      </g>
      <text
        data-part='status'
        x={X0}
        y={Y + 22}
        className={cx(
          'fill-fg text-[10.5px] opacity-0 [transition:opacity_.2s] data-verdict:opacity-100',
          'data-[verdict=rejected]:fill-[#d42f35] data-[verdict=through]:fill-[#157a57]'
        )}
      />
      <Pill
        part='found'
        x={402}
        y={Y - 44}
        width={127}
        textX={429}
        icon={<Bug />}
        className={cx(
          'translate-y-1 opacity-0 transform-fill origin-left',
          '[transition:opacity_.35s,translate_.45s_var(--ease-quart)]',
          'data-shown:translate-y-0 data-shown:opacity-100'
        )}
      >
        faille trouvée
      </Pill>
      {/* the chips are added by breachStory.ts and inherit this outline */}
      <g
        data-part='chips'
        className='stroke-[rgba(10,48,68,.18)] stroke-[.5]'
      />
      <g
        data-part='arrow'
        className='group/arrow opacity-0 [transition:opacity_.25s] data-state:opacity-100'
      >
        <path
          d='M-15 0H0M-5.5 -5L0 0L-5.5 5'
          strokeLinecap='round'
          strokeLinejoin='round'
          className={cx(
            'fill-none stroke-ink stroke-2 [transition:stroke_.2s]',
            'group-data-[state=rejected]/arrow:stroke-[#e5484d] group-data-[state=through]/arrow:stroke-[#1a8f66]'
          )}
        />
      </g>
    </svg>
  )
}

export default Breach
