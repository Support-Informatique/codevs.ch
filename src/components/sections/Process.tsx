import { Container, Reveal, SectionHeading } from '@/components/ui'

const steps = [
  { title: 'Premier rendez-vous', text: 'Un café ou un appel, gratuit.' },
  { title: 'Offre', text: 'Ce qu’on propose, le délai et le prix.' },
  { title: 'Développement', text: 'On vous montre régulièrement où on en est.' },
  { title: 'Mise en ligne', text: 'On publie et on s’occupe de la maintenance.' }
]

const Process: React.FC = () => (
  <section className='bg-white py-24 sm:py-32'>
    <Container>
      <SectionHeading eyebrow='Déroulement' title='Comment se passe un projet' />
      <Reveal>
        <ol className='relative mt-14 ml-[1.125rem] grid gap-10 border-l border-line pl-8 lg:ml-0 lg:grid-cols-4 lg:gap-8 lg:border-t lg:border-l-0 lg:pt-10 lg:pl-0'>
          {steps.map((s, i) => (
            <li key={s.title} className='relative'>
              <span className='absolute top-0 -left-[3.15rem] flex size-9 items-center justify-center rounded-full bg-primary font-display text-sm font-bold text-white ring-8 ring-white lg:-top-[3.6rem] lg:left-0'>
                {i + 1}
              </span>
              <h3 className='text-lg font-bold'>{s.title}</h3>
              <p className='mt-1.5 text-ink/60'>{s.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Container>
  </section>
)

export default Process
