import { Fragment, useEffect, useReducer, useRef } from 'react'
import { ArrowRight } from '@/components/home/shared/Icons'
import SectionHead from '@/components/home/shared/SectionHead'
import { container, cx, section } from '@/components/home/shared/ui'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import SceneDefs from './SceneDefs'
import { SERVICES } from './data'
import type { SceneMode } from './useScene'
import { useStageScale } from './useStageScale'

/** The "+" after a closed service; turns a quarter on hover. */
const Plus = () => (
  <svg
    className='ml-3 inline-block size-3.5 align-[3px] [transition:rotate_.25s_var(--ease-brand)] group-hover:rotate-90'
    viewBox='0 0 14 14'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    aria-hidden='true'
  >
    <path d='M7 1v12M1 7h12' />
  </svg>
)

interface State {
  /** The open service. */
  active: number
  /** What its scene is doing; the others are idle. */
  mode: SceneMode
  /** How many times a scene was started; 0 until the section is first seen or clicked. */
  run: number
}

type Action =
  | { type: 'select'; index: number; reduce: boolean }
  | { type: 'enter'; reduce: boolean }
  | { type: 'leave' }

/**
 * A scene plays once, and only while the panel is on screen: the first time the section comes
 * into view it plays, leaving stops it, and coming back shows its last frame (no replay).
 */
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'select':
      return {
        active: action.index,
        mode: action.reduce ? 'settle' : 'play',
        run: state.run + 1
      }
    case 'enter':
      if (state.run === 0) {
        return reducer(state, {
          type: 'select',
          index: state.active,
          reduce: action.reduce
        })
      }
      return state.mode === 'idle' ? { ...state, mode: 'settle' } : state
    case 'leave':
      return state.run === 0 ? state : { ...state, mode: 'idle' }
  }
}

/** "Nos services": the list on the left opens one service; on the right, its scene. */
const Services = () => {
  const picsRef = useRef<HTMLDivElement>(null)
  const [{ active, mode, run }, dispatch] = useReducer(reducer, {
    active: 0,
    mode: 'idle',
    run: 0
  })
  const reduce = usePrefersReducedMotion()
  const inView = useInView(picsRef, { threshold: 0.3 })

  useStageScale(picsRef)

  useEffect(() => {
    dispatch(inView ? { type: 'enter', reduce } : { type: 'leave' })
  }, [inView, reduce])

  return (
    <section className={section} id='services'>
      <SceneDefs />
      <div className={container}>
        <SectionHead
          label='Nos services'
          title={
            <>
              Du site d’association
              <br />
              <span className='text-primary'>au système de caisse.</span>
            </>
          }
          lead={
            <>
              <b>CODEVS s’occupe de tout,</b> du design à la mise en ligne, puis
              de la maintenance.
            </>
          }
        />

        <div className='grid grid-cols-[.85fr_1.15fr] gap-14 max-[860px]:grid-cols-1'>
          <div className='flex flex-col'>
            {SERVICES.map(({ title, description, more }, i) => {
              const open = i === active
              return (
                <Fragment key={title}>
                  <button
                    type='button'
                    className={cx(
                      'group block w-full py-3.5 text-left text-[26px] font-semibold tracking-[-.04em] [transition:color_.2s]',
                      open ? 'text-fg' : 'text-[#bccdd4] hover:text-muted'
                    )}
                    aria-expanded={open}
                    onClick={() =>
                      dispatch({ type: 'select', index: i, reduce })
                    }
                  >
                    {title}
                    {!open && <Plus />}
                  </button>
                  <p
                    className={cx(
                      'max-w-95 pb-3 text-muted',
                      open ? 'block animate-unfold' : 'hidden'
                    )}
                  >
                    {description}
                    {more && (
                      <a
                        className='group mt-3 flex w-max items-center gap-2 font-medium text-primary [transition:color_.2s] hover:text-primary-hover'
                        href={more}
                      >
                        En savoir plus{' '}
                        <ArrowRight className='size-4 [transition:translate_.25s_var(--ease-brand)] group-hover:translate-x-0.75' />
                      </a>
                    )}
                  </p>
                </Fragment>
              )
            })}
            {/* sits at the bottom of the list, level with the bottom of the picture (its caption hangs below) */}
            <a
              href='#contact'
              className='group mt-auto mb-8.5 inline-flex gap-1.5 self-start pt-6 text-[15px] text-muted'
            >
              Pas sûr de ce qu’il vous faut ?{' '}
              <b className='font-medium text-cyan-700'>
                Expliquez-nous votre idée
              </b>{' '}
              <span className='text-cyan-700 [transition:translate_.25s_var(--ease-brand)] group-hover:translate-x-1'>
                →
              </span>
            </a>
          </div>

          {/* --k: the scale of the 640 × 400 stages, kept up to date by useStageScale */}
          <div className='[--k:1] max-[860px]:-order-1' ref={picsRef}>
            {SERVICES.map(({ title, caption, Scene }, i) => (
              <figure key={title} className={i === active ? 'block' : 'hidden'}>
                <Scene mode={i === active ? mode : 'idle'} run={run} />
                <figcaption className='mt-3 text-[14px] text-muted'>
                  <b className='font-medium text-fg'>{caption.name}</b>,{' '}
                  {caption.text}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
