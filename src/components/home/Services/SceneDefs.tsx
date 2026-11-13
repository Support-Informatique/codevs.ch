/**
 * Shared by the scenes: the light back ridges, the faceted mountain (summit at 300, 72; foot at
 * y 340) and the till's metal stand.
 */
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
      <g id='g-peak'>
        <path
          d='M300 72L258 156L232 212L198 258L152 296L104 340L292 340L300 214L295 150Z'
          fill='url(#g-lit)'
        />
        <path d='M232 212L198 258L236 284Z' fill='#fff' opacity='.08' />
        <path
          d='M198 258L152 296L104 340L196 340L214 300Z'
          fill='#0f4a66'
          opacity='.2'
        />
        <path
          d='M300 72L326 118L344 150L368 212L392 248L420 262L448 300L478 340L292 340L300 214L295 150Z'
          fill='url(#g-shade)'
        />
        <path
          d='M392 248L420 262L448 300L406 300Z'
          fill='#0a3044'
          opacity='.16'
        />
        <path d='M326 118L344 150L330 160Z' fill='#0a3044' opacity='.12' />
        <path d='M300 72L244 190L276 238Z' fill='#fff' opacity='.13' />
        <path d='M300 72L226 318L250 340L276 258Z' fill='#fff' opacity='.06' />
        <path d='M300 72L366 206L334 240Z' fill='#0a3044' opacity='.14' />
        <path
          d='M300 72L276 122L284 116L290 130L296 119L300 132Z'
          fill='#f1f9fc'
        />
        <path
          d='M300 72L300 132L306 138L313 121L318 129L328 122Z'
          fill='#dcf0f6'
        />
      </g>
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
