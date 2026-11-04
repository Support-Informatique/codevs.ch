import { HiArrowUpRight } from 'react-icons/hi2'
import { callPhone, emailHtml, openMail, phoneHtml } from '@/utils/contact'
import { Container, Eyebrow, Panorama, Reveal } from '@/components/ui'

const linkClass = 'group inline-flex items-center gap-2 text-left text-xl font-semibold transition-colors hover:text-sky sm:text-2xl'

const Contact: React.FC = () => (
  <section id='contact' className='bg-primary pt-24 text-white sm:pt-32'>
    <Container>
      <Reveal>
        <Eyebrow dark>Contact</Eyebrow>
        <h2 className='mt-5 text-5xl leading-[1.02] font-extrabold tracking-tight sm:text-7xl xl:text-8xl'>
          Vous avez un projet&nbsp;?<br /><span className='text-sky'>Écrivez-nous.</span>
        </h2>
        <p className='mt-6 max-w-xl text-lg text-white/70'>
          Ou appelez-nous. Le premier rendez-vous est gratuit.
        </p>
      </Reveal>

      <Reveal delay={0.1} className='mt-14 grid gap-8 border-t border-white/15 pt-8 sm:mt-20 md:grid-cols-3'>
        <div>
          <p className='text-sm text-white/55'>E-mail</p>
          <button type='button' onClick={openMail} className={`mt-2 ${linkClass}`}>
            <span dangerouslySetInnerHTML={{ __html: emailHtml() }} />
            <HiArrowUpRight className='text-base text-white/40 transition group-hover:text-sky' />
          </button>
        </div>
        <div>
          <p className='text-sm text-white/55'>Téléphone</p>
          <button type='button' onClick={callPhone} className={`mt-2 ${linkClass}`}>
            <span dangerouslySetInnerHTML={{ __html: phoneHtml() }} />
            <HiArrowUpRight className='text-base text-white/40 transition group-hover:text-sky' />
          </button>
        </div>
        <div>
          <p className='text-sm text-white/55'>Adresse</p>
          <p className='mt-2 text-xl font-semibold sm:text-2xl'>1700 Fribourg</p>
        </div>
      </Reveal>
    </Container>
    <div className='mt-16 sm:mt-20'>
      <Panorama dark />
    </div>
  </section>
)

export default Contact
