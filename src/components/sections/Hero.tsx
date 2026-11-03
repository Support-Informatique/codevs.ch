import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import elwan from '@/assets/team/elwan.webp'
import lionel from '@/assets/team/lionel.webp'
import { Button, Container, Panorama } from '@/components/ui'

const ease = [0.22, 1, 0.36, 1] as const
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay }
})

const facts = [
  { value: '20+', label: 'clients en Suisse romande' },
  { value: 'CHF 800’000+', label: 'encaissés avec Pay Event' },
  { value: 'OSCP · OSWA', label: 'certifiés en sécurité offensive' },
  { value: 'Depuis Fribourg', label: 'pour toute la Romandie' }
]

const Hero: React.FC = () => (
  <section className='pt-32 sm:pt-40'>
    <Container>
      <motion.p {...rise(0)} className='text-sm font-semibold text-secondary'>
        CODEVS Sàrl · Agence web et cybersécurité à Fribourg
      </motion.p>
      <motion.h1
        {...rise(0.08)}
        className='mt-6 max-w-5xl text-[2.6rem] leading-[1.02] font-extrabold tracking-tight text-ink sm:text-7xl xl:text-[5.5rem]'
      >
        Sites web, applications et <span className='text-primary'>cybersécurité.</span>
      </motion.h1>

      <div className='mt-10 flex flex-col gap-8 border-t border-ink/10 pt-8 sm:mt-14 lg:flex-row lg:items-center lg:justify-between'>
        <motion.div {...rise(0.18)} className='flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5'>
          <div className='flex shrink-0 -space-x-3'>
            <img src={elwan} alt='Elwan' className='size-14 rounded-full object-cover ring-4 ring-background' />
            <img src={lionel} alt='Lionel' className='size-14 rounded-full object-cover ring-4 ring-background' />
          </div>
          <p className='max-w-md text-lg leading-snug text-ink/70'>
            On est Elwan et Lionel. On travaille pour des associations, des PME et des commerces de
            toute la Suisse romande.
          </p>
        </motion.div>
        <motion.div {...rise(0.26)} className='flex flex-col gap-3 sm:flex-row'>
          <Button href='#contact'>
            Nous contacter <HiArrowRight />
          </Button>
          <Button href='#realisations' variant='secondary'>
            Voir nos réalisations
          </Button>
        </motion.div>
      </div>
    </Container>

    <div className='mt-12 sm:mt-6'>
      <Panorama labels />
    </div>

    <div className='bg-white'>
      <Container className='grid grid-cols-2 gap-x-6 gap-y-8 pb-6 lg:grid-cols-4'>
        {facts.map(f => (
          <div key={f.label}>
            <p className='font-display text-xl font-bold text-ink sm:text-2xl'>{f.value}</p>
            <p className='mt-1 text-sm text-ink/55'>{f.label}</p>
          </div>
        ))}
      </Container>
    </div>
  </section>
)

export default Hero
