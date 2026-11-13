import fermeLogo from '@/assets/work/ferme-logo.webp'
import fermeSelf from '@/assets/work/ferme-self.webp'
import lavage from '@/assets/work/lavage-shop.webp'
import SectionHead from '../shared/SectionHead'
import { container, cx, section } from '../shared/ui'
import { CardArt, CardInfo, Photo, card, kindLabel } from './Card'
import { OTHERS, SITES } from './projects'
import SiteCard from './SiteCard'

const FERME_FEATURES = [
  'Borne tactile avec scanner de codes-barres',
  'Paiement par carte, TWINT en secours',
  'Gestion des produits, ventes et rapports'
]

/** Réalisations: one featured project, then a grid of client work. */
const Work = () => (
  <section className={cx(section, 'bg-tint')} id='realisations'>
    <div className={container}>
      <SectionHead
        label='Réalisations'
        title='Quelques réalisations.'
        lead='Quelques-uns des sites et des outils réalisés pour nos clients de la région.'
      />

      <article
        className={cx(card, 'mb-4 flex-row bg-white max-[1000px]:flex-col')}
      >
        <div className='relative min-h-105 flex-[1.25] overflow-hidden border-r border-line max-[1000px]:min-h-90 max-[1000px]:border-r-0 max-[1000px]:border-b max-[600px]:min-h-82.5'>
          <Photo
            src={fermeSelf}
            alt='L’intérieur du self de La Ferme Gourmande, avec les frigos et les étagères de produits'
          />
          <span className='absolute top-4 left-4 z-1 rounded-card-sm bg-white px-3 py-2 shadow-[0_10px_30px_-14px_rgba(4,24,33,.45)]'>
            <img
              src={fermeLogo}
              alt='La Ferme Gourmande'
              className='h-8.5 w-auto'
            />
          </span>
        </div>
        <div className='flex flex-1 flex-col justify-center px-9 pt-9 pb-8.5 max-[600px]:px-5 max-[600px]:py-6.5'>
          <p className={cx(kindLabel, 'text-[12px]')}>
            Caisse en libre-service
          </p>
          <h3 className='mt-3 text-[clamp(22px,2.3vw,30px)] leading-[1.15] font-medium tracking-[-.035em]'>
            La caisse en libre-service des selfs de La Ferme Gourmande
          </h3>
          <p className='mt-3.5 text-[15.5px] text-muted'>
            À Salavaux, Saint-Aubin et Faoug, les clients scannent leurs
            articles à la borne et paient par carte. CODEVS a développé tout le
            système, de la borne à la gestion des ventes.
          </p>
          <ul className='mt-5.5 flex flex-col'>
            {FERME_FEATURES.map(feature => (
              <li
                key={feature}
                className='relative border-t border-dashed border-line-2 py-2.25 pl-6.5 text-[14.5px] before:absolute before:top-3.75 before:left-0.5 before:h-1.5 before:w-2.5 before:-rotate-45 before:border-b-[1.5px] before:border-l-[1.5px] before:border-cyan-600'
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </article>

      <div className='grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1'>
        {SITES.map(site => (
          <SiteCard key={site.url} {...site} />
        ))}

        <div className={cx(card, 'bg-white')}>
          <CardArt>
            <Photo
              src={lavage}
              alt='L’espace d’attente de la laverie du Colisée, avec la borne de paiement'
            />
          </CardArt>
          <CardInfo
            kind='Borne de paiement'
            name='Lavage du Colisée'
            summary='La borne TWINT ou carte qui pilote les machines de la laverie.'
          />
        </div>

        <div className={cx(card, 'bg-surface px-5.5 py-6')}>
          <span className={cx(kindLabel, 'text-[12px]')}>D’autres projets</span>
          <ul className='mt-2.5'>
            {OTHERS.map(({ name, summary, img }) => (
              <li
                key={name}
                className='flex items-center gap-3 border-b border-line py-2.75'
              >
                <img
                  src={img}
                  alt=''
                  loading='lazy'
                  className='aspect-16/10 w-18 flex-none rounded-card-xs border border-line object-cover object-top'
                />
                <div className='flex min-w-0 flex-col'>
                  <b className='text-[15px] font-medium'>{name}</b>
                  <span className='text-[13.5px] leading-[1.45] text-muted'>
                    {summary}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <p className='mt-auto pt-4 text-[13.5px] text-muted'>
            Plus de 50 clients en Suisse romande.{' '}
            <a href='#contact' className='font-medium text-cyan-700'>
              Demandez des exemples →
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
)

export default Work
