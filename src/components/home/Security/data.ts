interface Service {
  title: string
  text: string
}

interface Certification {
  /** Shown as a big wordmark. */
  code: string
  name: string
  text: string
}

export const SERVICES: readonly Service[] = [
  {
    title: 'Test d’intrusion web',
    text: 'Sites, applications, API et espaces clients.'
  },
  {
    title: 'Test d’intrusion infrastructure',
    text: 'Serveurs, services exposés et accès à distance.'
  },
  {
    title: 'Audit de sécurité',
    text: 'Un état des lieux clair et des priorités.'
  }
]

export const CERTIFICATIONS: readonly Certification[] = [
  {
    code: 'OSCP',
    name: 'OffSec Certified Professional',
    text: 'Certification pratique en tests d’intrusion de réseaux et de serveurs.'
  },
  {
    code: 'OSWA',
    name: 'OffSec Web Assessor',
    text: 'Certification pratique en sécurité des applications web.'
  }
]
