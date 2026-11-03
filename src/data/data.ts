// screenshots
import charmey from '@/assets/work/jeunesse-charmey.webp'
import payerne from '@/assets/work/10km-payerne.webp'
import coupeNoel from '@/assets/work/coupe-noel-esta.webp'
import acritec from '@/assets/work/acritec.webp'
import schweizer from '@/assets/work/schweizer-solaire.webp'
import lavage from '@/assets/work/lavage-shop.webp'
import logistock from '@/assets/work/logistock.webp'
import sarigai from '@/assets/work/sarigai.webp'
import capConfiance from '@/assets/work/cap-sur-la-confiance.webp'

// client logos
import logoLogistock from '@/assets/images/clients/logistock.png'
import logoCapSurLaConfiance from '@/assets/images/clients/cap_sur_la_confiance.png'
import logoStefaco from '@/assets/images/clients/stefaco.png'
import logoAcritec from '@/assets/images/clients/acritec.png'
import logoSarigai from '@/assets/images/clients/sarigai.png'
import logoGuerry from '@/assets/images/clients/guerry_sa.png'
import logoKruug from '@/assets/images/clients/kruug.png'
import logoSnh from '@/assets/images/clients/snh.png'
import logoSaintAuvin from '@/assets/images/clients/saint_auvin.png'
import logoJeunesseStAubin from '@/assets/images/clients/jeunesse_st_aubin.png'
import logoDroguerie from '@/assets/images/clients/droguerie_du_portail.png'
import logoPunchyfit from '@/assets/images/clients/punchyfit.png'
import logoNaturelle from '@/assets/images/clients/naturelle.png'
import logoCocktail from '@/assets/images/clients/cocktail_aurelien.png'
import logoLavage from '@/assets/images/clients/lavage_du_colisee.png'
import logoOcpv from '@/assets/images/clients/ocpv.png'
import logoSoc from '@/assets/images/clients/soc.png'
import logoRotisserie from '@/assets/images/clients/la_rotisserie.png'
import logoCoupeNoel from '@/assets/images/clients/coupe_de_noel.png'
import logoFcjf from '@/assets/images/clients/fcjf.jpg'

export interface Project {
  title: string
  client: string
  tag: string
  description: string
  image: string
  url: string
  photo?: boolean
}

export const projects: Project[] = [
  {
    title: 'La Bénichon de Charmey',
    client: 'Société de jeunesse La Concorde',
    tag: 'Association',
    description: 'Programme, charrettes, agenda et galerie de la Bénichon de Charmey.',
    image: charmey,
    url: 'https://jeunessecharmey.ch'
  },
  {
    title: '10KM de Payerne',
    client: 'Centre Athlétique Broyard',
    tag: 'Événement sportif',
    description: 'Le site d’une course de 3’500 coureurs : programme, parcours, inscriptions et résultats.',
    image: payerne,
    url: 'https://10kmpayerne.ch'
  },
  {
    title: 'Schweizer Solaire',
    client: 'Charpente & panneaux solaires',
    tag: 'PME · Boutique en ligne',
    description: 'Site vitrine avec réalisations, boutique en ligne et demandes d’offre.',
    image: schweizer,
    url: 'https://schweizersolaire.ch'
  },
  {
    title: 'Lavage du Colisée',
    client: 'Laverie libre-service à Fribourg',
    tag: 'Borne de paiement',
    description: 'La borne de paiement (TWINT ou carte) qui pilote les machines de la laverie.',
    image: lavage,
    url: 'https://lavageducolisee.ch',
    photo: true
  },
  {
    title: 'Coupe de Noël',
    client: 'Estavayer-le-Lac',
    tag: 'Événement sportif',
    description: 'Inscriptions, résultats, bénévoles et sponsors pour la course de Noël staviacoise.',
    image: coupeNoel,
    url: 'https://coupedenoelesta.ch'
  }
]

export const moreProjects = [
  {
    title: 'Acritec Sàrl',
    description: 'Site d’entreprise pour un spécialiste en électricité et contrôles OIBT.',
    image: acritec,
    url: 'https://acritec.ch'
  },
  {
    title: 'Logistock',
    description: 'Plateforme d’achat et de revente de matériaux de chantier.',
    image: logistock,
    url: 'https://app.logistock.ch'
  },
  {
    title: 'Sarigai',
    description: 'Site multilingue pour une association fribourgeoise.',
    image: sarigai,
    url: 'https://sarigai.ch'
  },
  {
    title: 'Cap sur la confiance',
    description: 'Jeu mobile pour travailler sa confiance en soi.',
    image: capConfiance,
    url: 'https://app.capsurlaconfiance.ch'
  }
]

export const clientLogos = [
  { src: logoAcritec, name: 'Acritec' },
  { src: logoCoupeNoel, name: 'Coupe de Noël Estavayer' },
  { src: logoLogistock, name: 'Logistock' },
  { src: logoSarigai, name: 'Sarigai' },
  { src: logoStefaco, name: 'Stefaco' },
  { src: logoGuerry, name: 'Guerry SA' },
  { src: logoKruug, name: 'Kruug' },
  { src: logoSnh, name: 'SNH' },
  { src: logoSaintAuvin, name: 'Saint-Auvin' },
  { src: logoJeunesseStAubin, name: 'Jeunesse de Saint-Aubin' },
  { src: logoDroguerie, name: 'Droguerie du Portail' },
  { src: logoPunchyfit, name: 'Punchyfit' },
  { src: logoNaturelle, name: 'Naturelle' },
  { src: logoCocktail, name: 'Cocktail Aurélien' },
  { src: logoLavage, name: 'Lavage du Colisée' },
  { src: logoOcpv, name: 'OCPV' },
  { src: logoSoc, name: 'SOC' },
  { src: logoRotisserie, name: 'La Rôtisserie' },
  { src: logoCapSurLaConfiance, name: 'Cap sur la confiance' },
  { src: logoFcjf, name: 'FCJF' }
]
