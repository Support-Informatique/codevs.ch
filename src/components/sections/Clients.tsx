import { clientLogos } from '@/data/data'

const Clients: React.FC = () => (
  <section aria-label='Ils nous font confiance' className='pb-8 sm:pb-20'>
    <p className='text-center text-sm font-medium text-ink/50'>
      Ils nous ont fait confiance
    </p>
    <div className='relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]'>
      <ul className='marquee flex w-max items-center gap-14 pr-14'>
        {[...clientLogos, ...clientLogos].map((logo, i) => (
          <li key={i} aria-hidden={i >= clientLogos.length}>
            <img
              src={logo.src}
              alt={logo.name}
              loading='lazy'
              className='h-12 w-auto max-w-[130px] object-contain opacity-60 mix-blend-multiply grayscale transition hover:opacity-100 hover:grayscale-0'
            />
          </li>
        ))}
      </ul>
    </div>
  </section>
)

export default Clients
