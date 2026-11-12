import payEventShot from '@/assets/work/pay-event.webp'
import { ArrowUpRight, Pulse } from '../shared/Icons'
import SectionHead from '../shared/SectionHead'
import { container, cx, section } from '../shared/ui'
import ProductCard, { WindowBar, windowFrame } from './ProductCard'
import { PAY_EVENT, WIGUD } from './themes'
import { useStepTicker } from './useStepTicker'
import WigudPanel from './WigudPanel'

const PAY_EVENT_URL = 'https://pay-event.ch'

const PAY_EVENT_STEPS = [
  'Le bénévole tape la commande sur son téléphone',
  'Un QR code TWINT s’affiche',
  'Le client scanne et paie'
]

const WIGUD_STEPS = [
  'Ajouter le site dans Wigud',
  'Installer le plugin sur le site ou le serveur',
  'Surveiller pannes, failles et sauvegardes'
]

/** CODEVS's own products: Pay Event in its own colours, Wigud in the site's. */
const Products = () => {
  // both lists light their steps together, one every 1.5 s
  const tick = useStepTicker(1500)
  const lit = (count: number) => (tick < 0 ? -1 : tick % count)

  return (
    <section className={cx(section, 'bg-tint')} id='produits'>
      <div className={container}>
        <SectionHead
          label='Nos produits'
          title='Nos propres produits.'
          lead={
            <>
              À côté des projets clients, CODEVS développe aussi ses propres
              outils. <b>Nous les utilisons tous les jours.</b>
            </>
          }
        />

        <div className='grid gap-4'>
          <ProductCard
            theme={PAY_EVENT}
            pill='Pay Event'
            tagline='Caisse mobile pour les manifestations'
            title={
              <>
                Encaissez en TWINT
                <br />à vos manifestations.
              </>
            }
            steps={PAY_EVENT_STEPS}
            activeStep={lit(PAY_EVENT_STEPS.length)}
            partner={
              <>
                Partenaire d’intégration officiel de <b>RaiseNow</b> pour les
                dons en ligne.
              </>
            }
            figure='CHF 800’000+'
            figureLabel='déjà encaissés'
            action={
              <a
                className='group inline-flex h-13 items-center gap-2.5 rounded-card border border-(--btn-edge) px-5.5 text-[16px] font-medium text-(--fg) transition-[background,border-color] duration-200 hover:border-(--btn-edge-hover) hover:bg-(--btn-hover)'
                href={PAY_EVENT_URL}
                target='_blank'
                rel='noreferrer'
              >
                Découvrir Pay Event{' '}
                <ArrowUpRight className='size-3.75 transition-transform duration-250 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
              </a>
            }
            shot={
              <a
                className={cx(
                  windowFrame,
                  '[transition:translate_.5s_var(--ease-brand),border-color_.3s] hover:-translate-y-0.75 hover:border-(--frame-edge-hover)'
                )}
                href={PAY_EVENT_URL}
                target='_blank'
                rel='noreferrer'
                aria-label='Ouvrir pay-event.ch'
              >
                <WindowBar title='pay-event.ch' />
                <img
                  src={payEventShot}
                  alt='Le site pay-event.ch'
                  loading='lazy'
                  className='block aspect-16/10 w-full object-cover object-[top_center]'
                />
              </a>
            }
          />

          <ProductCard
            theme={WIGUD}
            pill={
              <>
                <Pulse className='-ml-0.75 size-4.25' />
                Wigud
              </>
            }
            tagline='Notre outil de surveillance'
            title={
              <>
                Vos sites surveillés
                <br />
                en permanence.
              </>
            }
            steps={WIGUD_STEPS}
            activeStep={lit(WIGUD_STEPS.length)}
            partner={
              <>
                <b>Inclus</b> pour les sites que nous hébergeons ou maintenons.
              </>
            }
            figure='24/7'
            figureLabel='surveillance continue'
            shot={<WigudPanel />}
          />
        </div>
      </div>
    </section>
  )
}

export default Products
