import type { ReactNode } from 'react'
import { cx } from '@/components/home/shared/ui'

/** The size of the 16 × 16 icons inside a mock-up. */
export const ICON = 'size-3.25 flex-none'

/** The green of "accepted / up to date / online". */
export const OK_PILL =
  'rounded-full border border-[#cdeee0] bg-[#edf9f4] text-[#1a8f66]'

interface FrameProps {
  className?: string
  children: ReactNode
}

/**
 * A step's mock-up: a small white window over the dotted backdrop. It dims while its cell waits for
 * its turn (`data-wait` on the `group/cell` around it).
 */
export const Frame = ({ className, children }: FrameProps) => (
  <div
    className={cx(
      'relative z-1 flex h-47 w-[84%] flex-col overflow-hidden rounded-card-sm border border-line-2 bg-white text-[12.5px] shadow-[0_10px_30px_-18px_rgba(10,48,68,.35)]',
      '[transition:opacity_.4s_var(--ease-quart)] group-data-wait/cell:opacity-45',
      className
    )}
  >
    {children}
  </div>
)

/** The window's title bar: a file name on the left, `children` on the right. */
export const Bar = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => (
  <div className='flex items-center justify-between border-b border-line px-2.5 py-1.75 font-mono text-[11px] text-muted'>
    <span>{title}</span>
    {children}
  </div>
)

export const Chip = ({ children }: { children: ReactNode }) => (
  <span className='rounded-card border border-cyan-100 bg-cyan-50 px-2 py-px text-cyan-700'>
    {children}
  </span>
)

/** The window's content under the bar; `tight` trims its padding (the offer needs the room). */
export const Body = ({
  tight = false,
  children
}: {
  tight?: boolean
  children: ReactNode
}) => (
  <div
    className={cx(
      'flex min-h-0 flex-1 flex-col gap-1.5 px-3',
      tight ? 'pt-2 pb-2.5' : 'pt-2.5 pb-3'
    )}
  >
    {children}
  </div>
)
