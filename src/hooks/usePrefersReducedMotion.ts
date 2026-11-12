import { useEffect, useState } from 'react'

const QUERY = '(prefers-reduced-motion: reduce)'

/** True when the visitor asked the system for less motion; follows changes live. */
export const usePrefersReducedMotion = () => {
  const [reduce, setReduce] = useState(() => window.matchMedia(QUERY).matches)
  useEffect(() => {
    const media = window.matchMedia(QUERY)
    const onChange = () => setReduce(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])
  return reduce
}

/** One-off read, for code that runs outside React state (animation loops). */
export const prefersReducedMotion = () => window.matchMedia(QUERY).matches
