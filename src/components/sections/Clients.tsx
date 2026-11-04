import { clientLogos } from '@/data/data'
import { Container } from '@/components/ui'

const facts = [
  { value: '50+', label: 'clients en Suisse romande' },
  { value: 'CHF 800’000+', label: 'encaissés avec Pay Event' },
  { value: 'OSCP · OSWA', label: 'certifiés en sécurité offensive' },
  { value: 'Partenaire RaiseNow', label: 'intégration des dons en ligne', href: 'https://www.raisenow.com/fr-ch/entreprise/partenaires' }
]

const Clients: React.FC = () => (
  <section aria-label='Ils nous font confiance' className='bg-white pb-16'>
    <Container className='grid grid-cols-2 gap-x-6 gap-y-8 pb-16 lg:grid-cols-4'>
      {facts.map(f => (
        <div key={f.label}>
          <p className='font-display text-xl font-bold text-ink sm:text-2xl'>
            {'href' in f
              ? <a href={f.href} target='_blank' rel='noreferrer' className='underline decoration-secondary/40 decoration-2 underline-offset-4 hover:decoration-secondary'>{f.value}</a>
              : f.value}
          </p>
          <p className='mt-1 text-sm text-ink/55'>{f.label}</p>
        </div>
      ))}
    </Container>
    <p className='text-center text-sm font-medium text-ink/50'>
      Ils nous ont fait confiance
    </p>
    <div className='relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
      <ul className='marquee flex w-max items-center gap-14 pr-14'>
        {[...clientLogos, ...clientLogos].map((logo, i) => (
          <li key={i} aria-hidden={i >= clientLogos.length}>
            <img
              src={logo.src}
              alt={logo.name}
              loading='lazy'
              className='h-12 w-auto max-w-[130px] object-contain opacity-60 mix-blend-multiply grayscale transition hover:opacity-100 hover:grayscale-0'
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default Clients
