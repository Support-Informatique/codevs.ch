import type { ReactNode, SVGProps } from 'react'

type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'>

/** A 16 × 16 stroked line icon, the only icon style on the page. */
const Stroke = ({
  children,
  strokeWidth = 1.7,
  ...props
}: IconProps & { children: ReactNode }) => (
  <svg
    viewBox='0 0 16 16'
    fill='none'
    stroke='currentColor'
    strokeWidth={strokeWidth}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
    {...props}
  >
    {children}
  </svg>
)

export const ArrowRight = (props: IconProps) => (
  <Stroke {...props}>
    <path d='M3 8h10M9 4l4 4-4 4' />
  </Stroke>
)

/** Leaves the page: an external link, an e-mail, a phone number. */
export const ArrowUpRight = (props: IconProps) => (
  <Stroke strokeWidth={1.6} {...props}>
    <path d='M5 11 11 5M6 5h5v5' />
  </Stroke>
)

export const Check = (props: IconProps) => (
  <Stroke strokeWidth={2} {...props}>
    <path d='M3.5 8.5l3 3 6-7' />
  </Stroke>
)

/** Wigud's heartbeat. */
export const Pulse = (props: IconProps) => (
  <Stroke {...props}>
    <path d='M1.5 8.5h3l1.6-4 3 8 1.8-4.5h3.6' />
  </Stroke>
)
