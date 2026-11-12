import { type RefObject, useLayoutEffect } from 'react'
import { prefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ART_W } from './peaks'
import type { HeroCounters } from './useHeroCounters'

export interface MorphRefs {
  scene: RefObject<HTMLElement>
  pin: RefObject<HTMLElement>
  top: RefObject<HTMLElement>
  slot: RefObject<HTMLElement>
  card: RefObject<HTMLElement>
  kpis: RefObject<HTMLElement>
}

const NAV_H = 64
/** The full-width drawing starts this far down the first screen (or just below the text)… */
const FULL_TOP = 0.6
/** …and runs this much past its bottom: the cut-off base invites scrolling. */
const FULL_SINK = 0.16
/** The highest summit sits 400 of the drawing's 560 units above its base. */
const SUMMIT_RISE = 400
/** The morph is done after this much of a screen of scroll. */
const MORPH_SCROLL = 0.45
/** The numbers count up once the card is this far docked. */
const COUNT_AT = 0.6

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
/** Ease-out: reacts from the very first pixel of scroll. */
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * The scroll morph: at the top of the page the drawing spans the full width, low on the
 * screen; scrolling shrinks it into the card's slot and brings the numbers
 * row in under it. Progress is `--p` on the section (0 = full width, 1 = docked), following
 * the scroll exactly. Phones, short screens and reduced motion get the static card instead
 * (`html.no-morph`), and the figures count up as soon as that switch happens.
 */
export const useHeroMorph = (refs: MorphRefs, counters: HeroCounters) => {
  // layout effect: the card is in place before the first paint
  useLayoutEffect(() => {
    const scene = refs.scene.current
    const pin = refs.pin.current
    const top = refs.top.current
    const slot = refs.slot.current
    const card = refs.card.current
    const kpis = refs.kpis.current
    if (!scene || !pin || !top || !slot || !card || !kpis) return

    const root = document.documentElement
    const reduce = prefersReducedMotion()
    const canMorph = () =>
      !reduce && window.innerWidth > 860 && window.innerHeight > 560

    /* The numbers row follows the card's width while it docks, so its text re-wraps. Its
       height is pinned to its docked height, measured with the final figures, so re-wrapping
       can never change the slot's size and make the card jump. */
    let kpisHeight = 0
    const measureKpis = () => {
      kpis.style.width = ''
      kpis.style.height = ''
      kpisHeight = counters.measureFinal(() => kpis.offsetHeight)
    }

    const apply = (p: number) => {
      if (!kpisHeight) measureKpis()
      kpis.style.height = `${kpisHeight}px`
      // set progress first: the title shrinks with it, which moves the slot; measure after
      scene.style.setProperty('--p', p.toFixed(3))
      const P = pin.getBoundingClientRect()
      const S = slot.getBoundingClientRect()
      const below = top.getBoundingClientRect().bottom - P.top + 16
      const screen = window.innerHeight - NAV_H
      const fullTop = Math.max(screen * FULL_TOP, below)
      // never so short that the highest summit and its label get cropped
      const fullH = Math.max(
        screen - fullTop + screen * FULL_SINK,
        (P.width / ART_W) * SUMMIT_RISE + 100
      )
      const to = {
        left: S.left - P.left,
        top: S.top - P.top,
        width: S.width,
        height: S.height
      }
      const left = lerp(0, to.left, p)
      const y = lerp(fullTop, to.top, p)
      const width = lerp(P.width, to.width, p)
      const height = lerp(fullH, to.height, p)
      card.style.left = `${left}px`
      card.style.top = `${y}px`
      card.style.width = `${width}px`
      card.style.height = `${height}px`
      // the numbers ride under the card at its width, so they never overlap the drawing
      // mid-scroll, with a small rise while they fade in
      const dx = left - to.left
      const dy = y + height - (to.top + to.height) + (1 - p) * 24
      kpis.style.width = `${width}px`
      kpis.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`
      const r = 16 * p
      card.style.borderRadius = `${r}px ${r}px 0 0`
      if (p > COUNT_AT) counters.startAll()
    }

    const stopMorph = () => {
      if (root.classList.contains('morph')) {
        root.classList.remove('morph')
        card.removeAttribute('style')
        kpis.removeAttribute('style')
        scene.style.removeProperty('--p')
        counters.startAll()
      }
      root.classList.add('no-morph')
    }

    let frame = 0
    const tick = () => {
      frame = 0
      if (!canMorph()) {
        stopMorph()
        return
      }
      root.classList.add('morph')
      root.classList.remove('no-morph')
      apply(
        easeOutCubic(
          clamp01(window.scrollY / (window.innerHeight * MORPH_SCROLL))
        )
      )
    }
    const request = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const remeasure = () => {
      kpisHeight = 0
      request()
    }

    let mounted = true
    document.fonts.ready.then(() => {
      if (mounted) remeasure()
    }, reportError)
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', remeasure)
    tick()

    return () => {
      mounted = false
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', remeasure)
      root.classList.remove('morph', 'no-morph')
      card.removeAttribute('style')
      kpis.removeAttribute('style')
      scene.style.removeProperty('--p')
    }
  }, [refs, counters])
}
