import Brand from '../shared/Brand'
import ContactAction from '../shared/ContactAction'
import { ArrowRight, ArrowUpRight } from '../shared/Icons'
import { SECTIONS } from '../shared/links'
import { container, cx } from '../shared/ui'
import { openMail } from '@/utils/contact'

const AGENCY = SECTIONS.filter(({ href }) => href !== '#produits')

const column = 'flex flex-col items-start gap-3'
const heading = 'mb-1 text-[14px] font-medium text-white'
const item = 'inline-flex items-center gap-1 text-white/60'
const link = cx(item, 'transition-colors duration-200 hover:text-white')

const External = () => <ArrowUpRight className='size-3 opacity-60' />

/** Brand and pitch, then headed link columns, then the copyright line. */
const Footer = () => (
  <footer className='relative -mt-px overflow-hidden bg-ink text-[14px] text-white/60'>
    <div className={container}>
      <div className='grid grid-cols-[1.7fr_1fr_1fr_1.2fr] gap-10 pt-12 pb-14 max-[900px]:grid-cols-2'>
        <div className='max-[900px]:col-span-full'>
          <Brand light />
          <p className='mt-4 max-w-75 leading-[1.6]'>
            Agence web et cybersécurité à Fribourg. Sites, applications et tests
            d’intrusion pour toute la Suisse romande.
          </p>
          <button
            type='button'
            onClick={openMail}
            className='group mt-6 inline-flex h-9 items-center gap-2 rounded-full bg-white px-3.5 font-medium text-ink transition-[background,box-shadow] duration-200 hover:bg-cyan-50 hover:shadow-[0_0_0_4px_rgba(132,210,229,.25)]'
          >
            Démarrer un projet{' '}
            <ArrowRight className='size-3.5 transition-transform duration-250 ease-brand group-hover:translate-x-0.5' />
          </button>
        </div>
        <nav className={column} aria-label='Agence'>
          <h4 className={heading}>Agence</h4>
          {AGENCY.map(({ href, label }) => (
            <a key={href} href={href} className={link}>
              {label}
            </a>
          ))}
        </nav>
        <nav className={column} aria-label='Produits'>
          <h4 className={heading}>Produits</h4>
          <a
            href='https://pay-event.ch'
            target='_blank'
            rel='noreferrer'
            className={link}
          >
            Pay Event <External />
          </a>
          <a href='#produits' className={link}>
            Wigud
          </a>
        </nav>
        <div className={column}>
          <h4 className={heading}>Contact</h4>
          <ContactAction kind='email' className={link} />
          <ContactAction kind='phone' className={link} />
          <a
            href='https://www.linkedin.com/company/codevs-ch/'
            target='_blank'
            rel='noreferrer'
            className={link}
          >
            LinkedIn <External />
          </a>
          <span className={item}>1700 Fribourg, Suisse</span>
        </div>
      </div>
      <div className='flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 pb-8 text-[13px]'>
        <span className='text-white/45'>
          © {new Date().getFullYear()} CODEVS Sàrl
        </span>
      </div>
    </div>
  </footer>
)

export default Footer
