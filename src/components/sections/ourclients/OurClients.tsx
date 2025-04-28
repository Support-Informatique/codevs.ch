// components
import LogoGrid from '@/components/sections/ourclients/LogoGrid'

// images
import logistock from '@/assets/images/clients/logistock.png'
import capSurLaConfiance from '@/assets/images/clients/cap_sur_la_confiance.png'
import stefaco from '@/assets/images/clients/stefaco.png'
import acritec from '@/assets/images/clients/acritec.png'
import sarigai from '@/assets/images/clients/sarigai.png'
import guerrySarl from '@/assets/images/clients/guerry_sa.png'
import kruug from '@/assets/images/clients/kruug.png'
import snh from '@/assets/images/clients/snh.png'
import saintAuvin from '@/assets/images/clients/saint_auvin.png'
import jeunesseStAubin from '@/assets/images/clients/jeunesse_st_aubin.png'
import droguerieDuPortail from '@/assets/images/clients/droguerie_du_portail.png'
import punchyfit from '@/assets/images/clients/punchyfit.png'
import naturelle from '@/assets/images/clients/naturelle.png'
import cocktailAurelien from '@/assets/images/clients/cocktail_aurelien.png'
import lavageDuColisee from '@/assets/images/clients/lavage_du_colisee.png'
import ocpv from '@/assets/images/clients/ocpv.png'
import soc from '@/assets/images/clients/soc.png'
import laRotisserie from '@/assets/images/clients/la_rotisserie.png'
import coupeDeNoel from '@/assets/images/clients/coupe_de_noel.png'
import fcjf from '@/assets/images/clients/fcjf.jpg'

const logos = [
  logistock,
  capSurLaConfiance,
  stefaco,
  acritec,
  sarigai,
  guerrySarl,
  kruug,
  snh,
  saintAuvin,
  jeunesseStAubin,
  droguerieDuPortail,
  punchyfit,
  naturelle,
  cocktailAurelien,
  lavageDuColisee,
  ocpv,
  soc,
  laRotisserie,
  coupeDeNoel,
  fcjf
]

const OurClients: React.FC = () => {
  return (
    <div className='our-clients'>
      <LogoGrid logos={logos} />
    </div>
  )
}
export default OurClients
