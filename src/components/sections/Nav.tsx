import { useEffect, useState } from 'react'
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'
import logo from '@/assets/images/logo-support-informatique-dark.svg'
import { Button, Container } from '@/components/ui'

const links = [
  { href: '#services', label: 'Services' },
  { href: '#equipe', label: 'Qui sommes-nous' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#securite', label: 'Cybersécurité' },
  { href: '#produits', label: 'Produits' }
]

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 24) }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-white/85 shadow-sm shadow-ink/5 backdrop-blur-xl' : ''
      }`}
    >
      <Container className='flex h-18 items-center justify-between'>
        <a href='#' aria-label='CODEVS, retour en haut' onClick={() => { setOpen(false) }}>
          <img src={logo} alt='CODEVS Engineering' className='h-9 w-auto' />
        </a>
        <nav className='hidden items-center gap-8 lg:flex' aria-label='Navigation principale'>
          {links.map(l => (
            <a key={l.href} href={l.href} className='text-sm font-medium text-ink/70 transition-colors hover:text-primary'>
              {l.label}
            </a>
          ))}
        </nav>
        <div className='hidden lg:block'>
          <Button href='#contact' className='!py-2.5'>Nous contacter</Button>
        </div>
        <button
          type='button'
          className='-mr-2 p-2 text-2xl text-ink lg:hidden'
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => { setOpen(!open) }}
        >
          {open ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </Container>
      {open && (
        <nav className='border-t border-line lg:hidden' aria-label='Navigation mobile'>
          <Container className='flex flex-col py-4'>
            {[...links, { href: '#contact', label: 'Contact' }].map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => { setOpen(false) }}
                className='border-b border-line/60 py-3.5 font-display text-lg font-semibold text-ink last:border-0'
              >
                {l.label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  )
}

export default Nav
