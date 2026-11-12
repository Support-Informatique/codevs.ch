import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * A counter that goes up every `ms`, starting at -1 (nothing lit yet). Each step list lights
 * `tick % its length`, so lists of any length stay in step with each other.
 */
export const useStepTicker = (ms: number) => {
  const reduce = usePrefersReducedMotion()
  const [tick, setTick] = useState(-1)
  useEffect(() => {
    if (reduce) return setTick(-1)
    const id = window.setInterval(() => setTick(t => t + 1), ms)
    return () => window.clearInterval(id)
  }, [ms, reduce])
  return tick
}
