import { HiArrowRight } from 'react-icons/hi'
import { Button, Container, Reveal, SectionHeading } from '@/components/ui'

const offers = [
  { title: 'Test d’intrusion web', text: 'Sites, applications, API et espaces clients.' },
  { title: 'Test d’intrusion infrastructure', text: 'Serveurs, services exposés et accès à distance.' },
  { title: 'Audit de sécurité', text: 'Un état des lieux clair et des priorités.' }
]

const certs = [
  { name: 'OSCP', full: 'OffSec Certified Professional', text: 'Certification pratique en tests d’intrusion de réseaux et de serveurs.' },
  { name: 'OSWA', full: 'OffSec Web Assessor', text: 'Certification pratique en sécurité des applications web.' }
]

const Security: React.FC = () => (
  <section id='securite' className='bg-white py-24 sm:py-32'>
    <Container>
      <div className='flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between'>
        <SectionHeading
          eyebrow='Cybersécurité'
          title='Tests d’intrusion et audits de sécurité'
          intro='Nous testons vos sites, applications et serveurs comme le ferait un attaquant, avec votre accord. Vous recevez un rapport clair, et comme nous sommes aussi développeurs, nous pouvons vous aider à corriger.'
        />
        <Reveal className='shrink-0'>
          <Button href='#contact'>
            Demander un pentest <HiArrowRight />
          </Button>
        </Reveal>
      </div>

      <Reveal className='mt-14 grid gap-8 border-t border-ink/10 pt-8 md:grid-cols-3'>
        {offers.map(o => (
          <div key={o.title}>
            <h3 className='text-xl font-bold'>{o.title}</h3>
            <p className='mt-2 text-ink/60'>{o.text}</p>
          </div>
        ))}
      </Reveal>

      <Reveal className='mt-16 grid gap-10 border-t border-ink/10 pt-10 sm:grid-cols-2'>
        {certs.map(c => (
          <div key={c.name} className='flex flex-col gap-3 lg:flex-row lg:items-start lg:gap-6'>
            <p className='font-display text-5xl font-extrabold tracking-tight text-primary sm:text-6xl'>{c.name}</p>
            <div className='lg:pt-1'>
              <p className='font-semibold'>{c.full}</p>
              <p className='mt-1 text-sm leading-relaxed text-ink/60'>{c.text}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </Container>
  </section>
)

export default Security
