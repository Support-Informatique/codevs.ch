import { Check } from '@/components/home/shared/Icons'
import { cx } from '@/components/home/shared/ui'
import { Bar, Body, Frame, ICON } from './frame'
import { SHIP_LOG } from './steps'
import type { ShipState } from './useProcessSequence'

/** 4 · going live: progress fills, the checks tick off, the status turns "En ligne". */
const ShipMock = ({ ticked, ok }: ShipState) => {
  const progress = ticked > 0 ? SHIP_LOG[ticked - 1].progress : 0
  return (
    <Frame>
      <Bar title='votre-site.ch'>
        <span
          className={cx(
            'inline-flex items-center gap-1.5',
            ok ? 'text-[#1a8f66]' : 'text-[#b77a06]'
          )}
        >
          <i
            className={cx(
              'size-1.5 rounded-full',
              ok
                ? 'bg-[#22b07d] shadow-[0_0_0_3px_rgba(34,176,125,.18)]'
                : 'bg-[#e8a317] shadow-[0_0_0_3px_rgba(232,163,23,.18)]'
            )}
          />
          <span className={ok ? 'hidden' : 'inline'}>Déploiement…</span>
          <span className={ok ? 'inline' : 'hidden'}>En ligne</span>
        </span>
      </Bar>
      <Body>
        <span className='block h-1.25 overflow-hidden rounded-[3px] bg-line'>
          <i
            className={cx(
              'block h-full w-(--w) rounded-[3px] [transition:width_.4s_linear]',
              ok ? 'bg-[#22b07d]' : 'bg-primary'
            )}
            style={{ '--w': `${progress}%` }}
          />
        </span>
        <ul className='my-0.5 grid gap-0.75'>
          {SHIP_LOG.map(({ label }, i) => {
            const on = i < ticked
            return (
              <li
                key={label}
                className={cx(
                  'flex items-center gap-1.75 [transition:color_.25s]',
                  on ? 'text-fg' : 'text-muted-2'
                )}
              >
                <Check
                  className={cx(
                    ICON,
                    '[transition:color_.25s]',
                    on ? 'text-[#1a8f66]' : 'text-line-2'
                  )}
                />
                {label}
              </li>
            )
          })}
        </ul>
        <span className='mt-auto text-[11px] text-muted-2'>
          Hébergé en Suisse · surveillé par Wigud
        </span>
      </Body>
    </Frame>
  )
}

export default ShipMock
