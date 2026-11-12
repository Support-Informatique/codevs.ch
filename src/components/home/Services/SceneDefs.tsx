/** Shared by the scenes: the light back ridges, the faceted mountain and the till's metal stand. */
const SceneDefs = () => (
  <svg width='0' height='0' className='absolute' aria-hidden='true'>
    <defs>
      <linearGradient
        id='g-hill-a'
        x1='0'
        y1='300'
        x2='0'
        y2='400'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#e1f3f9' />
        <stop offset='1' stopColor='#d3eff6' />
      </linearGradient>
      <linearGradient
        id='g-hill-b'
        x1='0'
        y1='330'
        x2='0'
        y2='400'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#cdeaf3' />
        <stop offset='1' stopColor='#bfe4ef' />
      </linearGradient>
      <linearGradient
        id='g-lit'
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
        id='g-shade'
        x1='0'
        y1='72'
        x2='0'
        y2='340'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#1a7499' />
        <stop offset='1' stopColor='#0f4a66' />
      </linearGradient>
      <linearGradient id='g-metal' x1='0' x2='1'>
        <stop offset='0' stopColor='#cfdde4' />
        <stop offset='.5' stopColor='#eaf2f5' />
        <stop offset='1' stopColor='#c5d6de' />
      </linearGradient>
      <g id='g-hills'>
        <path
          d='M0 400V340L54 322L108 336L170 306L238 342L300 330L372 346L438 312L500 336L560 318L640 334V400Z'
          fill='url(#g-hill-a)'
        />
        <path
          d='M0 400V366L80 352L150 368L230 348L320 366L410 350L500 368L580 354L640 362V400Z'
          fill='url(#g-hill-b)'
        />
      </g>
    </defs>
  </svg>
)

export default SceneDefs
