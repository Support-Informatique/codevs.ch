// images
import bluredBackground from '@/assets/images/hero-background.png'
import darkLogo from '@/assets/images/logo-support-informatique-dark.svg'
import whiteBottomRounded from '@/assets/images/white-bottom-rounded.svg' // images
import projectPreviewSarigai from '@/assets/images/project-preview-sarigai.png'
import projectPreviewCapSurLaConfiance from '@/assets/images/project-preview-cap-sur-la-confiance.png'
import projectPreviewCapSurLaConfianceMobile from '@/assets/images/project-preview-cap-sur-la-confiance-mobile.png'
import projectPreviewLogistock from '@/assets/images/project-preview-logistock.png'
import projectPreviewLavageDuColisee from '@/assets/images/project-preview-lavage-du-colisee.png'
import projectPreviewPayEvent from '@/assets/images/project-preview-pay-event.png'

export const heroImages = [bluredBackground, darkLogo, whiteBottomRounded]

export const projects = [
  {
    title: 'LOGISTOCK',
    description: [
      "Développement d'une plateforme de E-Commerce pour l'entreprise Logistock.",
      "Site d'annonces/achats de matériaux de constructions pour les chantiers en cours."
    ],
    image: projectPreviewLogistock,
    link: 'https://app.logistock.ch'
  },

  {
    title: 'PAY EVENT',
    description: [
      "Point de vente simple et intuitif pour l'organisation d'événements.",
      'Système de génération de QRCode Twint pour faciliter les transactions.'
    ],
    image: projectPreviewPayEvent,
    link: 'https://pay-event.ch/'
  },
  {
    title: 'SARIGAI',
    description: [
      "Refonte complète du site web de l'association Fribourgeoise SARIGAI.",
      'Site vitrine multilingue moderne et coloré qui reflète les valeurs du client.'
    ],
    image: projectPreviewSarigai,
    link: 'https://sarigai.ch'
  },
  {
    title: 'CAP SUR LA CONFIANCE',
    description: [
      "Développement d'un site pour l'entreprise PAHO Formation Sàrl.",
      'Jeu mobile permettant de développer et booster sa confiance en soi.'
    ],
    image: projectPreviewCapSurLaConfiance,
    imageMobile: projectPreviewCapSurLaConfianceMobile,
    link: 'https://app.capsurlaconfiance.ch'
  },
  {
    title: 'LAVAGE DU COLISÉE',
    description: [
      "Développement d'un système de gestion du paiement et de l'utilisation des machines de lavage.",
      'Système hébergé sur place en mode kiosk pour une utilisation autonome.'
    ],
    image: projectPreviewLavageDuColisee,
    link: 'https://lavageducolisee.ch/'
  }
]
