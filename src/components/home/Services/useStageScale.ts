import { type RefObject, useLayoutEffect } from 'react'

/** Every scene is drawn on a stage this wide (640 × 400). */
const STAGE_WIDTH = 640

/**
 * Keeps `--k` on the element at its width over the stage's, so `.i-stage` scales to fit.
 * Written straight to the style: it changes on every resize and nothing else depends on it.
 */
export const useStageScale = (ref: RefObject<HTMLElement>) => {
  // A layout effect, so the first paint is already at the right scale.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () =>
      el.style.setProperty('--k', String(el.clientWidth / STAGE_WIDTH))
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    fit()
    return () => observer.disconnect()
  }, [ref])
}
