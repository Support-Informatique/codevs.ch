import { type RefObject, useEffect, useState } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
  /** Stop watching after the first time the element comes into view. */
  once?: boolean
}

/** Whether `ref`'s element is on screen. */
export const useInView = (
  ref: RefObject<Element | null>,
  { threshold = 0, rootMargin, once = false }: Options = {}
) => {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin, once])
  return inView
}
