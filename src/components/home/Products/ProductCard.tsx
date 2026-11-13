import type { ReactNode } from 'react'
import Reveal from '../shared/Reveal'
import { cx } from '../shared/ui'
import type { ProductTheme } from './themes'

interface Props {
  theme: ProductTheme
  pill: ReactNode
  tagline: string
  title: ReactNode
  steps: string[]
  partner: ReactNode
  figure: string
  figureLabel: string
  action?: ReactNode
  /** The window on the right: a screenshot or a live panel. */
  shot: ReactNode
}

/** One product: its pitch and three numbered steps on the left, a window on the right. */
const ProductCard = ({
  theme,
  pill,
  tagline,
  title,
  steps,
  partner,
  figure,
  figureLabel,
  action,
  shot
}: Props) => (
  <Reveal
    as='article'
    style={theme}
    className='grid grid-cols-[1fr_1.2fr] items-center gap-[clamp(32px,5vw,64px)] rounded-card border border-(--edge) p-[clamp(28px,4.4vw,60px)] text-(--fg) [background:var(--bg)] max-[960px]:grid-cols-1'
  >
    <div>
      <p className='flex flex-wrap items-center gap-3 text-[15px] text-(--muted-c)'>
        <span className='inline-flex h-8 items-center gap-2 rounded-full bg-(--accent) px-3.5 text-[15px] font-semibold tracking-[-.01em] text-(--accent-ink)'>
          {pill}
        </span>
        {tagline}
      </p>
      <h3 className='mt-5.5 mb-6.5 text-[clamp(30px,3.4vw,46px)] leading-[1.04] font-bold tracking-tighter'>
        {title}
      </h3>
      <ol>
        {steps.map((step, i) => (
          <li
            key={step}
            className='flex items-center gap-4 py-2.25 text-[17px] text-(--soft) max-[600px]:text-[15.5px]'
          >
            <span className='grid size-8.5 flex-none place-items-center rounded-full bg-(--chip) font-mono text-[13px] font-semibold text-(--step-ink) shadow-[inset_0_0_0_1px_var(--chip-edge)]'>
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <p className='mt-5.5 text-[15px] text-(--muted-c) [&_b]:font-semibold [&_b]:text-(--fg) [&_b]:underline [&_b]:decoration-(--accent) [&_b]:decoration-[1.5px] [&_b]:underline-offset-4'>
        {partner}
      </p>
      <div className='mt-9 flex flex-wrap items-center justify-between gap-x-7 gap-y-5'>
        <div>
          <b className='block text-[clamp(30px,3vw,40px)] leading-none font-bold tracking-[-.045em] text-(--accent)'>
            {figure}
          </b>
          <span className='mt-1.5 block text-[15px] text-(--muted-c)'>
            {figureLabel}
          </span>
        </div>
        {action}
      </div>
    </div>
    {shot}
  </Reveal>
)

/** The frame of a product window. */
export const windowFrame =
  'block overflow-hidden rounded-xl border border-(--frame-edge) bg-(--frame) shadow-(--shadow)'

/** The title bar of a product window: three dots and the page's name. */
export const WindowBar = ({
  title,
  light = false,
  children
}: {
  title: string
  /** The light theme draws a line under the bar and around the name. */
  light?: boolean
  children?: ReactNode
}) => (
  <span
    className={cx(
      'flex h-10 items-center gap-1.75 bg-(--bar) px-3.5',
      light && 'shadow-[inset_0_-1px_0_var(--color-line)]'
    )}
    aria-hidden='true'
  >
    <i className='size-2.5 rounded-full bg-[#ff5f57]' />
    <i className='size-2.5 rounded-full bg-[#febc2e]' />
    <i className='size-2.5 rounded-full bg-[#28c840]' />
    <span
      className={cx(
        'ml-2.5 rounded-[7px] bg-(--bar-pill) px-3 py-0.75 text-[13px] text-(--bar-text)',
        light && 'border border-line'
      )}
    >
      {title}
    </span>
    {children}
  </span>
)

export default ProductCard
