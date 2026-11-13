import { type RefObject, useLayoutEffect } from 'react'
import { placeTags } from './placeTags'

/**
 * Keeps the summit labels on their summits whenever the card changes size (the scroll morph
 * resizes it every frame), then lets them fade in (`.is-ready`).
 */
export const useTagPlacement = (
  card: RefObject<HTMLElement>,
  art: RefObject<SVGSVGElement>,
  tags: RefObject<HTMLElement[]>
) => {
  // layout effect: the labels are placed before the first paint
  useLayoutEffect(() => {
    const cardEl = card.current
    const artEl = art.current
    const tagEls = tags.current
    if (!cardEl || !artEl || !tagEls) return

    const place = () => placeTags(cardEl, artEl, tagEls)
    const observer = new ResizeObserver(place)
    observer.observe(cardEl)
    place()
    const ready = requestAnimationFrame(() => cardEl.classList.add('is-ready'))
    return () => {
      observer.disconnect()
      cancelAnimationFrame(ready)
    }
  }, [card, art, tags])
}
