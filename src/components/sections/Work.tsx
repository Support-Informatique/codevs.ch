import { HiArrowUpRight, HiCheck } from 'react-icons/hi2'
import fermeSelf from '@/assets/work/ferme-self.webp'
import fermeLogo from '@/assets/work/ferme-logo.webp'
import { moreProjects, projects } from '@/data/data'
import { BrowserFrame, Container, Eyebrow, Reveal, SectionHeading } from '@/components/ui'

const fermePoints = [
  'Borne tactile avec scanner de codes-barres',
  'Paiement par carte sur terminal, TWINT en secours',
  'Reprise automatique si un paiement échoue',
  'Gestion des produits, ventes et rapports'
]

const Work: React.FC = () => (
  <section id='realisations' className='py-24 sm:py-32'>
    <Container>
      <SectionHeading
        eyebrow='Réalisations'
        title='Quelques réalisations'
        intro='Des sites et des outils qu’on a faits pour des clients de la région.'
      />

      <Reveal className='mt-14'>
        <article className='overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#fbf5ea] to-[#eaf4ea] ring-1 ring-[#e9e1d2]'>
          <div className='relative'>
            <img
              src={fermeSelf}
              alt='Le self-service de La Ferme Gourmande à Salavaux'
              loading='lazy'
              className='aspect-[16/9] w-full object-cover sm:aspect-[21/8]'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-[#fbf5ea] via-transparent to-transparent' />
          </div>
          <div className='grid gap-10 p-8 pt-4 sm:p-12 sm:pt-6 lg:grid-cols-2'>
            <div>
              <img src={fermeLogo} alt='La Ferme Gourmande' className='h-12 w-auto' />
              <div className='mt-6'>
                <Eyebrow>Système de vente sur mesure</Eyebrow>
              </div>
              <h3 className='mt-4 text-2xl font-bold sm:text-4xl'>
                La caisse en libre-service des selfs de La Ferme Gourmande
              </h3>
              <p className='mt-5 leading-relaxed text-ink/70'>
                À Salavaux, Saint-Aubin et Faoug, les clients scannent leurs articles à la borne et paient
                par carte sur le terminal. On a développé tout le système, de la borne à la gestion des ventes.
              </p>
            </div>
            <ul className='space-y-4 self-end lg:pb-2'>
              {fermePoints.map(p => (
                <li key={p} className='flex gap-3 text-ink/80'>
                  <HiCheck className='mt-0.5 shrink-0 text-lg text-[#4f8a3c]' />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </Reveal>

      <div className='mt-6 grid gap-6 md:grid-cols-2'>
        {projects.map((p, i) => (
          <Reveal key={p.url} delay={(i % 2) * 0.08} className={i === 0 ? 'md:col-span-2' : ''}>
            <a
              href={p.url}
              target='_blank'
              rel='noreferrer'
              className={`group grid h-full gap-8 rounded-[2rem] bg-white p-5 ring-1 ring-line transition hover:ring-secondary/50 sm:p-8 ${
                i === 0 ? 'lg:grid-cols-[1.4fr_1fr] lg:items-center' : ''
              }`}
            >
              {p.photo
                ? (
                <img
                  src={p.image}
                  alt={p.title}
                  loading='lazy'
                  className='aspect-[16/11.1] w-full rounded-xl object-cover shadow-2xl shadow-ink/20 transition duration-500 group-hover:-translate-y-1'
                />
                  )
                : (
                <BrowserFrame
                  src={p.image}
                  url={p.url}
                  alt={`Page d’accueil de ${p.title}`}
                  className='transition duration-500 group-hover:-translate-y-1 group-hover:shadow-ink/25'
                />
                  )}
              <div className='px-1'>
                <p className='text-xs font-semibold uppercase tracking-wider text-secondary'>{p.tag}</p>
                <h3 className='mt-2 text-xl font-bold sm:text-2xl'>{p.title}</h3>
                <p className='mt-1 text-sm text-ink/50'>{p.client}</p>
                <p className='mt-4 leading-relaxed text-ink/70'>{p.description}</p>
                <span className='mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary'>
                  Voir le site <HiArrowUpRight className='transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal className='mt-16'>
        <h3 className='text-lg font-bold'>Et aussi</h3>
        <div className='mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {moreProjects.map(p => (
            <a
              key={p.url}
              href={p.url}
              target='_blank'
              rel='noreferrer'
              className='group overflow-hidden rounded-2xl bg-white ring-1 ring-line transition hover:ring-secondary/50'
            >
              <img src={p.image} alt='' loading='lazy' className='aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]' />
              <div className='p-4'>
                <p className='flex items-center justify-between font-semibold'>
                  {p.title} <HiArrowUpRight className='text-ink/40 group-hover:text-primary' />
                </p>
                <p className='mt-1 text-sm text-ink/60'>{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      </Reveal>
    </Container>
  </section>
)

export default Work
