import { type ReactNode, useRef } from 'react'
import Reveal from '@/components/home/shared/Reveal'
import SectionHead from '@/components/home/shared/SectionHead'
import { container, cx, section } from '@/components/home/shared/ui'
import CodeMock from './CodeMock'
import MeetMock from './MeetMock'
import OfferMock from './OfferMock'
import ShipMock from './ShipMock'
import { type StepId, STEPS } from './steps'
import { useProcessSequence } from './useProcessSequence'

/**
 * Dividers between the cells as the grid goes from 4 columns to 2 (≤ 960px) to 1 (≤ 600px):
 * a right border except on a row's last cell, a bottom border except on the last row.
 */
const CELL_BORDERS = [
  'border-r max-[960px]:border-b max-[600px]:border-r-0',
  'border-r max-[960px]:border-r-0 max-[960px]:border-b',
  'border-r max-[600px]:border-r-0 max-[600px]:border-b',
  ''
]

/**
 * Scroll-in: the cells rise one after another and the rail draws through them. Driven by
 * `data-reveal` on the `group/flow` around the grid; `--stagger` is set per cell.
 */
const CELL_IN =
  'translate-y-2.5 opacity-0 transition-[opacity,translate] delay-(--stagger) duration-[.42s] ease-quart group-data-[reveal=in]/flow:translate-y-0 group-data-[reveal=in]/flow:opacity-100 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none'
const RAIL_IN =
  'before:origin-left before:scale-x-0 before:transition-transform before:delay-(--stagger) before:duration-500 before:ease-quart group-data-[reveal=in]/flow:before:scale-x-100 motion-reduce:before:scale-x-100 motion-reduce:before:transition-none'

/**
 * "Comment se passe un projet": the four steps in one bordered grid, each with a small mock-up,
 * one numbered rail running through every cell, then a title and a sentence.
 */
const Process = () => {
  const flow = useRef<HTMLOListElement>(null)
  const { cells, meet, offer, code, ship } = useProcessSequence(flow)
  const mockups: Record<StepId, ReactNode> = {
    meet: <MeetMock phase={meet} />,
    offer: <OfferMock {...offer} />,
    code: <CodeMock {...code} />,
    ship: <ShipMock {...ship} />
  }

  return (
    <section className={section} id='process'>
      <div className={container}>
        <SectionHead
          label='Déroulement'
          title={
            <>
              Comment se passe
              <br />
              <span className='text-primary'>un projet.</span>
            </>
          }
          lead={
            <>
              <b>Quatre étapes, de la plaine au sommet.</b> Vous savez toujours
              où nous en sommes et ce qui vient ensuite.
            </>
          }
        />

        {/* Reveal doesn't take a ref, so it wraps the grid that the sequence watches */}
        <Reveal className='group/flow'>
          <ol
            ref={flow}
            className='relative grid grid-cols-4 overflow-hidden rounded-card border border-line max-[960px]:grid-cols-2 max-[600px]:grid-cols-1'
          >
            {STEPS.map(({ id, title, text }, i) => {
              const active = i === cells.active
              return (
                <li
                  key={id}
                  data-wait={i >= cells.reached || undefined}
                  style={{ '--stagger': `${i / 10}s` }}
                  className={cx(
                    'group/cell border-line pb-7',
                    CELL_BORDERS[i],
                    CELL_IN
                  )}
                >
                  <div
                    aria-hidden='true'
                    className='relative flex h-58 items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_1px_1px,var(--color-line-2)_1px,transparent_0)] bg-size-[16px_16px] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(ellipse_at_center,transparent_30%,#fff_85%)]'
                  >
                    {mockups[id]}
                  </div>
                  <div
                    aria-hidden='true'
                    className={cx(
                      'relative flex h-13 items-center px-5.5 before:absolute before:top-1/2 before:-right-px before:left-0 before:h-px before:bg-line-2',
                      RAIL_IN
                    )}
                  >
                    <span
                      className={cx(
                        'relative grid size-7.5 place-items-center rounded-full border-[1.5px] text-[13px] font-semibold [transition:background_.3s,border-color_.3s,color_.3s,scale_.35s_var(--ease-quart)]',
                        active
                          ? 'scale-[1.08] border-primary bg-primary text-white'
                          : 'border-ink bg-white text-ink'
                      )}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <h3 className='px-5.5 text-[21px] leading-tight font-semibold tracking-tight text-fg'>
                    {title}
                  </h3>
                  <p className='mt-2 px-5.5 text-[15.5px] leading-normal text-muted'>
                    {text}
                  </p>
                </li>
              )
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

export default Process
