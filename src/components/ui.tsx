import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export const Reveal: React.FC<{ children: ReactNode, className?: string, delay?: number }> = ({
  children,
  className = '',
  delay = 0
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
  >
    {children}
  </motion.div>
)

export const Eyebrow: React.FC<{ children: ReactNode, dark?: boolean }> = ({ children, dark = false }) => (
  <p
    className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${
      dark ? 'text-sky' : 'text-secondary'
    }`}
  >
    <span className='h-px w-6 bg-current' />
    {children}
  </p>
)

export const SectionHeading: React.FC<{
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  dark?: boolean
}> = ({ eyebrow, title, intro, dark = false }) => (
  <Reveal className='max-w-3xl'>
    <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
    <h2 className={`mt-4 text-3xl font-bold sm:text-5xl ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
    {intro && (
      <p className={`mt-5 text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-ink/65'}`}>{intro}</p>
    )}
  </Reveal>
)

const buttonStyles = {
  primary: 'bg-primary text-white hover:bg-navy shadow-lg shadow-primary/20',
  secondary: 'bg-white text-ink ring-1 ring-line hover:ring-secondary',
  light: 'bg-white text-primary hover:bg-sky',
  ghost: 'text-white ring-1 ring-white/30 hover:bg-white/10'
}

export const Button: React.FC<{
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: keyof typeof buttonStyles
  className?: string
}> = ({ children, href, onClick, variant = 'primary', className = '' }) => {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${buttonStyles[variant]} ${className}`
  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
        {children}
      </a>
    )
  }
  return (
    <button type='button' onClick={onClick} className={classes}>
      {children}
    </button>
  )
}

export const BrowserFrame: React.FC<{
  src: string
  url: string
  alt: string
  className?: string
  dark?: boolean
}> = ({ src, url, alt, className = '', dark = false }) => (
  <div
    className={`overflow-hidden rounded-xl shadow-2xl shadow-ink/20 ring-1 ${
      dark ? 'bg-[#1b2333] ring-white/10' : 'bg-white ring-ink/10'
    } ${className}`}
  >
    <div className='flex items-center gap-1.5 px-3 py-2.5'>
      <span className='size-2.5 rounded-full bg-[#ff5f57]' />
      <span className='size-2.5 rounded-full bg-[#febc2e]' />
      <span className='size-2.5 rounded-full bg-[#28c840]' />
      <span
        className={`ml-3 truncate rounded-md px-3 py-0.5 text-[11px] ${
          dark ? 'bg-white/10 text-white/60' : 'bg-background text-ink/50'
        }`}
      >
        {url.replace(/^https?:\/\//, '')}
      </span>
    </div>
    <img src={src} alt={alt} loading='lazy' className='block aspect-[16/10] w-full object-cover object-top' />
  </div>
)

export const Container: React.FC<{ children: ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
)
