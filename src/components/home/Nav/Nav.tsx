import { useEffect, useRef, useState } from 'react'
import Brand from '../shared/Brand'
import { ArrowRight } from '../shared/Icons'
import { SECTIONS } from '../shared/links'
import { button, cx, ico } from '../shared/ui'

const burgerLine =
  'absolute inset-x-2.5 h-[1.5px] bg-ink transition-transform duration-250 ease-brand'

/** The `href` of the section crossing the middle of the screen, if any. */
const useCurrentSection = () => {
  const [current, setCurrent] = useState<string>()
  useEffect(() => {
    const els = SECTIONS.map(({ href }) => document.querySelector(href)).filter(
      (el): el is Element => el !== null
    )
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) setCurrent(`#${target.id}`)
          else setCurrent(c => (c === `#${target.id}` ? undefined : c))
        })
      },
      // a thin band across the middle of the screen
      { rootMargin: '-45% 0px -54% 0px' }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return current
}

/**
 * Sticky, frosted top bar: the link of the section being read is lit, and a hairline along the
 * bottom fills as the page is scrolled. Below 860px the links fold into a sheet behind a burger.
 */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progress = useRef<HTMLSpanElement>(null)
  const current = useCurrentSection()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      progress.current?.style.setProperty(
        'scale',
        `${max > 0 ? Math.min(1, window.scrollY / max) : 0} 1`
      )
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={cx(
        'sticky top-0 z-50 bg-white/80 backdrop-blur-[14px] backdrop-saturate-[1.6] transition-shadow duration-300',
        scrolled &&
          'shadow-[0_1px_0_var(--color-line),0_10px_28px_-20px_rgba(10,48,68,.35)]'
      )}
    >
      {/* how far down the page we are */}
      <span
        ref={progress}
        aria-hidden='true'
        className={cx(
          'absolute inset-x-0 bottom-0 h-0.5 origin-left bg-[linear-gradient(90deg,var(--color-cyan-300),var(--color-primary))] transition-opacity duration-300 [scale:0_1]',
          scrolled ? 'opacity-100' : 'opacity-0'
        )}
      />
      <div className='mx-auto flex h-16 max-w-page items-center gap-10 px-6 max-[600px]:px-4'>
        <Brand />
        <nav
          className='-ml-3 flex gap-1 text-[14px] text-muted max-[1080px]:gap-0 max-[860px]:hidden'
          aria-label='Navigation principale'
        >
          {SECTIONS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              aria-current={href === current ? 'location' : undefined}
              className={cx(
                'rounded-[9px] px-3 py-1.5 transition-colors duration-200 hover:bg-cyan-50 hover:text-fg',
                href === current && 'bg-cyan-50 text-cyan-700'
              )}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className='ml-auto flex items-center gap-2'>
          <a href='#contact' className={button('sm')}>
            Nous contacter <ArrowRight className={cx(ico, 'size-3.5')} />
          </a>
          <button
            type='button'
            className='relative hidden size-8.5 rounded-[10px] border border-line-2 bg-white max-[860px]:block'
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls='nav-sheet'
            onClick={() => setOpen(o => !o)}
          >
            <span
              className={cx(
                burgerLine,
                'top-3.25',
                open && 'translate-y-0.75 rotate-45'
              )}
            />
            <span
              className={cx(
                burgerLine,
                'top-4.75',
                open && '-translate-y-0.75 -rotate-45'
              )}
            />
          </button>
        </div>
      </div>
      <div
        id='nav-sheet'
        className={cx(
          'hidden overflow-hidden bg-white px-6 transition-[max-height] duration-400 ease-brand max-[860px]:flex max-[860px]:flex-col',
          open ? 'max-h-105' : 'max-h-0'
        )}
      >
        {[...SECTIONS, { href: '#contact', label: 'Nous contacter' }].map(
          ({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className='border-b border-line py-3.5 text-[18px] tracking-[-.02em]'
            >
              {label}
            </a>
          )
        )}
      </div>
    </header>
  )
}

export default Nav
