import { HiArrowRight } from 'react-icons/hi'
import { Container, Reveal, SectionHeading } from '@/components/ui'

const services = [
  {
    title: 'Sites web',
    text: 'Pour une association, un événement ou une entreprise. Vous pouvez ensuite modifier le contenu vous-même.',
    tags: ['Associations', 'Événements', 'PME & artisans', 'Boutiques en ligne']
  },
  {
    title: 'Applications & systèmes de vente',
    text: 'Caisses, bornes, paiements ou outils internes, développés selon votre façon de travailler.',
    tags: ['Caisses & kiosques', 'TWINT & terminaux', 'E-commerce', 'Outils internes']
  },
  {
    title: 'Cybersécurité',
    text: 'Tests d’intrusion et audits de sécurité. On est certifiés OSCP et OSWA.',
    tags: ['Pentest', 'Audit', 'Re-test'],
    href: '#securite'
  },
  {
    title: 'Hébergement & suivi',
    text: 'On héberge vos sites en Suisse, on fait les mises à jour et on les surveille.',
    tags: ['Infomaniak', 'Mises à jour', 'Monitoring 24/7'],
    href: '#produits'
  }
]

const Services: React.FC = () => (
  <section id='services' className='py-24 sm:py-32'>
    <Container className='grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20'>
      <div>
        <div className='lg:sticky lg:top-32'>
          <SectionHeading
            eyebrow='Ce qu’on fait'
            title='Du site d’association au système de caisse.'
            intro='On s’occupe de tout, du design à la mise en ligne, puis de la maintenance.'
          />
        </div>
      </div>

      <div>
        <ol className='border-b border-ink/10'>
          {services.map((s, i) => {
            const body = (
              <>
                <span className='font-display text-sm font-bold text-secondary'>0{i + 1}</span>
                <div>
                  <h3 className='flex items-center justify-between gap-4 text-2xl font-bold transition-colors group-hover:text-primary sm:text-4xl'>
                    {s.title}
                    {s.href && <HiArrowRight className='shrink-0 text-xl text-ink/25 transition group-hover:translate-x-1 group-hover:text-primary' />}
                  </h3>
                  <p className='mt-3 max-w-xl leading-relaxed text-ink/65'>{s.text}</p>
                  <p className='mt-4 text-sm text-ink/45'>{s.tags.join(' · ')}</p>
                </div>
              </>
            )
            const row = 'group grid grid-cols-[2.5rem_1fr] gap-2 border-t border-ink/10 py-8 sm:grid-cols-[4rem_1fr] sm:py-10'
            return (
              <li key={s.title}>
                <Reveal delay={i * 0.05}>
                  {s.href ? <a href={s.href} className={row}>{body}</a> : <div className={row}>{body}</div>}
                </Reveal>
              </li>
            )
          })}
        </ol>
        <Reveal>
          <p className='mt-8 text-ink/65 sm:pl-16'>
            Pas sûr de ce qu’il vous faut&nbsp;?{' '}
            <a href='#contact' className='inline-flex items-center gap-1 font-semibold text-primary hover:underline'>
              Expliquez-nous votre idée <HiArrowRight />
            </a>
          </p>
        </Reveal>
      </div>
    </Container>
  </section>
)

export default Services
