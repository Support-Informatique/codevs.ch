import { cx } from '../shared/ui'
import { CardArt, CardInfo, card } from './Card'
import type { Site } from './projects'

/** A client website: its home page in a small browser window, linking to the live site. */
const SiteCard = ({ url, kind, name, summary, shot, shotAlt }: Site) => (
  <a
    className={cx(card, 'bg-white')}
    href={`https://${url}`}
    target='_blank'
    rel='noreferrer'
  >
    <CardArt className='[background:radial-gradient(circle_at_1px_1px,var(--color-line-2)_1px,transparent_0)_0_0/16px_16px,linear-gradient(var(--color-cyan-50),#fff)]'>
      <div className='absolute inset-x-[8%] top-7 -bottom-px overflow-hidden rounded-t-card-sm border border-b-0 border-line-2 bg-white shadow-[0_-6px_40px_-18px_rgba(10,48,68,.35)] transition-transform duration-600 ease-brand group-hover:-translate-y-1.5'>
        <div className='flex h-6 items-center gap-1.25 border-b border-line px-2.5'>
          {[0, 1, 2].map(dot => (
            <i key={dot} className='size-1.5 rounded-full bg-line-2' />
          ))}
          <span className='ml-2 rounded-full bg-surface px-2.25 py-px font-mono text-[9.5px] text-muted'>
            {url}
          </span>
        </div>
        <img
          src={shot}
          alt={shotAlt}
          loading='lazy'
          className='block h-auto min-h-[calc(100%-24px)] w-full object-cover object-top'
        />
      </div>
    </CardArt>
    <CardInfo kind={kind} name={name} summary={summary} />
  </a>
)

export default SiteCard
