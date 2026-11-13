import ContactAction from '../shared/ContactAction'
import { ArrowUpRight } from '../shared/Icons'
import Reveal from '../shared/Reveal'
import { container, cx, mono } from '../shared/ui'
import Ridges from './Ridges'

const value =
  'mt-2 inline-flex items-center gap-2 text-[clamp(20px,2vw,26px)] font-semibold tracking-[-.02em] text-white'
const action = cx(value, 'group transition-colors duration-200 hover:text-sky')
const label = 'block text-[14px] text-white/65'

const Arrow = () => (
  <ArrowUpRight className='size-4 text-white/50 [transition:color_.2s,translate_.25s_var(--ease-brand)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky' />
)

/** The closing call to action, on the primary blue, with the hero's ridges rising into the footer. */
const Contact = () => (
  <section
    className='relative overflow-hidden bg-primary pt-30 text-white max-[760px]:pt-22'
    id='contact'
  >
    <div className={container}>
      <Reveal as='p' className={cx(mono, 'text-[12px] text-sky')}>
        - Contact
      </Reveal>
      <Reveal
        as='h2'
        className='mt-5 text-[clamp(46px,8vw,104px)] leading-[.98] font-semibold tracking-[-.055em]'
      >
        Vous avez un projet&nbsp;?
        <br />
        <span className='text-sky'>Écrivez-nous.</span>
      </Reveal>
      <Reveal
        as='p'
        delay='.08s'
        className='mt-6 max-w-140 text-[18px] text-white/78'
      >
        Ou appelez-nous. Le premier rendez-vous est gratuit.
      </Reveal>
      <Reveal
        delay='.14s'
        className='mt-18 grid grid-cols-3 gap-8 border-t border-white/20 pt-8 max-[760px]:mt-12 max-[760px]:grid-cols-1 max-[760px]:gap-6'
      >
        <div>
          <span className={label}>E-mail</span>
          <ContactAction kind='email' className={action}>
            <Arrow />
          </ContactAction>
        </div>
        <div>
          <span className={label}>Téléphone</span>
          <ContactAction kind='phone' className={action}>
            <Arrow />
          </ContactAction>
        </div>
        <div>
          <span className={label}>Adresse</span>
          <p className={value}>1700 Fribourg</p>
        </div>
      </Reveal>
    </div>
    <Ridges />
  </section>
)

export default Contact
