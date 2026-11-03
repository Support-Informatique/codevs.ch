import { HiArrowRight } from 'react-icons/hi'
import { HiOutlineComputerDesktop, HiOutlineCreditCard, HiOutlineShieldCheck, HiOutlineServerStack } from 'react-icons/hi2'
import { Container, Reveal, SectionHeading } from '@/components/ui'

const services = [
  {
    icon: HiOutlineComputerDesktop,
    title: 'Sites web',
    text: 'Pour une association, un événement ou une entreprise. Vous pouvez ensuite modifier le contenu vous-même.',
    tags: ['Associations', 'Événements', 'PME & artisans', 'Boutiques en ligne'],
    className: 'lg:col-span-3'
  },
  {
    icon: HiOutlineCreditCard,
    title: 'Applications & systèmes de vente',
    text: 'Caisses, bornes, paiements ou outils internes, développés selon votre façon de travailler.',
    tags: ['Caisses & kiosques', 'TWINT & terminaux', 'E-commerce', 'Outils internes'],
    className: 'lg:col-span-3'
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Cybersécurité',
    text: 'Tests d’intrusion et audits de sécurité. On est certifiés OSCP et OSWA.',
    tags: ['Pentest', 'Audit', 'Re-test'],
    href: '#securite',
    className: 'lg:col-span-2'
  },
  {
    icon: HiOutlineServerStack,
    title: 'Hébergement & suivi',
    text: 'On héberge vos sites en Suisse, on fait les mises à jour et on les surveille.',
    tags: ['Infomaniak', 'Mises à jour', 'Monitoring 24/7'],
    href: '#produits',
    className: 'lg:col-span-2'
  },
  {
    icon: null,
    title: 'Pas sûr de ce qu’il vous faut ?',
    text: 'Expliquez-nous ce que vous avez en tête, on regarde ensemble.',
    tags: [],
    href: '#contact',
    className: 'lg:col-span-2'
  }
]

const Services: React.FC = () => (
  <section id='services' className='py-24 sm:py-32'>
    <Container>
      <SectionHeading
        eyebrow='Ce qu’on fait'
        title='Du site d’association au système de caisse.'
        intro='On s’occupe de tout, du design à la mise en ligne, puis de la maintenance.'
      />
      <div className='mt-14 grid gap-4 lg:grid-cols-6'>
        {services.map((s, i) => {
          const highlight = s.icon === null
          const Inner = (
            <>
              {s.icon && (
                <span className='inline-flex size-12 items-center justify-center rounded-2xl bg-sky/50 text-2xl text-primary'>
                  <s.icon />
                </span>
              )}
              <h3 className={`mt-6 text-xl font-bold sm:text-2xl ${highlight ? 'mt-0 text-white' : ''}`}>{s.title}</h3>
              <p className={`mt-3 leading-relaxed ${highlight ? 'text-white/80' : 'text-ink/65'}`}>{s.text}</p>
              {s.tags.length > 0 && (
                <ul className='mt-6 flex flex-wrap gap-2'>
                  {s.tags.map(t => (
                    <li key={t} className='rounded-full bg-background px-3 py-1 text-xs font-medium text-ink/70'>{t}</li>
                  ))}
                </ul>
              )}
              {s.href && (
                <span className={`mt-6 inline-flex items-center gap-1.5 text-sm font-semibold ${highlight ? 'text-sky' : 'text-primary'}`}>
                  {highlight ? 'Prendre contact' : 'En savoir plus'}
                  <HiArrowRight className='transition-transform group-hover:translate-x-1' />
                </span>
              )}
            </>
          )
          return (
            <Reveal key={s.title} delay={i * 0.05} className={s.className}>
              {s.href
                ? (
                <a href={s.href} className={`group flex h-full flex-col rounded-3xl p-8 ring-1 ring-line transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 ${highlight ? 'bg-primary ring-primary' : 'bg-white'}`}>
                  {Inner}
                </a>
                  )
                : (
                <div className='flex h-full flex-col rounded-3xl bg-white p-8 ring-1 ring-line'>{Inner}</div>
                  )}
            </Reveal>
          )
        })}
      </div>
    </Container>
  </section>
)

export default Services
