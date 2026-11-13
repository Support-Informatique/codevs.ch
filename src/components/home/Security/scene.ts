/*
 * The breach illustration, read left to right on one level line through the middle of the
 * mountain: a request (label above the line) -> the mountain "votre-site.ch" -> the other side.
 * Shared by the static SVG (Breach.tsx) and the animation (breachStory.ts). viewBox 560 x 340.
 */

export type Point = readonly [x: number, y: number]

export interface Query {
  method: string
  path: string
}

export interface Attempt extends Query {
  /** The one request that finds the flaw; the others are refused. */
  through?: boolean
}

export const ATTEMPTS: readonly Attempt[] = [
  { method: 'POST', path: '/me/become-admin' },
  { method: 'ssh', path: 'admin@votre-site.ch' },
  { method: 'GET', path: '/admin/recover', through: true }
]

/** Geist Mono advance at 11.5px, the fallback width before the font can be measured. */
export const CHAR = 6.9

export const PEAK: Point = [300, 72]
/** The level line every arrow flies along. */
export const Y = 212
/** Where the arrow starts, and where it comes out on the right. */
export const X0 = 22
export const EXIT_X = 532

/** Three straight cuts through the mountain, entering and leaving on the level line. */
export const CRACK: readonly Point[] = [
  [232, Y],
  [281, Y + 11],
  [322, Y - 7],
  [368, Y]
]
/** Where the torn-off summit comes to rest. */
export const LIFT = { dx: 3, dy: -8, deg: -1.2 }

/** Snow and dark rock, so the chips read on both faces of the mountain. */
export const ROCK = [
  '#ffffff',
  '#dcf0f6',
  '#9fd8e8',
  '#0f4a66',
  '#0a3044',
  '#ffffff'
] as const

const pts = (points: readonly Point[]) =>
  points.map(p => p.join(' ')).join(' L')

const CRACK_D = `M${pts(CRACK)}`
/** The crack, then straight on to the exit: the path the breaching arrow follows. */
export const TRACE_D = `${CRACK_D} L${EXIT_X} ${Y}`
export const WIRE_D = `M${X0} ${Y} H${CRACK[0][0]}`

/* the mountain is drawn twice, clipped above and below the crack, so the summit can tear loose */
export const TOP_CLIP = `M-10 -10 L570 -10 L570 ${Y} L${pts([...CRACK].reverse())} L-10 ${Y} Z`
export const BOTTOM_CLIP = `M-10 ${Y} L${pts(CRACK)} L570 ${Y} L570 350 L-10 350 Z`

export const FROM_PEAK = `M${pts([PEAK])}`
/* the left side is not a plain triangle: a steep top, then a shoulder that spreads into a wider base */
const LEFT = 'L258 156 L232 212 L198 258 L152 296 L104 340'
/* the right side, top to bottom: a small step under the snow, the exit point on the line, then a ledge */
const RIGHT: readonly Point[] = [
  [326, 118],
  [344, 150],
  [368, 212],
  [392, 248],
  [420, 262],
  [448, 300],
  [478, 340]
]
const SPINE = 'L292 340 L300 214 L295 150 Z'
export const LIT_FACE = `${FROM_PEAK} ${LEFT} ${SPINE}`
export const SHADE_FACE = `${FROM_PEAK} L${pts(RIGHT)} ${SPINE}`
