import type { CSSProperties } from 'react'

/**
 * Each product card is drawn from the same classes; these custom properties give it its colours.
 * Pay Event keeps its own brand (night + lime), Wigud uses the site's light cyan theme.
 */
export type ProductTheme = CSSProperties

export const PAY_EVENT: ProductTheme = {
  '--bg':
    'radial-gradient(60% 75% at 82% 85%, rgba(150, 214, 45, .16), transparent 70%), radial-gradient(40% 50% at 0% 0%, rgba(255, 255, 255, .04), transparent 70%), #0c0e0b',
  '--edge': '#1c2119',
  '--fg': '#fff',
  '--soft': 'rgba(255, 255, 255, .88)',
  '--muted-c': 'rgba(255, 255, 255, .6)',
  '--accent': '#c6f35a',
  '--accent-ink': '#1d2a05',
  '--step-ink': '#c6f35a',
  '--chip': 'rgba(198, 243, 90, .1)',
  '--chip-edge': 'rgba(198, 243, 90, .18)',
  '--btn-edge': 'rgba(255, 255, 255, .22)',
  '--btn-edge-hover': 'rgba(255, 255, 255, .4)',
  '--btn-hover': 'rgba(255, 255, 255, .06)',
  '--frame': '#0a0a0a',
  '--frame-edge': '#262c22',
  '--frame-edge-hover': '#37402f',
  '--bar': '#171a15',
  '--bar-pill': 'rgba(255, 255, 255, .07)',
  '--bar-text': 'rgba(255, 255, 255, .6)',
  '--shadow': '0 30px 60px -30px rgba(0, 0, 0, .7)'
}

/** White, so it stands out on the light blue section. */
export const WIGUD: ProductTheme = {
  '--bg':
    'radial-gradient(60% 75% at 82% 85%, rgba(132, 210, 229, .18), transparent 70%), #fff',
  '--edge': 'var(--color-line)',
  '--fg': 'var(--color-fg)',
  '--soft': 'var(--color-fg)',
  '--muted-c': 'var(--color-muted)',
  '--accent': 'var(--color-primary)',
  '--accent-ink': '#fff',
  '--step-ink': 'var(--color-cyan-700)',
  '--chip': 'var(--color-cyan-100)',
  '--chip-edge': 'rgba(31, 145, 182, .18)',
  '--btn-edge': 'var(--color-line-2)',
  '--btn-edge-hover': 'var(--color-cyan-500)',
  '--btn-hover': '#fff',
  '--frame': '#fff',
  '--frame-edge': 'var(--color-line)',
  '--frame-edge-hover': 'var(--color-line-2)',
  '--bar': 'var(--color-surface)',
  '--bar-pill': '#fff',
  '--bar-text': 'var(--color-muted)',
  '--shadow': '0 30px 60px -34px rgba(10, 48, 68, .28)'
}
