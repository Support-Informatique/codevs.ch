/** The drawing's user space: both range SVGs use `0 0 1600 560`. */
export const ART_W = 1600
export const ART_H = 560

/** A summit of the drawing and the skill label that stands on it. */
export interface Peak {
  /** The summit, in the drawing's 1600 × 560 user space. */
  x: number
  y: number
  label: string
  detail: string
  /** The headline skill: the larger label, with a dot, lifted higher above its summit. */
  main?: boolean
}

/**
 * Left to right, in the order the pen reaches them: the labels, the summit shading lines and
 * the snow edges of the drawing are all indexed in this order.
 */
export const PEAKS: readonly Peak[] = [
  { x: 300, y: 200, label: 'Cybersécurité', detail: 'OSCP' }, // Kaiseregg
  { x: 610, y: 300, label: 'Hébergement', detail: 'Infomaniak' }, // La Berra
  { x: 860, y: 160, label: 'Sites web', detail: '50+ clients', main: true }, // Vanil Noir
  { x: 965, y: 255, label: 'Paiements', detail: 'TWINT' }, // Dent de Broc
  { x: 1250, y: 225, label: 'Applications', detail: 'sur mesure' } // Moléson
]

export const MAIN_PEAK = PEAKS.find(peak => peak.main) ?? PEAKS[0]
