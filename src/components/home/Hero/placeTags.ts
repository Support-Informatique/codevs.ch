import { ART_H, ART_W, MAIN_PEAK, PEAKS, type Peak } from './peaks'

/** How far a label's leader line rises above its summit, in px. */
const LIFT_MAIN = 64
const LIFT_SMALL = 18
const LIFT_NARROW = 34 // every label, on cards narrower than 600 px
const MIN_LIFT = 8
/** A label closer than this to the card's sides is dropped rather than cut. */
const EDGE = 70

interface Tag {
  peak: Peak
  el: HTMLElement
  lift: number
}

const setLift = (tag: Tag) =>
  tag.el.style.setProperty('--lift', `${tag.lift}px`)

const overlap = (a: DOMRect, b: DOMRect) =>
  a.left < b.right + 6 &&
  b.left < a.right + 6 &&
  a.top < b.bottom + 4 &&
  b.top < a.bottom + 4

/**
 * On a card narrower than the drawing's proportions, frame the picture on the main summit
 * instead of letting `slice` crop it blindly around the middle.
 */
const frameArt = (card: HTMLElement, art: SVGSVGElement) => {
  const { width, height } = card.getBoundingClientRect()
  const w = (ART_H * width) / Math.max(height, 1)
  if (w >= ART_W * 0.55) {
    art.setAttribute('viewBox', `0 0 ${ART_W} ${ART_H}`)
    return
  }
  const x = Math.max(0, Math.min(ART_W - w, MAIN_PEAK.x - w / 2))
  art.setAttribute('viewBox', `${x.toFixed(1)} 0 ${w.toFixed(1)} ${ART_H}`)
}

/** A smaller label moves up until it clears the others (at most 8 passes). */
const separate = (tags: Tag[]) => {
  for (let pass = 0; pass < 8; pass++) {
    let moved = false
    const shown = tags.filter(tag => !tag.el.hidden)
    for (let i = 0; i < shown.length; i++) {
      for (let k = i + 1; k < shown.length; k++) {
        const a = shown[i].el.getBoundingClientRect()
        const b = shown[k].el.getBoundingClientRect()
        if (!overlap(a, b)) continue
        const lower = shown[i].peak.main
          ? shown[k]
          : shown[k].peak.main
            ? shown[i]
            : a.top > b.top
              ? shown[i]
              : shown[k]
        const other = lower === shown[i] ? b : a
        lower.lift += lower.el.getBoundingClientRect().bottom - other.top + 6
        setLift(lower)
        moved = true
      }
    }
    if (!moved) return
  }
}

/**
 * Pins each label (`els`, in PEAKS order) above its summit in the card, wherever the drawing
 * currently sits, shortening leader lines that would run out of the card and hiding labels
 * that would be cut by its edges.
 */
export const placeTags = (
  card: HTMLElement,
  art: SVGSVGElement,
  els: readonly HTMLElement[]
) => {
  frameArt(card, art)
  const matrix = art.getScreenCTM()
  if (!matrix) return
  const box = card.getBoundingClientRect()
  const tags: Tag[] = els.map((el, i) => ({ el, peak: PEAKS[i], lift: 0 }))

  // a hidden label measures 0 px high: show them all before measuring
  tags.forEach(({ el }) => {
    el.hidden = false
  })
  tags.forEach(tag => {
    const { el, peak } = tag
    const point = new DOMPoint(peak.x, peak.y).matrixTransform(matrix)
    const x = point.x - box.left
    const y = point.y - box.top
    const wanted =
      box.width < 600 ? LIFT_NARROW : peak.main ? LIFT_MAIN : LIFT_SMALL
    const lift = Math.min(wanted, y - el.offsetHeight - 10)
    el.style.left = `${x}px`
    el.style.top = `${y}px`
    tag.lift = Math.max(MIN_LIFT, lift)
    setLift(tag)
    el.hidden = x < EDGE || x > box.width - EDGE || lift < MIN_LIFT
  })

  separate(tags)

  // a label pushed past the top of a short card is dropped rather than cut
  tags.forEach(({ el }) => {
    if (!el.hidden && el.getBoundingClientRect().top < box.top + 4) {
      el.hidden = true
    }
  })
}
