import type { ComponentType } from 'react'
import HostScene from './HostScene'
import PentestScene from './PentestScene'
import PosScene from './PosScene'
import type { SceneProps } from './useScene'
import WebScene from './WebScene'

export interface Service {
  title: string
  description: string
  /** A section further down the page that tells more. */
  more?: string
  /** Under the scene: the client or product in bold, then what it shows. */
  caption: { name: string; text: string }
  Scene: ComponentType<SceneProps>
}

export const SERVICES: readonly Service[] = [
  {
    title: 'Sites web',
    // "vous‑même" takes a non-breaking hyphen (U+2011), as in v5.
    description:
      'Pour une association, un événement ou une entreprise. Vous modifiez le contenu vous‑même.',
    caption: {
      name: 'Schweizer Solaire',
      text: 'site vitrine et boutique en ligne'
    },
    Scene: WebScene
  },
  {
    title: 'Applications & caisses',
    description:
      'Caisses, bornes, paiements ou outils internes, faits pour votre façon de travailler.',
    caption: {
      name: 'La Ferme Gourmande',
      text: 'les clients scannent et paient seuls'
    },
    Scene: PosScene
  },
  {
    title: 'Cybersécurité',
    description:
      'Tests d’intrusion et audits de sécurité, par une équipe certifiée OSCP et OSWA.',
    more: '#securite',
    caption: {
      name: 'Tests d’intrusion',
      text: 'par une équipe certifiée OSCP et OSWA'
    },
    Scene: PentestScene
  },
  {
    title: 'Hébergement & suivi',
    description:
      'Vos sites hébergés en Suisse, mis à jour et surveillés en permanence.',
    more: '#produits',
    caption: {
      name: 'Infomaniak',
      text: 'hébergement en Suisse, surveillé en permanence'
    },
    Scene: HostScene
  }
]
