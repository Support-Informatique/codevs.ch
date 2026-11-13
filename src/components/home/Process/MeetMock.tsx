import elwan from '@/assets/team/elwan.webp'
import lionel from '@/assets/team/lionel.webp'
import { cx } from '@/components/home/shared/ui'
import { Frame, OK_PILL } from './frame'
import type { MeetPhase } from './useProcessSequence'

/** When each of the four lines starts rising in, once the step plays. */
const DELAYS = ['', 'delay-200', 'delay-300', 'delay-600']

const FACE =
  'size-10 rounded-full bg-cyan-100 object-cover shadow-[0_0_0_2px_#fff]'

/** 1 · the first meeting: our faces, the text, then "Gratuit". */
const MeetMock = ({ phase }: { phase: MeetPhase }) => {
  // `wait` hides the lines without a transition, so the reset is instant.
  const line = (i: number) =>
    phase === 'wait'
      ? 'translate-y-1.5 opacity-0 transition-none'
      : cx(
          'transition-[opacity,translate] duration-[.35s,.4s] ease-quart',
          phase === 'play' && DELAYS[i]
        )

  return (
    <Frame className='items-center justify-center gap-0.5 px-4.5 py-4 text-center'>
      <div className={cx('mb-2 flex', line(0))}>
        <img src={elwan} alt='' width='40' height='40' className={FACE} />
        <img
          src={lionel}
          alt=''
          width='40'
          height='40'
          className={cx(FACE, '-ml-2.5')}
        />
      </div>
      <b className={cx('text-[14px] font-semibold text-fg', line(1))}>
        Premier échange
      </b>
      <span className={cx('text-muted', line(2))}>Café ou appel</span>
      <em
        className={cx(
          'mt-2 px-2.5 py-0.5 font-mono text-[11px] not-italic',
          OK_PILL,
          line(3)
        )}
      >
        Gratuit
      </em>
    </Frame>
  )
}

export default MeetMock
