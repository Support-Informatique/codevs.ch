import { type RefObject, useCallback, useEffect, useMemo, useRef } from 'react'
import { prefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { type Count, formatCount, KPIS } from './kpis'

const DURATION = 1800
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)
const clamp01 = (v: number) => Math.max(0, Math.min(1, v))

interface Counter extends Count {
  el: HTMLElement
}

export interface HeroCounters {
  /** Starts every figure that has not started yet; cheap enough to call every frame. */
  startAll: () => void
  /** Runs `measure` while every figure shows its final value, then restores the current text. */
  measureFinal: <T>(measure: () => T) => T
}

/**
 * The counting figures of the numbers row (`figures`, indexed like KPIS), each counting up
 * once. While the card morphs, the morph starts them as the card docks; otherwise they start
 * when 60 % visible, like the other counters of the page.
 */
export const useHeroCounters = (
  figures: RefObject<HTMLElement[]>
): HeroCounters => {
  const started = useRef(new Set<HTMLElement>())
  const frames = useRef(new Map<HTMLElement, number>())

  const counters = useCallback((): Counter[] => {
    const els = figures.current ?? []
    return KPIS.flatMap(({ figure }, i) =>
      typeof figure === 'string' ? [] : [{ ...figure, el: els[i] }]
    )
  }, [figures])

  const start = useCallback(({ el, to, grouped }: Counter) => {
    if (started.current.has(el)) return
    started.current.add(el)
    const t0 = performance.now()
    const duration = prefersReducedMotion() ? 0 : DURATION
    const step = (now: number) => {
      const t = duration ? clamp01((now - t0) / duration) : 1
      el.textContent = formatCount(to * easeOutQuart(t), grouped)
      if (t < 1) frames.current.set(el, requestAnimationFrame(step))
      else frames.current.delete(el)
    }
    frames.current.set(el, requestAnimationFrame(step))
  }, [])

  const startAll = useCallback(
    () => counters().forEach(start),
    [counters, start]
  )

  const measureFinal = useCallback(
    <T>(measure: () => T) => {
      const list = counters()
      const current = list.map(({ el }) => el.textContent)
      list.forEach(({ el, to, grouped }) => {
        el.textContent = formatCount(to, grouped)
      })
      const result = measure()
      list.forEach(({ el }, i) => {
        el.textContent = current[i]
      })
      return result
    },
    [counters]
  )

  useEffect(() => {
    const running = frames.current
    const done = started.current
    return () => {
      running.forEach(id => cancelAnimationFrame(id))
      running.clear()
      // a figure stopped mid-count starts over on the next mount instead of staying frozen
      done.clear()
    }
  }, [])

  useEffect(() => {
    // passive effect: runs after the morph's layout effect has set html.morph (or not)
    if (document.documentElement.classList.contains('morph')) return
    const list = counters()
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          observer.unobserve(entry.target)
          const counter = list.find(({ el }) => el === entry.target)
          if (counter) start(counter)
        }),
      { threshold: 0.6 }
    )
    list.forEach(({ el }) => observer.observe(el))
    return () => observer.disconnect()
  }, [counters, start])

  return useMemo(() => ({ startAll, measureFinal }), [startAll, measureFinal])
}
