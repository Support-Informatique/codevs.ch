import { BsLinkedin } from 'react-icons/bs'
import logo from '@/assets/images/logo-support-informatique-light.svg'
import { Container } from '@/components/ui'

const Footer: React.FC = () => (
  <footer className='bg-night text-white/60'>
    <Container className='grid gap-10 py-14 sm:grid-cols-[1.5fr_1fr_1fr]'>
      <div>
        <img src={logo} alt='CODEVS Engineering' className='h-10 w-auto' />
        <p className='mt-5 max-w-xs text-sm leading-relaxed'>
          Agence web et cybersécurité à Fribourg. Sites, applications et tests d’intrusion pour toute la
          Suisse romande.
        </p>
      </div>
      <nav aria-label='Pied de page' className='flex flex-col gap-2.5 text-sm'>
        <a href='#services' className='hover:text-white'>Services</a>
        <a href='#equipe' className='hover:text-white'>Qui sommes-nous</a>
        <a href='#realisations' className='hover:text-white'>Réalisations</a>
        <a href='#securite' className='hover:text-white'>Cybersécurité</a>
        <a href='#produits' className='hover:text-white'>Produits</a>
        <a href='#contact' className='hover:text-white'>Contact</a>
      </nav>
      <div className='flex flex-col gap-2.5 text-sm'>
        <a href='https://pay-event.ch' target='_blank' rel='noreferrer' className='hover:text-white'>Pay Event</a>
        <a href='https://www.linkedin.com/company/codevs-ch/' target='_blank' rel='noreferrer' className='inline-flex items-center gap-2 hover:text-white'>
          <BsLinkedin /> LinkedIn
        </a>
        <p>1700 Fribourg, Suisse</p>
      </div>
    </Container>
    <div className='border-t border-white/10'>
      <Container className='py-6 text-xs'>© {new Date().getFullYear()} CODEVS Sàrl. Tous droits réservés.</Container>
    </div>
  </footer>
)

export default Footer
