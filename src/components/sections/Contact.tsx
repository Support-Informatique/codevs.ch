import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2'
import mountainsNight from '@/assets/work/mountains-night.webp'
import { callPhone, emailHtml, openMail, phoneHtml } from '@/utils/contact'
import { Button, Container, Reveal } from '@/components/ui'

const Contact: React.FC = () => (
  <section id='contact' className='px-3 pt-24 pb-3 sm:px-4 sm:pt-32 sm:pb-4'>
    <Reveal>
      <div
        className='relative isolate overflow-hidden rounded-[2rem] bg-navy bg-cover bg-bottom text-white'
        style={{ backgroundImage: `url(${mountainsNight})` }}
      >
        <div className='absolute inset-0 -z-10 bg-gradient-to-b from-night/85 via-night/40 to-transparent' />
        <Container className='grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.3fr_1fr] lg:items-center'>
          <div>
            <h2 className='text-4xl font-extrabold sm:text-6xl'>Vous avez un projet&nbsp;?<br /><span className='text-sky'>Écrivez-nous.</span></h2>
            <p className='mt-6 max-w-xl text-lg leading-relaxed text-white/75'>
              Ou appelez-nous. Le premier rendez-vous est gratuit.
            </p>
            <div className='mt-9 flex flex-col gap-3 sm:flex-row'>
              <Button variant='light' onClick={openMail}>
                <HiOutlineEnvelope className='text-lg' /> Nous écrire
              </Button>
              <Button variant='ghost' onClick={callPhone}>
                <HiOutlinePhone className='text-lg' /> Nous appeler
              </Button>
            </div>
          </div>
          <ul className='space-y-5 rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/15 backdrop-blur-md sm:p-8'>
            <li className='flex items-start gap-4'>
              <HiOutlineEnvelope className='mt-0.5 text-xl text-sky' />
              <div>
                <p className='text-sm text-white/55'>E-mail</p>
                <button type='button' onClick={openMail} className='font-semibold hover:text-sky' dangerouslySetInnerHTML={{ __html: emailHtml() }} />
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <HiOutlinePhone className='mt-0.5 text-xl text-sky' />
              <div>
                <p className='text-sm text-white/55'>Téléphone</p>
                <button type='button' onClick={callPhone} className='font-semibold hover:text-sky' dangerouslySetInnerHTML={{ __html: phoneHtml() }} />
              </div>
            </li>
            <li className='flex items-start gap-4'>
              <HiOutlineMapPin className='mt-0.5 text-xl text-sky' />
              <div>
                <p className='text-sm text-white/55'>Adresse</p>
                <p className='font-semibold'>CODEVS Sàrl · 1700 Fribourg</p>
              </div>
            </li>
          </ul>
        </Container>
      </div>
    </Reveal>
  </section>
)

export default Contact
