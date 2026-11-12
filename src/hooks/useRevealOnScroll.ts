import { useEffect } from 'react'

/**
 * Fades in every `<Reveal>` the first time it scrolls into view, by setting its `data-reveal` to `in`
 * (the motion itself is in its classes). One observer for the whole page.
 */
export const useRevealOnScroll = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries =>
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          ;(entry.target as HTMLElement).dataset.reveal = 'in'
          observer.unobserve(entry.target)
        }),
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    document
      .querySelectorAll('[data-reveal]')
      .forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
