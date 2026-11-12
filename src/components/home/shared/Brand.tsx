import logo from '@/assets/images/logo.png'
import { cx } from './ui'

/** The CODEVS logo and name, linking back to the top of the page. */
const Brand = ({ light = false }: { light?: boolean }) => (
  <a
    href='#'
    className='inline-flex items-center gap-2.5 text-[17px] font-semibold tracking-[.02em]'
    aria-label='CODEVS, accueil'
  >
    <img
      className='size-7 rounded-full'
      src={logo}
      alt=''
      width={28}
      height={28}
    />
    <span className={cx(light && 'text-white')}>CODEVS</span>
  </a>
)

export default Brand
