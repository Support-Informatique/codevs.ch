import type { ComponentType } from 'react'
import { AccountIcon, HomeIcon, PhoneIcon } from './icons'

export type StepId = 'meet' | 'offer' | 'code' | 'ship'

/** The four steps, in the order they play; the rail number is the position. */
export const STEPS: readonly { id: StepId; title: string; text: string }[] = [
  {
    id: 'meet',
    title: 'Premier rendez-vous',
    text: 'Un café ou un appel, gratuit.'
  },
  {
    id: 'offer',
    title: 'Offre',
    text: 'Notre proposition, le délai et le prix.'
  },
  {
    id: 'code',
    title: 'Développement',
    text: 'Nous vous montrons régulièrement l’avancement.'
  },
  {
    id: 'ship',
    title: 'Mise en ligne',
    text: 'Nous publions et assurons la maintenance.'
  }
]

/* 2 · offer: what the quote includes, then its total */
export const OFFER_ITEMS: readonly { label: string; Icon: ComponentType }[] = [
  { label: 'Page d’accueil', Icon: HomeIcon },
  { label: 'Compte client', Icon: AccountIcon },
  { label: 'Paiement TWINT', Icon: PhoneIcon }
]
/** Lines that pop in one by one: the items plus the total. */
export const OFFER_LINES = OFFER_ITEMS.length + 1

/* 3 · development: the code as highlighted tokens, so it is coloured while it types */
/** keyword, function / component, string, punctuation */
export type TokenKind = 'k' | 'f' | 's' | 't'
export const CODE_TOKENS: readonly (readonly [string, TokenKind])[] = [
  ['export function ', 'k'],
  ['Caisse', 'f'],
  ['() {\n', 't'],
  ['  return ', 'k'],
  ['(\n', 't'],
  ['    <', 't'],
  ['Twint', 'f'],
  [' montant=', 't'],
  ['{12}', 's'],
  [' />\n', 't'],
  ['  );\n', 't'],
  ['}', 't']
]
export const CODE_LENGTH = CODE_TOKENS.reduce((n, [text]) => n + text.length, 0)

/* 4 · going live: each check ticks off and moves the progress bar to `progress` % */
export const SHIP_LOG: readonly { label: string; progress: number }[] = [
  { label: 'Build', progress: 30 },
  { label: 'Tests', progress: 62 },
  { label: 'Mise en ligne', progress: 100 }
]
