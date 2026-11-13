import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { cx, h2, lead as leadClass, monoLabel } from './ui'

interface Props {
  /** Small mono label above the title, e.g. "Réalisations" (shown as "- Réalisations"). */
  label: string
  title: ReactNode
  /** One-sentence subtitle under the title. */
  lead?: ReactNode
  /** Replaces the subtitle when it needs more than a sentence (e.g. a subtitle and a button). */
  aside?: ReactNode
}

/** A section's label, title and subtitle, stacked; the title and subtitle fade in on scroll. */
const SectionHead = ({ label, title, lead, aside }: Props) => (
  <div className='mb-12 flex flex-col items-start'>
    <p className={cx(monoLabel, 'mb-4.5')}>- {label}</p>
    <Reveal as='h2' className={h2}>
      {title}
    </Reveal>
    <div className='mt-5 max-w-140'>
      {aside ?? (
        <Reveal as='p' delay='.1s' className={leadClass}>
          {lead}
        </Reveal>
      )}
    </div>
  </div>
)

export default SectionHead
