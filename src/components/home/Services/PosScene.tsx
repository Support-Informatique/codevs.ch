import { type ReactNode, useCallback, useRef } from 'react'
import fermeLogo from '@/assets/work/ferme-logo.webp'
import { cx } from '@/components/home/shared/ui'
import { flag, restart, type Scheduler } from './scheduler'
import { cap, panel, stage, stageSvg } from './stage'
import { need, type SceneProps, type Timeline, useScene } from './useScene'

interface Tile {
  name: string
  /** As printed on the tile. */
  price: string
  icon: ReactNode
}

const tileIcon = 'size-5.5 text-primary'

const TILES: readonly Tile[] = [
  {
    name: 'Lait',
    price: '1.90',
    icon: (
      <svg
        className={tileIcon}
        viewBox='0 0 16 16'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.3'
        strokeLinejoin='round'
      >
        <path d='M5.5 2.5h5v2l1.5 2.5v6.5h-8V7l1.5-2.5z' />
        <path d='M4 7.5h8' />
      </svg>
    )
  },
  {
    name: 'Œufs',
    price: '4.20',
    icon: (
      <svg
        className={tileIcon}
        viewBox='0 0 16 16'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.3'
      >
        <path d='M8 2.2c2.6 0 4.6 3.6 4.6 6.6A4.6 4.6 0 0 1 8 13.6a4.6 4.6 0 0 1-4.6-4.8C3.4 5.8 5.4 2.2 8 2.2z' />
      </svg>
    )
  },
  {
    name: 'Tomme',
    price: '3.40',
    icon: (
      <svg
        className={tileIcon}
        viewBox='0 0 16 16'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.3'
        strokeLinejoin='round'
      >
        <path d='M2.5 12.5V8.5l9-4.5 2 4.5v4z' />
        <path d='M2.5 8.5h11' />
        <circle cx='6' cy='10.6' r='.8' fill='currentColor' />
        <circle cx='10' cy='10.4' r='.7' fill='currentColor' />
      </svg>
    )
  },
  {
    name: 'Miel',
    price: '8.50',
    icon: (
      <svg
        className={tileIcon}
        viewBox='0 0 16 16'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.3'
        strokeLinejoin='round'
        strokeLinecap='round'
      >
        <path d='M5 3h6M5.5 3v2L4 6.5V13a1.5 1.5 0 0 0 1.5 1.5h5A1.5 1.5 0 0 0 12 13V6.5L10.5 5V3' />
        <path d='M4 9h8' />
      </svg>
    )
  }
]

/** The first three tiles go in the basket; their total is what the QR code asks for. */
const BASKET = 3
const BASKET_TOTAL = TILES.slice(0, BASKET).reduce(
  (sum, tile) => sum + Number(tile.price),
  0
)
const PAID = BASKET_TOTAL.toFixed(2)

/** A 25 × 25 QR code: the three corner squares, and a fixed pseudo-random pattern. */
const qrPath = () => {
  let seed = 11
  const random = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
  const finder = (x: number, y: number) =>
    `M${x} ${y}h7v7h-7zM${x + 1} ${y + 1}v5h5v-5zM${x + 2} ${y + 2}h3v3h-3z`
  let d = finder(0, 0) + finder(18, 0) + finder(0, 18)
  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 25; x++) {
      const inFinder =
        (x < 8 && y < 8) || (x > 16 && y < 8) || (x < 8 && y > 16)
      if (!inFinder && random() < 0.5) d += `M${x} ${y}h1v1h-1z`
    }
  }
  return d
}
const QR_PATH = qrPath()

const articles = (n: number) => `${n} article${n > 1 ? 's' : ''}`

/** The ripple a touch leaves, replayed while `data-touch` is set; its colour is per element. */
const touchRipple =
  'after:absolute after:top-1/2 after:left-1/2 after:-m-4.25 after:size-8.5 after:rounded-full after:opacity-0 data-touch:after:animate-touch'

/** 2 · Applications & caisses: the Ferme Gourmande till. Three taps, pay with TWINT, paid. */
const PosScene = (props: SceneProps) => {
  const ill = useRef<HTMLDivElement>(null)
  const tileRefs = useRef<(HTMLDivElement | null)[]>([])
  const totalRef = useRef<HTMLElement>(null)
  const countRef = useRef<HTMLSpanElement>(null)
  const payRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  const doneRef = useRef<HTMLDivElement>(null)

  const timeline = useCallback(({ at, tween }: Scheduler): Timeline => {
    const tiles = tileRefs.current.filter(
      (tile): tile is HTMLDivElement => tile !== null
    )
    const total = need(totalRef)
    const count = need(countRef)
    const pay = need(payRef)
    const qr = need(qrRef)
    const paid = need(doneRef)

    let sum = 0
    const countTo = (to: number) => {
      const from = sum
      sum = to
      tween(450, p => {
        total.textContent = (from + (to - from) * p).toFixed(2)
      })
    }
    const tap = (i: number) => {
      const tile = tiles[i]
      restart(tile, 'touch')
      flag(tile, 'tap')
      at(200, () => flag(tile, 'tap', false))
      countTo(sum + Number(TILES[i].price))
      count.textContent = articles(i + 1)
      flag(pay, 'ready')
    }

    const reset = () => {
      tiles.forEach(tile => {
        flag(tile, 'tap', false)
        flag(tile, 'touch', false)
      })
      sum = 0
      total.textContent = '0.00'
      count.textContent = 'Panier vide'
      flag(pay, 'ready', false)
      flag(pay, 'press', false)
      flag(pay, 'touch', false)
      flag(qr, 'on', false)
      flag(qr, 'scan', false)
      flag(paid, 'on', false)
    }

    const play = () => {
      reset()
      for (let i = 0; i < BASKET; i++) at(500 + i * 650, () => tap(i))
      at(2400, () => {
        restart(pay, 'touch')
        flag(pay, 'press')
        at(150, () => flag(pay, 'press', false))
      })
      at(2650, () => flag(qr, 'on'))
      at(3000, () => flag(qr, 'scan'))
      at(4100, () => flag(paid, 'on'))
    }

    const done = () => {
      reset()
      sum = BASKET_TOTAL
      total.textContent = PAID
      count.textContent = articles(BASKET)
      flag(pay, 'ready')
      flag(qr, 'on')
      flag(paid, 'on')
    }

    return { play, done }
  }, [])

  useScene(ill, props, timeline)

  return (
    <div
      className={panel}
      ref={ill}
      role='img'
      aria-label='Une caisse en libre-service : trois articles touchés, le total monte, le client paie avec TWINT et l’écran confirme le paiement.'
    >
      <div className={stage} aria-hidden='true'>
        <svg className={stageSvg} viewBox='0 0 640 400'>
          <use href='#g-hills' />
          <ellipse cx='320' cy='357' rx='92' ry='6' fill='rgba(10,48,68,.10)' />
          <path d='M303 300h34l6 48h-46z' fill='url(#g-metal)' />
          <rect
            x='248'
            y='346'
            width='144'
            height='10'
            rx='5'
            fill='url(#g-metal)'
          />
        </svg>

        {/* the tablet */}
        <div className='absolute top-8.5 left-27.5 h-67 w-105 rounded-3xl bg-[linear-gradient(155deg,#1d4a5f,#0a2a3a_62%)] p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,.07),0_14px_28px_-18px_rgba(10,48,68,.4),0_40px_70px_-40px_rgba(10,48,68,.6)]'>
          <div className='relative h-full overflow-hidden rounded-[14px] bg-white'>
            <header className='flex h-10 items-center border-b border-line px-3.5'>
              <img className='h-6 w-auto' src={fermeLogo} alt='' />
            </header>
            <div className='grid h-51 grid-cols-[1fr_112px] gap-4 p-3.5'>
              <div className='grid grid-cols-2 gap-2.5'>
                {TILES.map((tile, i) => (
                  <div
                    key={tile.name}
                    ref={el => {
                      tileRefs.current[i] = el
                    }}
                    className={cx(
                      'relative flex flex-col justify-between rounded-xl bg-[#f2f8fa] px-3 pt-2.75 pb-2.5 [transition:background-color_.25s,scale_.15s] data-tap:scale-[.96] data-tap:bg-cyan-100',
                      touchRipple,
                      'after:bg-[rgba(15,122,168,.2)]'
                    )}
                  >
                    {tile.icon}
                    <div className='flex items-baseline justify-between'>
                      <b className='text-[12.5px] font-semibold'>{tile.name}</b>
                      <span className='font-mono text-[10.5px] text-muted'>
                        {tile.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className='flex flex-col pt-0.5'>
                <span className={cap}>Total CHF</span>
                <b
                  className='mt-1.5 text-[32px] leading-none font-semibold tracking-[-.04em] tabular-nums'
                  ref={totalRef}
                >
                  0.00
                </b>
                <span
                  className='mt-2 font-mono text-[10.5px] text-muted-2'
                  ref={countRef}
                >
                  Panier vide
                </span>
                <div
                  ref={payRef}
                  className={cx(
                    'relative mt-auto grid h-9.5 place-items-center rounded-card-sm bg-[#e7eff2] text-[13px] font-semibold text-muted-2 [transition:background-color_.3s,color_.3s,box-shadow_.3s,scale_.15s]',
                    'data-press:scale-[.96] data-ready:bg-primary data-ready:text-white data-[ready]:[box-shadow:0_8px_18px_-10px_rgba(15,122,168,.9)]',
                    touchRipple,
                    'after:bg-[rgba(255,255,255,.35)]'
                  )}
                >
                  Payer
                </div>
              </div>
            </div>

            {/* pay with TWINT: the QR code, then a scan line runs down it */}
            <div
              ref={qrRef}
              className='group/qr absolute inset-x-0 top-10 bottom-0 flex scale-[.97] flex-col items-center justify-center gap-3 bg-white opacity-0 [transition:opacity_.3s_var(--ease-brand),scale_.45s_var(--ease-brand)] data-on:scale-100 data-on:opacity-100'
            >
              <div className='relative size-32 rounded-xl p-2.25 shadow-[0_0_0_1px_var(--color-line-2)]'>
                <svg
                  className='size-full text-ink'
                  viewBox='0 0 25 25'
                  shapeRendering='crispEdges'
                >
                  <path d={QR_PATH} fill='currentColor' fillRule='evenodd' />
                </svg>
                <i className='absolute top-1.5 right-1.25 left-1.25 h-0.5 rounded-xs bg-cyan-500 opacity-0 shadow-[0_0_12px_3px_rgba(47,168,203,.5)] group-data-scan/qr:animate-scan' />
              </div>
              <span className={cap}>Scannez avec TWINT · CHF {PAID}</span>
            </div>

            {/* paid: the screen fills from the middle */}
            <div
              ref={doneRef}
              className='group/done absolute inset-0 flex flex-col items-center justify-center bg-primary text-white [clip-path:circle(0_at_50%_54%)] [transition:clip-path_.75s_cubic-bezier(.6,0,.2,1)] data-[on]:[clip-path:circle(80%_at_50%_54%)]'
            >
              {/* v5's `.k-done span` reaches this one too: mono, 11px, the check drawn at 75 % white */}
              <span className='mt-0.5 grid size-15 scale-[.6] place-items-center rounded-full font-mono text-[11px] text-[rgba(255,255,255,.75)] bg-[rgba(255,255,255,.16)] shadow-[0_0_0_10px_rgba(255,255,255,.07)] [transition:scale_.6s_.15s_cubic-bezier(.34,1.45,.64,1)] group-data-on/done:scale-100'>
                <svg
                  className='size-7'
                  viewBox='0 0 36 36'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='3.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path
                    className='[stroke-dasharray:1] [stroke-dashoffset:1] [transition:stroke-dashoffset_.45s_.4s_var(--ease-brand)] group-data-on/done:[stroke-dashoffset:0]'
                    pathLength={1}
                    d='M10 18.5l5.5 5.5L26 13'
                  />
                </svg>
              </span>
              <b className='mt-3.5 text-[22px] font-semibold tracking-[-.02em]'>
                Payé
              </b>
              <span className='mt-0.5 font-mono text-[11px] text-[rgba(255,255,255,.75)]'>
                CHF {PAID} · TWINT · merci !
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PosScene
