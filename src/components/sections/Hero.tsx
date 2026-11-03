import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { HiCheck, HiOutlineGlobeAlt, HiOutlineShieldCheck } from 'react-icons/hi2'
import mountains from '@/assets/work/mountains.webp'
import { Button, Container } from '@/components/ui'

const ease = [0.22, 1, 0.36, 1] as const

const facts = [
  { value: '20+', label: 'clients en Suisse romande' },
  { value: 'CHF 800’000+', label: 'encaissés avec Pay Event' },
  { value: 'OSCP · OSWA', label: 'certifiés en sécurité offensive' },
  { value: 'Fribourg', label: 'et dans toute la Romandie' }
]

const FloatingCard: React.FC<{ children: ReactNode, className: string, delay: number }> = ({ children, className, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease, delay }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}
      className='rounded-2xl bg-white/95 p-4 shadow-xl shadow-ink/15 ring-1 ring-white backdrop-blur'
    >
      {children}
    </motion.div>
  </motion.div>
)

const Hero: React.FC = () => (
  <section className='relative isolate overflow-hidden pt-28 sm:pt-32'>
    <div className='absolute -top-40 -left-40 -z-10 size-[600px] rounded-full bg-sky/50 blur-3xl' />
    <Container className='grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10'>
      <div>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className='inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary ring-1 ring-line sm:text-sm'
        >
          <span className='size-1.5 rounded-full bg-secondary' />
          CODEVS Sàrl · Fribourg
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className='mt-6 text-[2.75rem] leading-[1.04] font-extrabold text-ink sm:text-6xl xl:text-7xl'
        >
          Sites web, applications et <span className='text-primary'>cybersécurité.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className='mt-6 max-w-xl text-lg leading-relaxed text-ink/65'
        >
          On est Elwan et Lionel. On travaille pour des associations, des PME et des commerces de
          toute la Suisse romande.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className='mt-9 flex flex-col gap-3 sm:flex-row'
        >
          <Button href='#contact'>
            Nous contacter <HiArrowRight />
          </Button>
          <Button href='#realisations' variant='secondary'>
            Voir nos réalisations
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease, delay: 0.15 }}
        className='relative hidden w-full lg:block'
        aria-hidden='true'
      >
        <div
          className='aspect-[4/5] w-full rounded-[2rem] bg-sky bg-cover bg-[center_55%] shadow-2xl shadow-primary/15'
          style={{ backgroundImage: `url(${mountains})` }}
        />

        <FloatingCard className='top-8 left-3 w-60 sm:-left-8' delay={0.5}>
          <div className='flex items-center gap-3'>
            <span className='flex size-10 items-center justify-center rounded-xl bg-sky/60 text-xl text-primary'>
              <HiOutlineGlobeAlt />
            </span>
            <div>
              <p className='text-sm font-semibold text-ink'>Votre nouveau site</p>
              <p className='flex items-center gap-1.5 text-xs text-ink/55'>
                <span className='size-1.5 rounded-full bg-emerald-500' /> En ligne
              </p>
            </div>
          </div>
        </FloatingCard>

        <FloatingCard className='top-[36%] right-3 w-48 sm:top-[34%] sm:-right-8 sm:w-52' delay={0.7}>
          <p className='text-xs text-ink/55'>Paiement reçu</p>
          <p className='mt-1 font-display text-2xl font-bold text-ink'>CHF 24.00</p>
          <div className='mt-3 flex items-center justify-between'>
            <span className='rounded-md bg-ink px-2 py-0.5 text-[11px] font-semibold text-white'>TWINT</span>
            <span className='flex size-6 items-center justify-center rounded-full bg-emerald-500 text-sm text-white'>
              <HiCheck />
            </span>
          </div>
        </FloatingCard>

        <FloatingCard className='bottom-5 left-3 w-64 sm:bottom-20 sm:-left-10' delay={0.9}>
          <div className='flex items-center gap-3'>
            <span className='flex size-10 items-center justify-center rounded-xl bg-primary text-xl text-white'>
              <HiOutlineShieldCheck />
            </span>
            <div>
              <p className='text-sm font-semibold text-ink'>Test d’intrusion terminé</p>
              <p className='text-xs text-ink/55'>Failles corrigées et re-testées</p>
            </div>
          </div>
          <div className='mt-3 flex gap-1'>
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className='h-1.5 flex-1 rounded-full bg-secondary' />
            ))}
          </div>
        </FloatingCard>

        <FloatingCard className='right-6 bottom-6 hidden sm:block' delay={1.1}>
          <p className='flex items-center gap-2 text-sm font-semibold text-ink'>
            <span className='relative flex size-2'>
              <span className='absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75' />
              <span className='relative inline-flex size-2 rounded-full bg-emerald-500' />
            </span>
            Tout est en ligne
          </p>
        </FloatingCard>
      </motion.div>
    </Container>

    <Container className='grid grid-cols-2 gap-x-6 gap-y-8 py-16 lg:grid-cols-4'>
      {facts.map(f => (
        <div key={f.label} className='border-l-2 border-secondary/40 pl-4'>
          <p className='font-display text-xl font-bold text-ink sm:text-2xl'>{f.value}</p>
          <p className='mt-1 text-sm text-ink/60'>{f.label}</p>
        </div>
      ))}
    </Container>
  </section>
)

export default Hero
