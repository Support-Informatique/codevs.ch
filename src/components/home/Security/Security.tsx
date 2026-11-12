import Reveal from '@/components/home/shared/Reveal'
import { button, container, cx, h2, section } from '@/components/home/shared/ui'
import Breach from './Breach'
import { CERTIFICATIONS, SERVICES } from './data'

/*
 * In v5 every paragraph of this section is 15px / 1.5 / muted (`.sx p`), the section label included,
 * and the head sits 36px above the frame instead of 48px: so the head is written out here rather
 * than taken from SectionHead.
 */
const paragraph = 'leading-normal text-muted'
const title = 'leading-tight font-semibold tracking-[-.02em] text-fg'

/** Cybersécurité: the breach illustration, the services as a list and the certifications. */
const Security = () => (
  <section
    id='securite'
    className={cx(section, 'relative isolate overflow-hidden bg-white')}
  >
    <div className={container}>
      <div className='mb-9 flex flex-col items-start'>
        <p
          className={cx(
            paragraph,
            'mt-1 mb-4.5 font-mono text-[15px] tracking-[.04em] uppercase'
          )}
        >
          - Cybersécurité
        </p>
        <Reveal as='h2' className={h2}>
          Tests d’intrusion
          <br />
          <span className='text-primary'>et audits de sécurité.</span>
        </Reveal>
        <Reveal delay='.1s' className='mt-5 max-w-140'>
          <p
            className={cx(
              paragraph,
              'max-w-140 text-[15px] [&_b]:font-medium [&_b]:text-fg'
            )}
          >
            <b>
              Nous testons vos sites, applications et serveurs comme le ferait
              un attaquant,
            </b>{' '}
            avec votre accord. Vous recevez un rapport clair, et comme nous
            sommes aussi développeurs, nous pouvons vous aider à corriger.
          </p>
          <a href='#contact' className={button()}>
            Demander un pentest
          </a>
        </Reveal>
      </div>

      <Reveal className='grid grid-cols-[1.1fr_1fr] overflow-hidden rounded-card border border-line bg-white max-[960px]:grid-cols-1'>
        <div
          aria-hidden='true'
          className={cx(
            'grid [place-items:end_stretch] border-r border-line max-[960px]:border-r-0 max-[960px]:border-b',
            'bg-surface bg-[radial-gradient(circle_at_1px_1px,var(--color-line-2)_1px,transparent_0)] bg-size-[16px_16px]'
          )}
        >
          <Breach />
        </div>
        <ul className='grid'>
          {SERVICES.map(service => (
            <li
              key={service.title}
              className='border-line px-6.5 py-4.5 not-first:border-t max-[600px]:px-5 max-[600px]:py-5.5'
            >
              <h3 className={cx(title, 'text-[18px]')}>{service.title}</h3>
              <p className={cx(paragraph, 'mt-1 text-[15px]')}>
                {service.text}
              </p>
            </li>
          ))}
        </ul>
        {CERTIFICATIONS.map((cert, i) => (
          <div
            key={cert.code}
            className={cx(
              'flex items-center gap-5 border-t border-line px-6.5 py-4.5 max-[600px]:gap-4 max-[600px]:px-5 max-[600px]:py-5.5',
              i > 0 && 'border-l max-[960px]:border-l-0'
            )}
          >
            <b className='flex-none text-[clamp(30px,3vw,40px)] leading-none font-bold tracking-[-.04em] text-primary'>
              {cert.code}
            </b>
            <div>
              <h3 className={cx(title, 'text-[16px]')}>{cert.name}</h3>
              <p className={cx(paragraph, 'mt-0.75 text-[14px]')}>
                {cert.text}
              </p>
            </div>
          </div>
        ))}
      </Reveal>
    </div>
  </section>
)

export default Security
