import { HiArrowUpRight, HiCheck } from 'react-icons/hi2'
import fermeSelf from '@/assets/work/ferme-self.webp'
import fermeLogo from '@/assets/work/ferme-logo.webp'
import { moreProjects, projects, type Project } from '@/data/data'
import { BrowserFrame, Container, Reveal, SectionHeading } from '@/components/ui'

const fermePoints = [
  'Borne tactile avec scanner de codes-barres',
  'Paiement par carte sur terminal, TWINT en secours',
  'Reprise automatique si un paiement échoue',
  'Gestion des produits, ventes et rapports'
]

const ProjectItem: React.FC<{ p: Project }> = ({ p }) => (
  <Reveal>
    <a href={p.url} target='_blank' rel='noreferrer' className='group block'>
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
      <div className='mt-6 flex items-start justify-between gap-4'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-wider text-secondary'>{p.tag}</p>
          <h3 className='mt-2 text-xl font-bold transition-colors group-hover:text-primary sm:text-2xl'>{p.title}</h3>
          <p className='mt-2 max-w-md leading-relaxed text-ink/65'>{p.description}</p>
        </div>
        <HiArrowUpRight className='mt-7 shrink-0 text-xl text-ink/30 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary' />
      </div>
    </a>
  </Reveal>
)

const Work: React.FC = () => (
  <section id='realisations' className='py-24 sm:py-32'>
    <Container>
      <SectionHeading
        eyebrow='Réalisations'
        title='Quelques réalisations'
        intro='Des sites et des outils réalisés pour des clients de la région.'
      />

      <Reveal className='mt-14'>
        <img
          src={fermeSelf}
          alt='Le self-service de La Ferme Gourmande à Salavaux'
          loading='lazy'
          className='aspect-[16/10] w-full rounded-[1.5rem] object-cover sm:aspect-[21/9] sm:rounded-[2rem]'
        />
      </Reveal>
      <div className='mt-10 grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-20'>
        <Reveal>
          <img src={fermeLogo} alt='La Ferme Gourmande' className='h-11 w-auto' />
          <h3 className='mt-6 text-2xl font-bold sm:text-4xl'>
            La caisse en libre-service des selfs de La Ferme Gourmande
          </h3>
        </Reveal>
        <Reveal delay={0.1} className='lg:pt-16'>
          <p className='leading-relaxed text-ink/70'>
            À Salavaux, Saint-Aubin et Faoug, les clients scannent leurs articles à la borne et paient
            par carte sur le terminal. CODEVS a développé tout le système, de la borne à la gestion des ventes.
          </p>
          <ul className='mt-6 space-y-3'>
            {fermePoints.map(p => (
              <li key={p} className='flex gap-3 text-ink/80'>
                <HiCheck className='mt-0.5 shrink-0 text-lg text-[#4f8a3c]' />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className='mt-24 grid gap-16 sm:mt-32 md:grid-cols-2 md:gap-x-12'>
        <div className='space-y-16 md:space-y-24'>
          {projects.filter((_, i) => i % 2 === 0).map(p => <ProjectItem key={p.url} p={p} />)}
        </div>
        <div className='space-y-16 md:space-y-24 md:pt-40'>
          {projects.filter((_, i) => i % 2 === 1).map(p => <ProjectItem key={p.url} p={p} />)}
        </div>
      </div>

      <Reveal className='mt-24 sm:mt-32'>
        <div className='flex flex-wrap items-end justify-between gap-x-8 gap-y-2'>
          <h3 className='text-2xl font-bold sm:text-3xl'>D’autres projets</h3>
          <p className='text-ink/55'>Une petite sélection parmi plus de 20&nbsp;clients.</p>
        </div>
        <ul className='-mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0'>
          {moreProjects.map(p => (
            <li key={p.url} className='w-[75%] shrink-0 snap-start sm:w-[42%] lg:w-auto'>
              <a href={p.url} target='_blank' rel='noreferrer' className='group block'>
                <img
                  src={p.image}
                  alt={`Aperçu de ${p.title}`}
                  loading='lazy'
                  className='aspect-[16/10] w-full rounded-xl object-cover object-top shadow-xl shadow-ink/15 ring-1 ring-ink/10 transition duration-500 group-hover:-translate-y-1'
                />
                <p className='mt-4 flex items-center justify-between gap-2 font-semibold transition-colors group-hover:text-primary'>
                  {p.title}
                  <HiArrowUpRight className='shrink-0 text-ink/30 transition group-hover:text-primary' />
                </p>
                <p className='mt-1 text-sm leading-relaxed text-ink/60'>{p.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Container>
  </section>
)

export default Work
