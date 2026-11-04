import { HiArrowRight } from 'react-icons/hi'
import { Button, Container, Reveal, SectionHeading } from '@/components/ui'

const offers = [
  { title: 'Test d’intrusion web', text: 'Sites, applications, API et espaces clients.' },
  { title: 'Test d’intrusion infrastructure', text: 'Serveurs, services exposés et accès à distance.' },
  { title: 'Audit de sécurité', text: 'Un état des lieux clair et des priorités.' }
]

// Illustration only: one page of an example pentest report
const FindingMock: React.FC = () => (
  <div className='relative' aria-hidden='true'>
    <div className='absolute inset-0 translate-x-4 translate-y-4 rotate-2 rounded-lg bg-white/10 ring-1 ring-white/10' />
    <div className='relative rounded-lg bg-white p-6 text-ink shadow-2xl shadow-black/50 sm:p-8'>
      <div className='flex items-center justify-between border-b border-line pb-3 text-[11px] uppercase tracking-wider text-ink/45'>
        <span>Rapport de test d’intrusion</span>
        <span className='font-semibold text-red-600'>Confidentiel</span>
      </div>

      <div className='mt-6 flex items-start justify-between gap-6'>
        <div>
          <p className='font-mono text-xs text-ink/40'>Vulnérabilité 3.1</p>
          <p className='mt-1 font-display text-lg font-bold leading-snug sm:text-xl'>Injection SQL dans la recherche de produits</p>
        </div>
        <div className='shrink-0 rounded-md bg-red-600 px-3 py-2 text-center text-white'>
          <p className='font-mono text-xl font-bold leading-none'>9.8</p>
          <p className='mt-1 text-[10px] uppercase tracking-wider'>Critique</p>
        </div>
      </div>

      <dl className='mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-xs sm:text-sm'>
        <dt className='text-ink/45'>Composant</dt><dd className='font-mono'>/api/produits?q=</dd>
        <dt className='text-ink/45'>Impact</dt><dd>Lecture de toute la base clients</dd>
        <dt className='text-ink/45'>Statut</dt><dd className='font-medium text-emerald-700'>Corrigé et re-testé</dd>
      </dl>

      <p className='mt-6 text-[11px] font-semibold uppercase tracking-wider text-ink/45'>Preuve</p>
      <pre className='mt-2 overflow-hidden rounded-md bg-night p-4 font-mono text-[10.5px] leading-relaxed text-white/75 sm:text-xs'>
        GET /api/produits?q=<span className='bg-red-500/30 text-red-200'>chaise&apos;+OR+1=1--</span> HTTP/1.1{'\n'}
        Host: boutique.exemple.ch{'\n\n'}
        <span className='text-white'>HTTP/1.1 200 OK</span>{'\n'}
        <span className='text-amber-200'>{'{'} &quot;resultats&quot;: 2418 {'}'}</span>
      </pre>

      <p className='mt-6 text-[11px] font-semibold uppercase tracking-wider text-ink/45'>Recommandation</p>
      <p className='mt-2 text-sm leading-relaxed text-ink/70'>
        Utiliser des requêtes préparées pour tous les paramètres transmis à la base de données.
      </p>

      <p className='mt-6 border-t border-line pt-3 text-right font-mono text-[11px] text-ink/35'>7 / 24</p>
    </div>
  </div>
)

const Security: React.FC = () => (
  <section id='securite' className='relative isolate overflow-hidden bg-night py-24 text-white sm:py-32'>
    <div className='absolute inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_70%_50%,black,transparent_75%)] bg-[size:48px_48px]' />
    <Container className='grid items-center gap-14 lg:grid-cols-2'>
      <div>
        <SectionHeading
          dark
          eyebrow='Cybersécurité'
          title='Tests d’intrusion et audits de sécurité'
          intro='Nous testons vos sites, applications et serveurs comme le ferait un attaquant, avec votre accord. Vous recevez un rapport avec ce qu’il faut corriger, et comme nous sommes aussi développeurs, nous pouvons vous aider à le faire.'
        />
        <Reveal>
          <ul className='mt-10 divide-y divide-white/10 border-y border-white/10'>
            {offers.map(o => (
              <li key={o.title} className='flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'>
                <span className='font-semibold'>{o.title}</span>
                <span className='text-sm text-white/55'>{o.text}</span>
              </li>
            ))}
          </ul>
          <div className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-4'>
            <Button href='#contact' variant='light'>
              Demander un pentest <HiArrowRight />
            </Button>
            <p className='text-sm text-white/55'>
              Certifiés <strong className='text-white'>OSCP</strong> et <strong className='text-white'>OSWA</strong> (OffSec)
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <FindingMock />
      </Reveal>
    </Container>
  </section>
)

export default Security
