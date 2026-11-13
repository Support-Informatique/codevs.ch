import { cx } from './ui'

/**
 * The mark: the faceted summit of the hero and the scenes, reduced to a few planes so it stays
 * crisp at 28 px. Its lit face, shaded face and snow cap match the drawings.
 */
const Mark = () => (
  <svg viewBox='0 0 32 32' className='size-7 flex-none' aria-hidden='true'>
    <defs>
      <linearGradient id='brand-lit' x1='0' y1='4' x2='0' y2='28'>
        <stop stopColor='#5fc0dc' />
        <stop offset='1' stopColor='#1f91b6' />
      </linearGradient>
      <linearGradient id='brand-shade' x1='0' y1='4' x2='0' y2='28'>
        <stop stopColor='#1a7499' />
        <stop offset='1' stopColor='#0f4a66' />
      </linearGradient>
    </defs>
    {/* the ridge behind, on the right */}
    <path d='M21 13.5L31 28H17Z' fill='#b8e4f0' />
    <path d='M13.5 4L1 28H13Z' fill='url(#brand-lit)' />
    <path d='M13.5 4L26 28H13L13.6 16Z' fill='url(#brand-shade)' />
    <path
      d='M13.5 4L10.4 10.2L12.3 9.4L13.4 11L14.9 9.3L16.6 10.3Z'
      fill='#f1f9fc'
    />
  </svg>
)

/** The CODEVS mark and name, linking back to the top of the page. */
const Brand = ({ light = false }: { light?: boolean }) => (
  <a
    href='#'
    className='group inline-flex items-center gap-2 text-[16.5px] font-semibold tracking-[.05em]'
    aria-label='CODEVS, accueil'
  >
    <span className='[transition:translate_.35s_var(--ease-brand)] group-hover:-translate-y-0.5'>
      <Mark />
    </span>
    <span className={cx(light ? 'text-white' : 'text-ink')}>CODEVS</span>
  </a>
)

export default Brand
