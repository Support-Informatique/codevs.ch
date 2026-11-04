import { Button } from '@/components/ui'

const NotFound: React.FC = () => (
  <main className='flex min-h-svh flex-col items-center justify-center px-5 text-center'>
    <p className='font-display text-7xl font-extrabold text-primary'>404</p>
    <h1 className='mt-4 text-2xl font-bold'>Cette page s’est perdue en montagne.</h1>
    <p className='mt-2 text-ink/60'>Elle n’existe pas, ou plus.</p>
    <Button href='/' className='mt-8'>Retour à l’accueil</Button>
  </main>
)

export default NotFound
