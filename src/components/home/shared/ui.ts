/** Joins the truthy class names. */
export const cx = (...classes: (string | false | null | undefined)[]) =>
  classes.filter(Boolean).join(' ')

/** The page column: 1200px wide, 24px gutters (16px on phones). */
export const container = 'mx-auto max-w-page px-6 max-[600px]:px-4'

/** Vertical rhythm of a section. */
export const section = 'py-22'

/** The mono uppercase type of labels, without size or colour. */
export const mono = 'font-mono tracking-[.04em] uppercase'

/** Small uppercase label above titles. */
export const monoLabel = `${mono} text-[12px] text-muted`

export const h2 =
  'text-[clamp(34px,4.8vw,58px)] leading-[1.02] font-medium tracking-tighter text-fg'

export const lead =
  'max-w-140 text-[18px] leading-normal text-muted [&_b]:font-medium [&_b]:text-fg'

/** An arrow icon that nudges right when its `group` parent is hovered. */
export const ico =
  'size-3.75 flex-none transition-transform duration-250 ease-brand group-hover:translate-x-0.75'

/** The radius follows the height (about 0.3 of it), so every size has the same shape. */
const BUTTON_SIZES = {
  sm: 'h-8.5 gap-1.5 rounded-[10px] px-3.5 text-[14px]',
  md: 'h-11 gap-2 rounded-[13px] px-5 text-[15px]',
  lg: 'h-13 gap-2.5 rounded-card pr-5.5 pl-6 text-[16px]'
}

/** The solid primary button; add `group` behaviour for an `ico` inside. */
export const button = (size: keyof typeof BUTTON_SIZES = 'md') =>
  cx(
    'group inline-flex items-center justify-center bg-primary font-medium tracking-[-.005em] whitespace-nowrap text-white',
    '[transition:background_.2s,color_.2s,border-color_.2s,scale_.2s_var(--ease-brand),box-shadow_.2s]',
    'hover:bg-primary-hover hover:shadow-[0_0_0_4px_var(--color-cyan-100)] active:scale-[.98]',
    BUTTON_SIZES[size]
  )
