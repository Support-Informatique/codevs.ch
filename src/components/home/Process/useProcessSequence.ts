import {
  type Dispatch,
  type RefObject,
  type SetStateAction,
  useEffect,
  useState
} from 'react'
import { flushSync } from 'react-dom'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTimers } from '@/hooks/useTimers'
import { CODE_LENGTH, OFFER_LINES, SHIP_LOG, STEPS } from './steps'

/** `wait`: hidden, ready to play; `play`: shown; `idle`: neither (only for one reflow). */
export type MeetPhase = 'wait' | 'idle' | 'play'
export interface OfferState {
  /** How many lines (items, then the total) have popped in. */
  shown: number
  aim: boolean
  click: boolean
  ok: boolean
}
export interface CodeState {
  /** Characters typed so far. */
  typed: number
  ok: boolean
}
export interface ShipState {
  /** Log lines ticked off so far. */
  ticked: number
  ok: boolean
}
export interface CellsState {
  /** The step playing: its rail number lights up. */
  active: number | null
  /** Steps from this index on are not reached yet and wait dimmed. */
  reached: number
}

interface Step {
  /** Back to the step's start. */
  reset: () => void
  /** Schedules the step; returns how long it lasts, in ms. */
  play: () => number
  /** Shows the step finished. */
  done: () => void
}

const TYPE = 26 // ms per typed character
const START = 300 // after a reset, before the first step
const GAP = 350 // between two steps
const HOLD = 2600 // the finished result stays this long before the story restarts

const SETTLED: CellsState = { active: null, reached: STEPS.length }

/** A setter that merges a partial update into an object state. */
const merge =
  <T>(set: Dispatch<SetStateAction<T>>) =>
  (patch: Partial<T>) =>
    set(state => ({ ...state, ...patch }))

/**
 * "Comment se passe un projet" plays as a story, one step after another:
 * 1 the faces, the text, then "Gratuit"; 2 the quote's lines fill in and a cursor accepts it;
 * 3 React code types itself, then "Aperçu à jour"; 4 progress fills, the checks tick off and the
 * status turns "En ligne". Once all four are done the result holds, then the story restarts.
 * It only plays while `ref`'s element is on screen; otherwise (and with reduced motion) every
 * step is shown finished, so the section is never empty.
 */
export const useProcessSequence = (ref: RefObject<HTMLElement | null>) => {
  const inView = useInView(ref, { threshold: 0.35 })
  const reduce = usePrefersReducedMotion()
  const { at, clear } = useTimers()

  // Every state starts finished: that is what shows before the section first comes into view.
  const [cells, setCells] = useState<CellsState>(SETTLED)
  const [meet, setMeet] = useState<MeetPhase>('play')
  const [offer, setOffer] = useState<OfferState>({
    shown: OFFER_LINES,
    aim: false,
    click: false,
    ok: true
  })
  const [code, setCode] = useState<CodeState>({ typed: CODE_LENGTH, ok: true })
  const [ship, setShip] = useState<ShipState>({
    ticked: SHIP_LOG.length,
    ok: true
  })

  const playing = inView && !reduce

  useEffect(() => {
    if (!playing) return
    const patchOffer = merge(setOffer)
    const patchCode = merge(setCode)
    const patchShip = merge(setShip)

    const steps: Step[] = [
      {
        reset: () => setMeet('wait'),
        play: () => {
          // Commit "neither wait nor play" and force a reflow before adding `play`, as v5 does,
          // so the children's fade-in starts from that intermediate style.
          flushSync(() => setMeet('idle'))
          ref.current?.getBoundingClientRect()
          setMeet('play')
          return 1300
        },
        done: () => setMeet('play')
      },
      {
        reset: () =>
          setOffer({ shown: 0, aim: false, click: false, ok: false }),
        play: () => {
          for (let i = 0; i < OFFER_LINES; i++)
            at(200 + i * 260, () => patchOffer({ shown: i + 1 }))
          const t = 200 + OFFER_LINES * 260
          at(t + 150, () => patchOffer({ aim: true }))
          at(t + 900, () => patchOffer({ click: true }))
          at(t + 1100, () => patchOffer({ click: false, ok: true }))
          at(t + 1600, () => patchOffer({ aim: false }))
          return t + 1600
        },
        // Like v5, leaves the cursor as it was if the story is cut short.
        done: () => patchOffer({ shown: OFFER_LINES, ok: true })
      },
      {
        reset: () => setCode({ typed: 0, ok: false }),
        play: () => {
          for (let i = 1; i <= CODE_LENGTH; i++)
            at(150 + i * TYPE, () => patchCode({ typed: i }))
          at(150 + CODE_LENGTH * TYPE + 250, () => patchCode({ ok: true }))
          return 150 + CODE_LENGTH * TYPE + 700
        },
        done: () => setCode({ typed: CODE_LENGTH, ok: true })
      },
      {
        reset: () => setShip({ ticked: 0, ok: false }),
        play: () => {
          SHIP_LOG.forEach((_, i) =>
            at(300 + i * 600, () => patchShip({ ticked: i + 1 }))
          )
          at(300 + SHIP_LOG.length * 600, () => patchShip({ ok: true }))
          return 300 + SHIP_LOG.length * 600 + 300
        },
        done: () => setShip({ ticked: SHIP_LOG.length, ok: true })
      }
    ]

    // Each step starts once the previous one has finished.
    const playFrom = (i: number) => {
      if (i >= steps.length) {
        setCells(SETTLED)
        at(HOLD, story)
        return
      }
      setCells({ active: i, reached: i + 1 })
      at(steps[i].play() + GAP, () => playFrom(i + 1))
    }
    const story = () => {
      clear()
      steps.forEach(step => step.reset())
      setCells({ active: null, reached: 0 })
      at(START, () => playFrom(0))
    }

    story()
    // Off screen (or unmounted): stop, and show everything finished with nothing highlighted.
    return () => {
      clear()
      steps.forEach(step => step.done())
      setCells(SETTLED)
    }
  }, [playing, ref, at, clear])

  return { cells, meet, offer, code, ship }
}
