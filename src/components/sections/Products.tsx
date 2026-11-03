import { HiArrowUpRight, HiCheck } from 'react-icons/hi2'
import payEvent from '@/assets/work/pay-event.webp'
import wigudIcon from '@/assets/work/wigud-icon.webp'
import { BrowserFrame, Button, Container, Reveal, SectionHeading } from '@/components/ui'

// Illustration only: a simplified Wigud overview, not live data
const fleet = [
  { name: 'jeunessecharmey.ch', kind: 'Site web', blip: -1 },
  { name: '10kmpayerne.ch', kind: 'Site web', blip: -1 },
  { name: 'pay-event.ch', kind: 'Application', blip: -1 },
  { name: 'schweizersolaire.ch', kind: 'Site web', blip: -1 },
  { name: 'serveur principal', kind: 'Serveur', blip: 31 }
]

const WigudMock: React.FC = () => (
  <div className='rounded-2xl bg-[#0b0f17] p-5 font-mono text-[11px] text-white/70 shadow-2xl shadow-black/40 ring-1 ring-white/10 sm:p-6 sm:text-xs' aria-hidden='true'>
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2.5'>
        <img src={wigudIcon} alt='' className='size-7 rounded-lg' />
        <span className='font-sans text-sm font-semibold text-white'>Wigud</span>
      </div>
      <span className='rounded-full bg-emerald-400/10 px-2.5 py-1 text-emerald-300 ring-1 ring-emerald-400/30'>● we good.</span>
    </div>
    <ul className='mt-5 space-y-2.5'>
      {fleet.map(f => (
        <li key={f.name} className='rounded-xl bg-white/[0.03] px-3.5 py-3 ring-1 ring-white/5'>
          <div className='flex items-center justify-between gap-3'>
            <span className='flex items-center gap-2 truncate text-white/90'>
              <span className='size-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px] shadow-emerald-400' />
              {f.name}
            </span>
            <span className='shrink-0 text-white/40'>{f.kind}</span>
          </div>
          <div className='mt-2.5 flex gap-[2px]'>
            {Array.from({ length: 45 }, (_, i) => (
              <span key={i} className={`h-4 flex-1 rounded-[2px] ${i === f.blip ? 'bg-amber-400/80' : 'bg-emerald-400/60'}`} />
            ))}
          </div>
        </li>
      ))}
    </ul>
  </div>
)

const payEventSteps = [
  'Le bénévole tape la commande sur son téléphone',
  'Un QR code TWINT s’affiche',
  'Le client scanne et paie'
]

const wigudChecks = ['Site en ligne', 'Certificats & domaines', 'Mises à jour & failles', 'Sauvegardes']

const Products: React.FC = () => (
  <section id='produits' className='py-24 sm:py-32'>
    <Container>
      <SectionHeading
        eyebrow='Nos produits'
        title='Nos propres produits'
        intro='À côté des projets clients, CODEVS développe aussi ses propres outils. Nous les utilisons tous les jours.'
      />

      <div className='mt-14 space-y-6'>
        <Reveal>
          <article className='grid overflow-hidden rounded-[2rem] bg-[#0c0d0c] text-white lg:grid-cols-[1fr_1.15fr]'>
            <div className='p-8 sm:p-12'>
              <div className='flex flex-wrap items-center gap-3'>
                <span className='rounded-full bg-[#b6f36a] px-3.5 py-1 font-display text-sm font-bold text-ink'>Pay Event</span>
                <span className='text-sm text-white/55'>Caisse mobile pour les manifestations</span>
              </div>
              <h3 className='mt-7 text-3xl font-bold sm:text-4xl'>Encaissez en TWINT à vos manifestations.</h3>
              <ol className='mt-8 space-y-3'>
                {payEventSteps.map((s, i) => (
                  <li key={s} className='flex items-center gap-4'>
                    <span className='flex size-8 shrink-0 items-center justify-center rounded-full bg-[#b6f36a]/15 font-display text-sm font-bold text-[#b6f36a]'>
                      {i + 1}
                    </span>
                    <span className='text-white/85'>{s}</span>
                  </li>
                ))}
              </ol>
              <div className='mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-white/10 pt-8'>
                <div>
                  <p className='font-display text-3xl font-bold text-[#b6f36a]'>CHF 800’000+</p>
                  <p className='text-sm text-white/50'>déjà encaissés</p>
                </div>
                <Button href='https://pay-event.ch' variant='ghost'>
                  Découvrir Pay Event <HiArrowUpRight />
                </Button>
              </div>
            </div>
            <div className='relative flex items-center p-6 pt-0 sm:p-12 lg:pl-0'>
              <div className='absolute top-1/2 left-1/2 size-[420px] -translate-1/2 rounded-full bg-[#b6f36a]/15 blur-3xl' />
              <BrowserFrame src={payEvent} url='pay-event.ch' alt='Le site de Pay Event' dark className='relative w-full' />
            </div>
          </article>
        </Reveal>

        <Reveal>
          <article className='grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#16284f] to-[#0a1630] text-white lg:grid-cols-[1.15fr_1fr]'>
            <div className='relative order-last flex items-center p-6 pt-0 sm:p-12 lg:order-first lg:pr-0'>
              <div className='absolute top-1/2 left-1/2 size-[420px] -translate-1/2 rounded-full bg-[#4f86ec]/25 blur-3xl' />
              <div className='relative w-full'>
                <WigudMock />
              </div>
            </div>
            <div className='p-8 sm:p-12'>
              <div className='flex flex-wrap items-center gap-3'>
                <span className='flex items-center gap-2 rounded-full bg-[#4f86ec] py-1 pr-3.5 pl-1 font-display text-sm font-bold'>
                  <img src={wigudIcon} alt='' className='size-6 rounded-full' /> Wigud
                </span>
                <span className='text-sm text-white/55'>Notre outil de surveillance</span>
              </div>
              <h3 className='mt-7 text-3xl font-bold sm:text-4xl'>Vos sites surveillés en permanence.</h3>
              <p className='mt-4 leading-relaxed text-white/70'>
                Wigud vérifie en continu les sites et serveurs que nous gérons. Au moindre problème,
                nous recevons une alerte et intervenons.
              </p>
              <ul className='mt-8 grid grid-cols-2 gap-3'>
                {wigudChecks.map(c => (
                  <li key={c} className='flex items-center gap-2.5 text-white/85'>
                    <HiCheck className='shrink-0 text-lg text-emerald-300' />
                    {c}
                  </li>
                ))}
              </ul>
              <p className='mt-10 border-t border-white/10 pt-8 text-white/70'>
                <strong className='text-white'>Inclus</strong> pour les sites que nous hébergeons ou maintenons.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </Container>
  </section>
)

export default Products
