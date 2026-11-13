/** A figure that counts up from 0 to `to`. */
export interface Count {
  to: number
  /** Group thousands with a Swiss apostrophe: 800’000. */
  grouped?: boolean
  before?: string
  after: string
}

export interface Kpi {
  figure: string | Count
  caption: string
}

/** The numbers row under the card. */
export const KPIS: readonly Kpi[] = [
  { figure: { to: 50, after: '+' }, caption: 'clients en Suisse romande' },
  {
    figure: { before: 'CHF ', to: 800_000, grouped: true, after: '+' },
    caption: 'encaissés avec Pay Event'
  },
  { figure: 'OSCP · OSWA', caption: 'certifiés en sécurité offensive' },
  { figure: 'RaiseNow', caption: 'partenaire d’intégration des dons en ligne' }
]

export const formatCount = (value: number, grouped = false) => {
  const digits = Math.round(value).toString()
  return grouped ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '’') : digits
}
