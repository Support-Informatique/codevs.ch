/** A frame job runs once per animation frame for as long as it returns true. */
type FrameJob = (time: number) => boolean

/**
 * Every timeout and frame loop of one run of a scene. A scene run gets a fresh scheduler and
 * stops it when it ends, so nothing from an earlier run can fire into the next one.
 */
export interface Scheduler {
  /** Calls `fn` in `ms` milliseconds. */
  at: (ms: number, fn: () => void) => void
  /** Calls `job` on every animation frame until it returns false. */
  every: (job: FrameJob) => void
  /** Calls `fn` with an eased 0 → 1 progress on every frame for `ms` milliseconds. */
  tween: (ms: number, fn: (progress: number) => void) => void
  /** Cancels everything; later calls are ignored. */
  stop: () => void
}

export const easeOut = (p: number) => 1 - Math.pow(1 - p, 3)
export const easeInOut = (p: number) => 0.5 - Math.cos(Math.PI * p) / 2

export const createScheduler = (): Scheduler => {
  const timeouts = new Set<number>()
  let jobs: FrameJob[] = []
  let raf = 0
  let stopped = false

  const frame = (time: number) => {
    // Swap the list first so a job that schedules another one doesn't lose it.
    const running = jobs
    jobs = []
    running.forEach(job => {
      if (job(time)) jobs.push(job)
    })
    raf = jobs.length && !stopped ? requestAnimationFrame(frame) : 0
  }

  const at = (ms: number, fn: () => void) => {
    if (stopped) return
    const id = window.setTimeout(() => {
      timeouts.delete(id)
      fn()
    }, ms)
    timeouts.add(id)
  }

  const every = (job: FrameJob) => {
    if (stopped) return
    jobs.push(job)
    if (!raf) raf = requestAnimationFrame(frame)
  }

  const tween = (ms: number, fn: (progress: number) => void) => {
    const start = performance.now()
    every(time => {
      const p = Math.min(1, Math.max(0, (time - start) / ms))
      fn(easeOut(p))
      return p < 1
    })
  }

  const stop = () => {
    stopped = true
    timeouts.forEach(id => window.clearTimeout(id))
    timeouts.clear()
    jobs = []
    cancelAnimationFrame(raf)
    raf = 0
  }

  return { at, every, tween, stop }
}

/**
 * Forces a style recalculation (reading a layout value does it), so the next class change
 * transitions from the current state.
 */
export const reflow = (el: HTMLElement) => el.offsetWidth

/**
 * Turns a boolean `data-<name>` attribute on or off. The timelines drive the scenes through these
 * flags, and the elements style them with `data-[name]:` / `group-data-[name]/…:` variants.
 */
export const flag = (el: HTMLElement, name: string, on = true) =>
  el.toggleAttribute(`data-${name}`, on)

/** Replays a one-shot CSS animation that runs while `data-<name>` is set. */
export const restart = (el: HTMLElement, name: string) => {
  flag(el, name, false)
  reflow(el)
  flag(el, name)
}
