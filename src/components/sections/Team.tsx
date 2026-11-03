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
    <Container className='grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-20'>
      <SectionHeading
        eyebrow='Qui sommes-nous'
        title='Nous, c’est Elwan et Lionel.'
        intro='Nous avons fondé CODEVS Sàrl à Fribourg et nous nous occupons nous-mêmes de chaque projet, du premier rendez-vous à la mise en ligne.'
      />
      <div className='grid grid-cols-2 gap-4 sm:gap-6'>
        {people.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.1} className={i === 1 ? 'mt-12 sm:mt-20' : ''}>
            <a href={p.linkedin} target='_blank' rel='noreferrer' className='group block'>
              <img
                src={p.photo}
                alt={p.name}
                loading='lazy'
                className='aspect-[4/5] w-full rounded-2xl object-cover transition duration-500 group-hover:-translate-y-1'
              />
              <p className='mt-4 flex items-center justify-between gap-2 font-semibold leading-tight'>
                {p.name}
                <BsLinkedin className='shrink-0 text-ink/25 transition group-hover:text-[#0a66c2]' aria-label='LinkedIn' />
              </p>
              <p className='mt-1 text-sm text-ink/55'>{p.role}</p>
            </a>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
)

export default Team
