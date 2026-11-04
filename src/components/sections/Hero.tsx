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

const Hero: React.FC = () => (
  <section className='flex min-h-svh flex-col pt-24'>
    <Container className='flex flex-1 flex-col justify-center py-12'>
      <motion.h1
        {...rise(0)}
        className='max-w-5xl text-[2.6rem] leading-[1.02] font-extrabold tracking-tight text-ink sm:text-7xl xl:text-[5.5rem]'
      >
        Sites web, applications et <span className='text-primary'>cybersécurité.</span>
      </motion.h1>

      <motion.div {...rise(0.12)} className='mt-8 flex items-center gap-4'>
        <div className='flex shrink-0 -space-x-3'>
          <img src={elwan} alt='Elwan' className='size-12 rounded-full object-cover ring-4 ring-background' />
          <img src={lionel} alt='Lionel' className='size-12 rounded-full object-cover ring-4 ring-background' />
        </div>
        <p className='text-lg text-ink/70 sm:text-xl'>Nous sommes Elwan et Lionel, deux ingénieurs à Fribourg.</p>
      </motion.div>

      <motion.div {...rise(0.22)} className='mt-10 flex flex-wrap items-center gap-x-8 gap-y-4'>
        <Button href='#contact'>
          Nous contacter <HiArrowRight />
        </Button>
        <a href='#realisations' className='inline-flex items-center gap-1.5 font-semibold text-primary hover:underline'>
          Voir nos réalisations <HiArrowRight />
        </a>
      </motion.div>
    </Container>

    <Panorama labels />
  </section>
)

export default Hero
