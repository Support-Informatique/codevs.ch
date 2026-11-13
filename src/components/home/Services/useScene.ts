import { type RefObject, useLayoutEffect } from 'react'
import { createScheduler, flag, type Scheduler } from './scheduler'

/**
 * What a scene is doing: nothing (hidden, or not reached yet), playing its animation once, or
 * jumping straight to its last frame (reduced motion, or coming back to the section).
 */
export type SceneMode = 'idle' | 'play' | 'settle'

export interface SceneProps {
  mode: SceneMode
  /** Bumped on every selection, so picking the same service again replays it. */
  run: number
}

/** A scene's two ways to run; both start from a reset of every element they touch. */
export interface Timeline {
  play: () => void
  done: () => void
}

/** The element behind a ref; timelines only run once the scene is mounted. */
export const need = <T>(ref: RefObject<T>): T => {
  if (ref.current === null) throw new Error('Services scene is not mounted')
  return ref.current
}

/**
 * Runs a scene's timeline whenever `mode` or `run` changes, and stops it when they change again
 * or the scene unmounts. React renders the first frame; the timeline then drives `data-*` flags,
 * text and inline styles through refs (React never re-renders those nodes with other props, so the
 * two never fight). `timeline` must be stable (useCallback with no deps).
 */
export const useScene = (
  ill: RefObject<HTMLElement>,
  { mode, run }: SceneProps,
  timeline: (scheduler: Scheduler) => Timeline
) => {
  // A layout effect: the reset has to land before the newly shown panel is first painted.
  useLayoutEffect(() => {
    const el = ill.current
    if (mode === 'idle' || !el) return
    const scheduler = createScheduler()
    const { play, done } = timeline(scheduler)
    if (mode === 'play') {
      play()
    } else {
      // The last frame with transitions off, turned back on two frames later.
      flag(el, 'instant')
      done()
      let frames = 0
      scheduler.every(() => {
        if (++frames < 2) return true
        flag(el, 'instant', false)
        return false
      })
    }
    return () => {
      scheduler.stop()
      flag(el, 'instant', false)
    }
  }, [ill, mode, run, timeline])
}
