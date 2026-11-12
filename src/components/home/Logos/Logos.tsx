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
 * An endless strip of client logos. The list is rendered twice and the track slides by half its
 * width, so the loop has no seam; the copy is hidden from screen readers.
 */
const Logos = () => (
  <section className='pt-16 pb-2 text-center'>
    <div className={container}>
      <p className={monoLabel}>Ils nous ont fait confiance</p>
      <div className='group mt-6.5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]'>
        <div className='flex w-max animate-marquee items-center gap-14 group-hover:[animation-play-state:paused]'>
          {[false, true].map(copy =>
            CLIENTS.map(({ name, src }) => (
              <img
                key={`${name}${copy ? '-copy' : ''}`}
                src={src}
                alt={copy ? '' : name}
                aria-hidden={copy || undefined}
                loading='lazy'
                className={cx(
                  'h-10 w-auto max-w-32.5 object-contain opacity-55 grayscale contrast-[.9]',
                  'transition-[filter,opacity] duration-300 hover:opacity-100 hover:filter-none'
                )}
              />
            ))
          )}
        </div>
      </div>
    </div>
  </section>
)

export default Logos
