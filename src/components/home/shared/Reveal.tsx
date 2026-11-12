import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType
} from 'react'
import { cx } from './ui'

type Props<T extends ElementType> = {
  as?: T
  className?: string
  style?: CSSProperties
  /** Delay before it fades in, e.g. `.1s`. */
  delay?: string
} & Omit<ComponentPropsWithoutRef<T>, 'className' | 'style'>

const HIDDEN =
  'translate-y-3.5 opacity-0 transition-[opacity,translate] delay-(--d) duration-900 ease-brand data-[reveal=in]:translate-y-0 data-[reveal=in]:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100'

/**
 * Renders `as` (a div by default) hidden, and lets `useRevealOnScroll` fade it in the first time it
 * scrolls into view.
 */
const Reveal = <T extends ElementType = 'div'>({
  as,
  delay,
  className,
  style,
  ...props
}: Props<T>) => {
  const Tag: ElementType = as ?? 'div'
  return (
    <Tag
      data-reveal=''
      className={cx(HIDDEN, className)}
      style={delay ? { ...style, '--d': delay } : style}
      {...props}
    />
  )
}

export default Reveal
