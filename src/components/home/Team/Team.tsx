import elwan from '@/assets/team/elwan.webp'
import lionel from '@/assets/team/lionel.webp'
import Reveal from '../shared/Reveal'
import { container, cx, h2, lead, monoLabel, section } from '../shared/ui'

const PEOPLE = [
  { name: 'Elwan Mayencourt', role: 'Ingénieur, co-fondateur', photo: elwan },
  { name: 'Lionel Ding', role: 'Ingénieur, co-fondateur', photo: lionel }
]

/**
 * The two founders, next to a short introduction: early enough in the page that visitors know
 * who they will work with, with photos kept small.
 */
const Team = () => (
  <section className={cx(section, 'bg-white')} id='equipe'>
    <div
      className={cx(
        container,
        'grid grid-cols-[minmax(0,1fr)_minmax(0,380px)] items-center gap-14 max-[860px]:grid-cols-1'
      )}
    >
      <div>
        <p className={monoLabel}>- Qui sommes-nous</p>
        <Reveal as='h2' className={h2}>
          Nous, c’est
          <br />
          <span className='text-primary'>Elwan et Lionel.</span>
        </Reveal>
        <Reveal as='p' delay='.1s' className={cx(lead, 'mt-5')}>
          Deux ingénieurs qui ont fondé CODEVS Sàrl à Fribourg.{' '}
          <b>Nous nous occupons nous-mêmes de chaque projet,</b> du premier
          rendez-vous à la mise en ligne.
        </Reveal>
      </div>
      <div className='grid w-full max-w-95 grid-cols-2 gap-4'>
        {PEOPLE.map(({ name, role, photo }, i) => (
          <Reveal
            as='figure'
            key={name}
            delay={i ? '.1s' : undefined}
            className={cx(
              'group overflow-hidden rounded-card border border-line bg-white',
              i > 0 && 'mt-8 max-[600px]:mt-6'
            )}
          >
            <div className='aspect-4/5 overflow-hidden bg-linear-to-b from-cyan-100 to-cyan-50'>
              <img
                src={photo}
                alt={name}
                loading='lazy'
                className='size-full object-cover transition-transform duration-1000 ease-brand group-hover:scale-[1.04]'
              />
            </div>
            <figcaption className='border-t border-line px-3.5 pt-3 pb-3.5'>
              <b className='block text-[14.5px] font-medium tracking-[-.01em]'>
                {name}
              </b>
              <span className='text-[13px] text-muted'>{role}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

export default Team
