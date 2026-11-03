import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { HiArrowRight } from 'react-icons/hi'
import { HiCheck, HiPlus } from 'react-icons/hi2'
import charmey from '@/assets/work/jeunesse-charmey.webp'
import payerne from '@/assets/work/10km-payerne.webp'
import schweizer from '@/assets/work/schweizer-solaire.webp'
import lavage from '@/assets/work/lavage-shop.webp'
import { Container, Reveal, SectionHeading } from '@/components/ui'

const SitesVisual: React.FC = () => (
  <div className='relative h-full'>
    {[
      { src: schweizer, cls: 'top-[4%] left-0 w-[62%] -rotate-3' },
      { src: payerne, cls: 'top-[18%] right-0 w-[62%] rotate-2' },
      { src: charmey, cls: 'bottom-[4%] left-[16%] w-[66%]' }
    ].map(s => (
      <img key={s.src} src={s.src} alt='' className={`absolute aspect-[16/10] rounded-xl object-cover object-top shadow-2xl shadow-ink/25 ring-1 ring-ink/10 ${s.cls}`} />
    ))}
  </div>
)

const AppsVisual: React.FC = () => (
  <div className='relative h-full'>
    <img src={lavage} alt='' className='size-full rounded-2xl object-cover' />
    <div className='absolute right-5 bottom-5 w-56 rounded-2xl bg-white p-4 shadow-xl shadow-ink/20'>
      <p className='text-xs text-ink/55'>Machine 3 · Lavage 60°</p>
      <p className='mt-1 font-display text-2xl font-bold text-ink'>CHF 6.00</p>
      <p className='mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-600'>
        <span className='flex size-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white'><HiCheck /></span>
        Payé avec TWINT
      </p>
    </div>
  </div>
)

const terminal = [
  { t: '$ pentest --cible boutique.votre-site.ch', c: 'text-white/90' },
  { t: '  412 requêtes testées', c: 'text-white/50' },
  { t: '  ! injection SQL sur /recherche', c: 'text-red-300' },
  { t: '  ! factures accessibles via l’URL', c: 'text-orange-300' },
  { t: '  ✓ authentification', c: 'text-emerald-300' },
  { t: '  ✓ paiements', c: 'text-emerald-300' },
  { t: '$ rapport --envoyer', c: 'text-white/90' },
  { t: '  rapport-pentest.pdf envoyé, correctifs proposés', c: 'text-sky' }
]

const SecurityVisual: React.FC = () => (
  <div className='flex h-full flex-col overflow-hidden rounded-2xl bg-night p-5 font-mono text-[11px] leading-6 shadow-2xl shadow-ink/30 sm:p-8 sm:text-sm sm:leading-8 lg:text-[15px] lg:leading-9'>
    <div className='mb-5 flex gap-1.5'>
      <span className='size-2.5 rounded-full bg-white/15' />
      <span className='size-2.5 rounded-full bg-white/15' />
      <span className='size-2.5 rounded-full bg-white/15' />
    </div>
    {terminal.map((l, i) => (
      <motion.p key={l.t} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.12 }} className={`whitespace-pre ${l.c}`}>
        {l.t}
      </motion.p>
    ))}
    <p className='mt-auto flex items-center justify-between border-t border-white/10 pt-4 font-sans text-xs text-white/50'>
      <span>1 critique · 1 élevée · 0 moyenne</span>
      <span className='rounded-full px-2.5 py-0.5 text-sky ring-1 ring-sky/30'>Re-test inclus</span>
    </p>
  </div>
)

const hosted = ['jeunessecharmey.ch', '10kmpayerne.ch', 'pay-event.ch', 'schweizersolaire.ch', 'coupedenoelesta.ch', 'acritec.ch']

const HostingVisual: React.FC = () => (
  <div className='flex h-full flex-col justify-center gap-3 rounded-2xl bg-white p-5 sm:gap-5 shadow-2xl shadow-ink/10 ring-1 ring-line sm:p-8'>
    <p className='flex items-center justify-between text-sm'>
      <span className='font-semibold text-ink'>Vos sites</span>
      <span className='flex items-center gap-2 text-emerald-600'>
        <span className='size-2 rounded-full bg-emerald-500' /> Tout est en ligne
      </span>
    </p>
    {hosted.map(h => (
      <div key={h}>
        <p className='flex justify-between text-xs text-ink/60'>
          <span>{h}</span><span>99.98%</span>
        </p>
        <div className='mt-1.5 flex gap-[3px]'>
          {Array.from({ length: 40 }, (_, i) => <span key={i} className='h-3.5 flex-1 rounded-[2px] bg-emerald-400/70 sm:h-6' />)}
        </div>
      </div>
    ))}
    <p className='text-xs text-ink/45'>Hébergé en Suisse · Sauvegardes quotidiennes · Mises à jour</p>
  </div>
)

const services = [
  {
    title: 'Sites web',
    text: 'Pour une association, un événement ou une entreprise. Vous pouvez ensuite modifier le contenu vous-même.',
    tags: ['Associations', 'Événements', 'PME & artisans', 'Boutiques en ligne'],
    Visual: SitesVisual
  },
  {
    title: 'Applications & systèmes de vente',
    text: 'Caisses, bornes, paiements ou outils internes, développés selon votre façon de travailler.',
    tags: ['Caisses & kiosques', 'TWINT & terminaux', 'E-commerce', 'Outils internes'],
    Visual: AppsVisual
  },
  {
    title: 'Cybersécurité',
    text: 'Tests d’intrusion et audits de sécurité, par une équipe certifiée OSCP et OSWA.',
    tags: ['Pentest', 'Audit', 'Re-test'],
    href: '#securite',
    Visual: SecurityVisual
  },
  {
    title: 'Hébergement & suivi',
    text: 'Vos sites hébergés en Suisse, mis à jour et surveillés en permanence.',
    tags: ['Infomaniak', 'Mises à jour', 'Monitoring 24/7'],
    href: '#produits',
    Visual: HostingVisual
  }
]

const CYCLE_MS = 6000

const Services: React.FC = () => {
  const [active, setActive] = useState(0)
  const [auto, setAuto] = useState(true)
  const listRef = useRef<HTMLUListElement>(null)
  const inView = useInView(listRef, { amount: 0.5 })
  const Visual = services[active].Visual

  // Desktop only: cycle through the services until the visitor picks one
  const cycling = auto && inView && window.matchMedia('(min-width: 1024px)').matches
  useEffect(() => {
    if (!cycling) return
    const t = setTimeout(() => setActive(a => (a + 1) % services.length), CYCLE_MS)
    return () => clearTimeout(t)
  }, [active, cycling])
  return (
    <section id='services' className='py-24 sm:py-32'>
      <Container>
        <SectionHeading
          eyebrow='Nos services'
          title='Du site d’association au système de caisse.'
          intro='CODEVS s’occupe de tout, du design à la mise en ligne, puis de la maintenance.'
        />

        <div className='mt-14 grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16'>
          <Reveal>
            <ul ref={listRef} className='space-y-2'>
              {services.map((s, i) => {
                const open = i === active
                return (
                  <li key={s.title} className='relative border-l-2 border-ink/10 pl-5 sm:pl-7'>
                    {open && (
                      <motion.span
                        key={cycling ? `${active}-run` : 'full'}
                        initial={{ scaleY: cycling ? 0 : 1 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: cycling ? CYCLE_MS / 1000 : 0, ease: 'linear' }}
                        className='absolute top-0 -left-[2px] h-full w-0.5 origin-top bg-primary'
                      />
                    )}
                    <button
                      type='button'
                      onClick={() => { setActive(i); setAuto(false) }}
                      aria-expanded={open}
                      className={`group flex w-full items-baseline gap-4 py-3 text-left font-display text-2xl font-bold transition-colors sm:text-3xl ${open ? 'text-ink' : 'text-ink/35 hover:text-ink/70'}`}
                    >
                      <span className='font-display text-sm text-secondary'>0{i + 1}</span>
                      {s.title}
                      <span
                        className={`ml-auto flex size-8 shrink-0 items-center justify-center self-center rounded-full text-base ring-1 transition ${
                          open ? 'rotate-45 text-primary ring-primary/30' : 'text-ink/40 ring-ink/15 group-hover:text-primary'
                        }`}
                      >
                        <HiPlus />
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className='overflow-hidden'
                        >
                          <div className='pb-6'>
                            <p className='max-w-lg text-lg leading-relaxed text-ink/65'>{s.text}</p>
                            <p className='mt-3 text-sm text-ink/45'>{s.tags.join(' · ')}</p>
                            {s.href && (
                              <a href={s.href} className='mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline'>
                                En savoir plus <HiArrowRight />
                              </a>
                            )}
                            <div className='mt-6 h-[22rem] sm:h-[28rem] lg:hidden'>
                              <s.Visual />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                )
              })}
            </ul>
            <p className='mt-10 text-ink/65'>
              Pas sûr de ce qu’il vous faut&nbsp;?{' '}
              <a href='#contact' className='inline-flex items-center gap-1 font-semibold text-primary hover:underline'>
                Expliquez-nous votre idée <HiArrowRight />
              </a>
            </p>
          </Reveal>

          <div className='hidden lg:block' aria-hidden='true'>
            <div className='sticky top-28 aspect-[4/3.3]'>
              <AnimatePresence mode='wait'>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className='size-full'
                >
                  <Visual />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Services
