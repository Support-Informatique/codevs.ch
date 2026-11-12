import { cx } from '../shared/ui'

// The hero's two ridges as silhouettes; the front one is the footer rising into the section.
const BACK =
  'M0 354 C75 347 125 326 183 302 L255 266 C300 282 329 310 377 322 C440 313 487 278 544 257 C608 275 645 307 701 314 C754 298 805 256 867 237 C921 255 961 294 1020 305 C1097 287 1141 249 1203 238 C1274 260 1315 302 1377 314 C1460 307 1521 333 1600 340'
const FRONT =
  'M0 406 C70 390 130 358 178 320 L300 200 L338 233 C373 275 412 310 455 331 C515 319 569 307 610 300 C659 307 707 332 746 337 L860 160 L900 223 L927 270 L965 255 L984 288 C1041 310 1095 321 1150 306 L1250 225 L1300 274 C1390 323 1514 349 1600 362'
const edge =
  'fill-none stroke-[1.5] opacity-70 [vector-effect:non-scaling-stroke]'

/** Closes a ridge line into a filled shape that reaches below the viewBox. */
const fill = (edge: string) => `${edge} L1600 560 L0 560 Z`

const Ridges = () => (
  <svg
    className='mt-14 block h-[clamp(120px,17vw,270px)] w-full'
    viewBox='0 140 1600 290'
    preserveAspectRatio='none'
    aria-hidden='true'
  >
    <path className='fill-white/10' d={fill(BACK)} />
    <path className={cx(edge, 'stroke-white/35')} d={BACK} />
    {/* the front ridge is drawn after the back one's edge, so that edge never shows through it */}
    <path className='fill-ink' d={fill(FRONT)} />
    <path className={cx(edge, 'stroke-cyan-300')} d={FRONT} />
  </svg>
)

export default Ridges
