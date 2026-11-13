import { cx } from '@/components/home/shared/ui'

/**
 * The card every scene sits in: 16:10, a dotted grid fading out downwards behind the stage.
 * While `data-instant` is set (useScene jumping to a last frame), nothing inside transitions.
 */
export const panel = cx(
  'relative isolate aspect-16/10 overflow-hidden rounded-[14px] bg-[#f6fafb] text-[13px] leading-[1.4] shadow-[0_0_0_1px_rgba(10,48,68,.08)]',
  'before:absolute before:inset-0 before:-z-1 before:bg-[radial-gradient(circle_at_1px_1px,#cbdde4_1px,transparent_0)] before:bg-size-[16px_16px] before:[mask:linear-gradient(#000_40%,transparent_92%)]',
  '[&[data-instant]_*]:transition-none! [&[data-instant]_*]:before:transition-none! [&[data-instant]_*]:after:transition-none!'
)

/** The fixed 640 × 400 drawing area, scaled to the panel by `--k` (see useStageScale). */
export const stage =
  'absolute top-0 left-0 h-100 w-160 origin-top-left scale-(--k)'

/** The backdrop SVG of a stage, same size. */
export const stageSvg = 'absolute top-0 left-0 h-100 w-160 overflow-visible'

/** Small uppercase caption inside a scene. */
export const cap =
  'font-mono text-[10.5px] tracking-[.06em] text-muted uppercase'
