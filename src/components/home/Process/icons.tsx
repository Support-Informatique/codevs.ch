import type { ReactNode } from 'react'

/** The offer's line icons: 12px, drawn finer (1.4) than the shared icon set. */
const Fine = ({ children }: { children: ReactNode }) => (
  <svg
    viewBox='0 0 16 16'
    className='size-3 flex-none'
    fill='none'
    stroke='currentColor'
    strokeWidth={1.4}
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    {children}
  </svg>
)

export const HomeIcon = () => (
  <Fine>
    <path d='M2.5 7.2 8 2.8l5.5 4.4V13a.7.7 0 0 1-.7.7H9.6V10H6.4v3.7H3.2a.7.7 0 0 1-.7-.7z' />
  </Fine>
)

export const AccountIcon = () => (
  <Fine>
    <circle cx='8' cy='5.4' r='2.6' />
    <path d='M3 13.6c.6-2.5 2.6-3.8 5-3.8s4.4 1.3 5 3.8' />
  </Fine>
)

export const PhoneIcon = () => (
  <Fine>
    <rect x='4' y='1.8' width='8' height='12.4' rx='1.8' />
    <path d='M6.4 5.2h1.4v1.4H6.4zM8.8 7.6h.8M6.4 8.8h3.2v2' />
  </Fine>
)
