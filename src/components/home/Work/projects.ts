import tenKm from '@/assets/work/10km-payerne.webp'
import acritec from '@/assets/work/acritec.webp'
import capConfiance from '@/assets/work/cap-sur-la-confiance.webp'
import coupeNoel from '@/assets/work/coupe-noel-esta.webp'
import charmey from '@/assets/work/jeunesse-charmey.webp'
import logistock from '@/assets/work/logistock.webp'
import sarigai from '@/assets/work/sarigai.webp'
import schweizerSolaire from '@/assets/work/schweizer-solaire.webp'

export interface Site {
  url: string
  kind: string
  name: string
  summary: string
  shot: string
  shotAlt: string
}

/** Client websites, each shown as a screenshot in a browser window. */
export const SITES: Site[] = [
  {
    url: 'jeunessecharmey.ch',
    kind: 'Association',
    name: 'La Bénichon de Charmey',
    summary: 'Programme, charrettes, agenda et galerie.',
    shot: charmey,
    shotAlt: 'Page d’accueil du site de la Bénichon de Charmey'
  },
  {
    url: 'schweizersolaire.ch',
    kind: 'PME · Boutique en ligne',
    name: 'Schweizer Solaire',
    summary: 'Site vitrine, boutique en ligne et demandes d’offre.',
    shot: schweizerSolaire,
    shotAlt: 'Page d’accueil du site Schweizer Solaire'
  },
  {
    url: 'coupedenoelesta.ch',
    kind: 'Événement sportif',
    name: 'Coupe de Noël',
    summary: 'Inscriptions, résultats, bénévoles et sponsors.',
    shot: coupeNoel,
    shotAlt: 'Page d’accueil du site de la Coupe de Noël'
  },
  {
    url: '10kmpayerne.ch',
    kind: 'Événement sportif',
    name: '10KM de Payerne',
    summary:
      'Programme, parcours, inscriptions et résultats pour 3’500 coureurs.',
    shot: tenKm,
    shotAlt: 'Page d’accueil du site des 10KM de Payerne'
  }
]

/** Smaller projects, listed in one card. */
export const OTHERS = [
  {
    name: 'Acritec Sàrl',
    summary: 'Électricité et contrôles OIBT.',
    img: acritec
  },
  {
    name: 'Logistock',
    summary: 'Achat et revente de matériaux de chantier.',
    img: logistock
  },
  {
    name: 'Sarigai',
    summary: 'Site multilingue pour une association.',
    img: sarigai
  },
  {
    name: 'Cap sur la confiance',
    summary: 'Jeu mobile sur la confiance en soi.',
    img: capConfiance
  }
]
