import { useLayoutEffect, useRef } from 'react'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTimers } from '@/hooks/useTimers'
import { createBreach, type Breach } from './breachStory'

/**
 * Drives the breach story on the returned SVG: it plays only while on screen, resets when it
 * leaves, and shows the outcome straight away with reduced motion.
 */
export const useBreach = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const breachRef = useRef<Breach | null>(null)
  const reduce = usePrefersReducedMotion()
  const inView = useInView(svgRef, { threshold: 0.35 })
  const { at, clear } = useTimers()

  // Layout effects so the pills are sized and the first frame is set before the first paint.
  useLayoutEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const breach = createBreach(svg, { at, clear })
    breachRef.current = breach
    breach.layout()
    let mounted = true
    // The pills are measured from the text, so measure again with the web font.
    document.fonts.ready.then(() => {
      if (mounted) breach.layout()
    }, reportError)
    return () => {
      mounted = false
      breach.stop()
      breachRef.current = null
    }
  }, [at, clear])

  useLayoutEffect(() => {
    const breach = breachRef.current
    if (!breach) return
    if (reduce) breach.showResult()
    else if (inView) breach.play()
    else breach.idle()
    return breach.stop
  }, [inView, reduce])

  return svgRef
}
