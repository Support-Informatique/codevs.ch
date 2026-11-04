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

// View of the Fribourg Pre-Alps looking south from the city (east on the left).
// Peak x follows the real bearing from Fribourg (145° to 201°), peak height follows altitude.
const backRidge = '0,190 60,150 100,118 140,86 175,108 220,135 290,150 380,165 460,160 540,150 620,142 700,135 760,140 830,112 870,88 904,70 935,94 965,125 991,115 1020,135 1080,142 1150,132 1220,116 1260,108 1300,101 1340,122 1390,150 1440,170'
const frontRidge = '0,250 150,240 300,228 450,215 560,195 640,160 700,132 728,124 760,135 820,165 900,195 1000,215 1150,230 1300,240 1440,248'
const peaks = [
  { name: 'Kaiseregg', alt: '2185', x: 140, y: 86, row: 0 },
  { name: 'La Berra', alt: '1719', x: 728, y: 124, row: 0 },
  { name: 'Vanil Noir', alt: '2389', x: 904, y: 70, row: 0 },
  { name: 'Dent de Broc', alt: '1829', x: 991, y: 115, row: 1 },
  { name: 'Moléson', alt: '2002', x: 1300, y: 101, row: 0 }
]
const line = (pts: string) => `M${pts.replace(/ /g, ' L')}`
const area = (pts: string) => `${line(pts)} L1440,280 L0,280 Z`

export const Panorama: React.FC<{ dark?: boolean, labels?: boolean }> = ({ dark = false, labels = false }) => {
  const draw = {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true },
    transition: { duration: 2.4, ease: [0.22, 1, 0.36, 1] as const }
  }
  return (
    <div className='overflow-hidden' aria-hidden='true'>
      <svg viewBox='0 0 1440 280' className='-ml-[50%] block w-[200%] max-w-none md:ml-0 md:w-full'>
        <path d={area(backRidge)} className={dark ? 'fill-white/[0.04]' : 'fill-[#e4eef3]'} />
        <motion.path d={line(backRidge)} fill='none' strokeWidth={1.2} className={dark ? 'stroke-white/25' : 'stroke-navy/30'} {...draw} />
        <path d={area(frontRidge)} className={dark ? 'fill-night' : 'fill-white'} />
        <motion.path d={line(frontRidge)} fill='none' strokeWidth={2} className={dark ? 'stroke-sky/60' : 'stroke-primary'} {...draw} />
        {labels && (
          <g className='max-md:hidden'>
            {peaks.map(p => (
              <g key={p.name}>
                <line x1={p.x} x2={p.x} y1={32 + p.row * 22} y2={p.y - 10} strokeDasharray='2 4' className='stroke-ink/25' />
                <text x={p.x} y={22 + p.row * 22} textAnchor='middle' className='fill-ink/55 text-[13px] font-medium'>
                  {p.name} <tspan className='fill-ink/30'>{p.alt}</tspan>
                </text>
              </g>
            ))}
          </g>
        )}
      </svg>
    </div>
  )
}

export const Container: React.FC<{ children: ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
)
