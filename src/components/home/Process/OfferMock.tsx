import { Check } from '@/components/home/shared/Icons'
import { cx } from '@/components/home/shared/ui'
import { Bar, Body, Chip, Frame, ICON } from './frame'
import { OFFER_ITEMS } from './steps'
import type { OfferState } from './useProcessSequence'

const ROW = 'grid items-center gap-2 text-[12px] text-fg'
const BAR = 'block h-1.5 w-9.5 rounded-[3px] bg-line-2'
const SWAP =
  'col-start-1 row-start-1 inline-flex items-center gap-1.5 [transition:opacity_.25s,translate_.3s_var(--ease-brand)]'

/** 2 · the offer: its lines pop in, then a cursor clicks "Accepter le devis". */
const OfferMock = ({ shown, aim, click, ok }: OfferState) => {
  // A line rises in once it is shown.
  const line = (i: number) =>
    cx(
      '[transition:opacity_.3s_var(--ease-brand),translate_.35s_var(--ease-brand)]',
      i < shown ? 'translate-y-0 opacity-100' : 'translate-y-1.25 opacity-0'
    )

  return (
    <Frame>
      <Bar title='Devis n° 014'>
        <Chip>CODEVS</Chip>
      </Bar>
      <Body tight>
        <ul className='grid gap-0.5'>
          {OFFER_ITEMS.map(({ label, Icon }, i) => (
            <li
              key={label}
              className={cx(ROW, 'h-5.25 grid-cols-[auto_1fr_auto]', line(i))}
            >
              <i className='grid size-4.75 place-items-center rounded-card-xs border border-cyan-100 bg-cyan-50 text-cyan-700'>
                <Icon />
              </i>
              <span>{label}</span>
              <em className={BAR} />
            </li>
          ))}
          <li
            className={cx(
              ROW,
              'mt-0.75 h-5.5 grid-cols-[1fr_auto] border-t border-line pt-1.25 font-semibold',
              line(OFFER_ITEMS.length)
            )}
          >
            <span>Total</span>
            <em className='block h-1.75 w-13 rounded-[3px] bg-muted-2' />
          </li>
        </ul>
        <span
          className={cx(
            'relative mt-auto grid h-7 flex-none place-items-center overflow-hidden rounded-[9px] font-medium text-white [transition:background_.3s,scale_.15s]',
            ok ? 'bg-[#1a8f66]' : 'bg-primary',
            click && !ok && 'scale-[.96]'
          )}
        >
          <span
            className={cx(
              SWAP,
              ok ? '-translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
            )}
          >
            Accepter le devis
          </span>
          <span
            className={cx(
              SWAP,
              ok ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            )}
          >
            <Check className={ICON} />
            Devis accepté
          </span>
        </span>
      </Body>
      {/* the pointer that glides to the button and clicks it */}
      <svg
        viewBox='0 0 14 18'
        aria-hidden='true'
        className={cx(
          'absolute h-4.5 w-3.5 [transition:left_.7s_var(--ease-brand),top_.7s_var(--ease-brand),opacity_.3s]',
          aim
            ? 'top-[84%] left-[54%] opacity-100'
            : 'top-[30%] left-[72%] opacity-0'
        )}
      >
        <path
          d='M1 1v14l4-3.6 2.6 5.6 2.4-1.1-2.6-5.4H13z'
          fill='#0a3044'
          stroke='#fff'
          strokeWidth='1.2'
          strokeLinejoin='round'
        />
      </svg>
    </Frame>
  )
}

export default OfferMock
