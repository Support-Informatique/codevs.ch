import { useEffect, useState } from 'react'
import Brand from '../shared/Brand'
import { SECTIONS } from '../shared/links'
import { button, cx } from '../shared/ui'

const burgerLine =
  'absolute inset-x-2.5 h-[1.5px] bg-ink transition-transform duration-250 ease-brand'

/** Sticky top bar; below 860px the links fold into a sheet behind a burger. */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header
      className={cx(
        'sticky top-0 z-50 border-b bg-white/80 backdrop-blur-[14px] backdrop-saturate-[1.6] transition-[border-color] duration-300',
        scrolled ? 'border-line' : 'border-transparent'
      )}
    >
      <div className='mx-auto flex h-16 max-w-page items-center gap-10 px-6 max-[600px]:px-4'>
        <Brand />
        <nav
          className='flex gap-6.5 text-[14px] text-muted max-[1080px]:gap-4.5 max-[860px]:hidden'
          aria-label='Navigation principale'
        >
          {SECTIONS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className='transition-colors duration-200 hover:text-fg'
            >
              {label}
            </a>
          ))}
        </nav>
        <div className='ml-auto flex items-center gap-2'>
          <a href='#contact' className={button('sm')}>
            Nous contacter
          </a>
          <button
            type='button'
            className='relative hidden size-8.5 rounded-card border border-line-2 bg-white max-[860px]:block'
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
