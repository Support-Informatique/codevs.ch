import { useCallback, useEffect, useRef } from 'react'

/**
 * Scheduled callbacks that belong to one component: `at(ms, fn)` queues a timeout, `clear()`
 * cancels everything still pending, and everything is cancelled on unmount.
 */
export const useTimers = () => {
  const ids = useRef<number[]>([])
  const clear = useCallback(() => {
    ids.current.forEach(id => window.clearTimeout(id))
    ids.current = []
  }, [])
  const at = useCallback((ms: number, fn: () => void) => {
    ids.current.push(window.setTimeout(fn, ms))
  }, [])
  useEffect(() => clear, [clear])
  return { at, clear }
}
