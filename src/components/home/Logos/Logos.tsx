import { container, cx, monoLabel } from '../shared/ui'

const files = import.meta.glob<string>(
  '../../../assets/images/clients/*.{png,jpg}',
  { eager: true, import: 'default' }
)

/** Client logos, in the order they scroll past. */
const CLIENTS = [
  ['acritec.png', 'Acritec'],
  ['coupe_de_noel.png', 'Coupe de Noël'],
  ['logistock.png', 'Logistock'],
  ['sarigai.png', 'Sarigai'],
  ['stefaco.png', 'Stefaco'],
  ['guerry_sa.png', 'Guerry SA'],
  ['kruug.png', 'Kruug'],
  ['snh.png', 'SNH'],
  ['saint_auvin.png', 'Saint-Auvin'],
  ['jeunesse_st_aubin.png', 'Jeunesse de St-Aubin'],
  ['droguerie_du_portail.png', 'Droguerie du Portail'],
  ['punchyfit.png', 'Punchyfit'],
  ['naturelle.png', 'Naturelle'],
  ['cocktail_aurelien.png', 'Cocktail Aurélien'],
  ['lavage_du_colisee.png', 'Lavage du Colisée'],
  ['ocpv.png', 'OCPV'],
  ['soc.png', 'SOC'],
  ['la_rotisserie.png', 'La Rôtisserie'],
  ['cap_sur_la_confiance.png', 'Cap sur la confiance'],
  ['fcjf.jpg', 'FCJF']
].map(([file, name]) => ({
  name,
  src: files[`../../../assets/images/clients/${file}`]
}))

/**
 * An endless strip of client logos, right under the hero's numbers and wider than them: the
 * summit, the numbers row and the full-bleed strip widen step by step. The list is rendered
 * twice and the track slides by half its width, so the loop has no seam; the copy is hidden
 * from screen readers.
 */
const Logos = () => (
  <section
    aria-label='Ils nous ont fait confiance'
    className='pt-11 pb-4 text-center'
  >
    <p className={cx(container, monoLabel)}>Ils nous ont fait confiance</p>
    <div className='group mt-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]'>
      <div className='flex w-max animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused] max-[600px]:gap-11 max-[600px]:pr-11'>
        {[false, true].map(copy =>
          CLIENTS.map(({ name, src }) => (
            <img
              key={`${name}${copy ? '-copy' : ''}`}
              src={src}
              alt={copy ? '' : name}
              aria-hidden={copy || undefined}
              loading='lazy'
              className={cx(
                'h-12 w-auto max-w-34 object-contain opacity-60 mix-blend-multiply grayscale contrast-[.9] max-[600px]:h-10',
                'transition-[filter,opacity] duration-300 hover:opacity-100 hover:filter-none'
              )}
            />
          ))
        )}
      </div>
    </div>
  </section>
)

export default Logos
