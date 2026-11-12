import { Link } from 'react-router-dom'
import { button, cx, lead } from '@/components/home/shared/ui'

const NotFound = () => (
  <main className='flex min-h-svh flex-col items-center justify-center gap-4 px-5 text-center'>
    <p className='text-[72px] leading-none font-extrabold tracking-tighter text-primary'>
      404
    </p>
    <h1 className='text-[24px] font-semibold tracking-[-.02em]'>
      Cette page s’est perdue en montagne.
    </h1>
    <p className={cx(lead, 'mb-4')}>Elle n’existe pas, ou plus.</p>
    <Link to='/' className={button()}>
      Retour à l’accueil
    </Link>
  </main>
)

export default NotFound
