import { cx } from '../shared/ui'
import { WindowBar, windowFrame } from './ProductCard'

const DAYS = 40

/** Monitored sites, with the index of the day that had a warning, if any. */
const MONITORS = [
  { name: 'jeunessecharmey.ch', type: 'Site web' },
  { name: 'pay-event.ch', type: 'Application' },
  { name: 'schweizersolaire.ch', type: 'Site web' },
  { name: 'serveur principal', type: 'Serveur', warningDay: 31 }
]

const OkDot = ({ className }: { className: string }) => (
  <i
    className={cx(
      'inline-block rounded-full bg-[#22b07d] shadow-[0_0_0_3px_rgba(34,176,125,.15)]',
      className
    )}
  />
)

/** A stylised Wigud dashboard: every site up, one past warning on the server. */
const WigudPanel = () => (
  <div className={windowFrame}>
    <WindowBar title='Wigud' light>
      <span className='ml-auto inline-flex flex-none items-center gap-2 rounded-card border border-[#cdeee0] bg-[#edf9f4] px-2.5 py-0.75 font-mono text-[12px] text-[#1a8f66]'>
        <OkDot className='size-1.75' />
        we good.
      </span>
    </WindowBar>
    <ul className='grid aspect-16/10 min-h-0 auto-rows-[minmax(0,1fr)] content-stretch gap-2 overflow-hidden p-3.5'>
      {MONITORS.map(({ name, type, warningDay }) => (
        <li
          key={name}
          className='grid grid-cols-[1fr_auto] content-center gap-x-3 gap-y-2 rounded-card-sm border border-line bg-surface px-3.5 py-2'
        >
          <span className='inline-flex items-center gap-2.25 font-mono text-[13px] text-fg'>
            <OkDot className='size-1.5' />
            {name}
          </span>
          <span className='font-mono text-[12px] text-muted-2'>{type}</span>
          <span
            className='col-span-full flex h-4.5 gap-0.75 max-[600px]:gap-0.5'
            aria-hidden='true'
          >
            {Array.from({ length: DAYS }, (_, day) => (
              <b
                key={day}
                className={cx(
                  'flex-1 rounded-xs transition-opacity duration-200 hover:opacity-100',
                  day === warningDay
                    ? 'bg-[#e8a317]'
                    : 'bg-[#3cbf8c] opacity-85'
                )}
              />
            ))}
          </span>
        </li>
      ))}
    </ul>
  </div>
)

export default WigudPanel
