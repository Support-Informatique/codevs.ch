import { BsLinkedin } from 'react-icons/bs'
import elwan from '@/assets/team/elwan.webp'
import lionel from '@/assets/team/lionel.webp'
import { Container, Reveal, SectionHeading } from '@/components/ui'

const people = [
  { name: 'Elwan Mayencourt', photo: elwan, role: 'Co-fondateur', linkedin: 'https://www.linkedin.com/in/elwan-mayencourt/' },
  { name: 'Lionel Ding', photo: lionel, role: 'Co-fondateur', linkedin: 'https://www.linkedin.com/in/lionel-ding' }
]

const Team: React.FC = () => (
  <section id='equipe' className='bg-white py-24 sm:py-32'>
    <Container className='grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center'>
      <SectionHeading
        eyebrow='Qui sommes-nous'
        title='Nous, c’est Elwan et Lionel.'
        intro='On a fondé CODEVS Sàrl à Fribourg. On s’occupe nous-mêmes de chaque projet, du premier rendez-vous à la mise en ligne.'
      />
      <Reveal className='grid grid-cols-2 gap-4'>
        {people.map(p => (
          <a
            key={p.name}
            href={p.linkedin}
            target='_blank'
            rel='noreferrer'
            className='group rounded-3xl bg-background p-5 ring-1 ring-line transition hover:ring-secondary/50 sm:p-6'
          >
            <img src={p.photo} alt={p.name} loading='lazy' className='aspect-square w-full rounded-2xl object-cover' />
            <p className='mt-4 font-semibold leading-tight'>{p.name}</p>
            <p className='mt-1 flex items-center justify-between text-sm text-ink/55'>
              {p.role}
              <BsLinkedin className='text-ink/30 transition group-hover:text-[#0a66c2]' aria-label='LinkedIn' />
            </p>
          </a>
        ))}
      </Reveal>
    </Container>
  </section>
)

export default Team
