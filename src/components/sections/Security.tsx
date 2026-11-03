import { HiArrowRight } from 'react-icons/hi'
import { Button, Container, Reveal, SectionHeading } from '@/components/ui'

const offers = [
  { title: 'Test d’intrusion web', text: 'Sites, applications, API et espaces clients.' },
  { title: 'Test d’intrusion infrastructure', text: 'Serveurs, services exposés et accès à distance.' },
  { title: 'Audit de sécurité', text: 'Un état des lieux clair et des priorités.' }
]

const severity = {
  Critique: 'bg-red-500/15 text-red-300 ring-red-400/30',
  Élevée: 'bg-orange-500/15 text-orange-300 ring-orange-400/30',
  Moyenne: 'bg-amber-500/15 text-amber-200 ring-amber-300/30',
  Faible: 'bg-sky-500/15 text-sky-200 ring-sky-300/30'
}

const findings: Array<{ title: string, level: keyof typeof severity }> = [
  { title: 'Injection SQL dans le formulaire de recherche', level: 'Critique' },
  { title: 'Accès aux factures d’autres clients via l’URL', level: 'Élevée' },
  { title: 'Extension WordPress vulnérable', level: 'Moyenne' },
  { title: 'En-têtes de sécurité manquants', level: 'Faible' }
]

const ReportMock: React.FC = () => (
  <div className='rounded-[1.75rem] bg-night p-6 text-white shadow-2xl shadow-ink/30 ring-1 ring-white/10 sm:p-8' aria-hidden='true'>
    <div className='flex items-center justify-between text-xs text-white/50'>
      <span className='font-mono'>rapport-pentest.pdf</span>
      <span className='rounded-full px-2.5 py-0.5 ring-1 ring-white/15'>Exemple</span>
    </div>
    <p className='mt-6 font-display text-xl font-bold'>Synthèse</p>
    <div className='mt-4 grid grid-cols-4 gap-2 text-center'>
      {Object.entries(severity).map(([label, cls], i) => (
        <div key={label} className={`rounded-xl px-1 py-3 ring-1 ${cls}`}>
          <p className='font-display text-2xl font-bold'>{[1, 2, 4, 6][i]}</p>
          <p className='text-[10px] uppercase tracking-wide opacity-80 sm:text-[11px]'>{label}</p>
        </div>
      ))}
    </div>
    <ul className='mt-6 divide-y divide-white/10 text-sm'>
      {findings.map(f => (
        <li key={f.title} className='flex items-center justify-between gap-4 py-3.5'>
          <span className='flex items-center gap-3'>
            <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ring-1 ${severity[f.level]}`}>{f.level}</span>
            <span className='text-white/85'>{f.title}</span>
          </span>
          <span className='hidden shrink-0 text-xs text-emerald-300 sm:inline'>✓ corrigé</span>
        </li>
      ))}
    </ul>
  </div>
)

const Security: React.FC = () => (
  <section id='securite' className='bg-white py-24 sm:py-32'>
    <Container className='grid items-center gap-14 lg:grid-cols-2'>
      <div>
        <SectionHeading
          eyebrow='Cybersécurité'
          title='Tests d’intrusion et audits de sécurité'
          intro='On teste vos sites, applications et serveurs comme le ferait un attaquant, avec votre accord. Vous recevez un rapport avec ce qu’il faut corriger, et comme on est aussi développeurs, on peut vous aider à le faire.'
        />
        <Reveal>
          <ul className='mt-10 divide-y divide-line border-y border-line'>
            {offers.map(o => (
              <li key={o.title} className='flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'>
                <span className='font-semibold'>{o.title}</span>
                <span className='text-sm text-ink/60'>{o.text}</span>
              </li>
            ))}
          </ul>
          <div className='mt-8 flex flex-wrap items-center gap-x-6 gap-y-4'>
            <Button href='#contact'>
              Demander un pentest <HiArrowRight />
            </Button>
            <p className='text-sm text-ink/60'>
              Certifiés <strong className='text-ink'>OSCP</strong> et <strong className='text-ink'>OSWA</strong> (OffSec)
            </p>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.1}>
        <ReportMock />
      </Reveal>
    </Container>
  </section>
)

export default Security
