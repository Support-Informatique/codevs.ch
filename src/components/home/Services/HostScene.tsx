import { useCallback, useRef } from 'react'
import { cx } from '@/components/home/shared/ui'
import { flag, reflow, type Scheduler } from './scheduler'
import { panel, stage, stageSvg } from './stage'
import { need, type SceneProps, type Timeline, useScene } from './useScene'

/** Days of checks shown per site. */
const DAYS = 40

const SITES: ReadonlyArray<{ site: string; uptime: number }> = [
  { site: 'jeunessecharmey.ch', uptime: 99.98 },
  { site: '10kmpayerne.ch', uptime: 100 },
  { site: 'pay-event.ch', uptime: 99.99 },
  { site: 'schweizersolaire.ch', uptime: 99.98 },
  { site: 'coupedenoelesta.ch', uptime: 100 },
  { site: 'acritec.ch', uptime: 99.98 }
]

/**
 * Each site's days, true for a pale one (a short outage that day). At 100 % every day is full;
 * below, one or two days are pale, picked by a fixed pseudo-random seed per row.
 */
const ROWS = SITES.map(({ site, uptime }, row) => {
  const drops = uptime >= 100 ? 0 : uptime >= 99.98 ? 1 : 2
  let seed = 7 + row * 13
  const random = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
  const off = new Set<number>()
  while (off.size < drops) off.add(4 + Math.floor(random() * 34))
  return {
    site,
    uptime: `${String(uptime).replace('.', ',')} %`,
    days: Array.from({ length: DAYS }, (_, day) => off.has(day))
  }
})

/** One day of checks: full blue if the site was up all day, pale after a short outage. */
const bar =
  'flex-1 origin-bottom scale-y-[.25] rounded-[2.5px] opacity-0 [transition:opacity_.25s_var(--ease-brand)_calc(var(--d)_+_.25s),scale_.4s_var(--ease-brand)_calc(var(--d)_+_.25s)] group-data-on/host:scale-y-100 group-data-on/host:opacity-100'

/** 4 · Hébergement & suivi: a status card, each site with its last 40 days of checks. */
const HostScene = (props: SceneProps) => {
  const ill = useRef<HTMLDivElement>(null)

  const timeline = useCallback(({ at }: Scheduler): Timeline => {
    const root = need(ill)
    return {
      play: () => {
        flag(root, 'on', false)
        reflow(root)
        at(150, () => flag(root, 'on'))
      },
      done: () => flag(root, 'on')
    }
  }, [])

  useScene(ill, props, timeline)

  return (
    <div
      className={cx(panel, 'group/host')}
      ref={ill}
      role='img'
      aria-label='Page de suivi : les six sites sont en ligne, chacun avec 40 jours de vérifications, toutes réussies.'
    >
      <div className={stage} aria-hidden='true'>
        <svg className={stageSvg} viewBox='0 0 640 400'>
          <use href='#g-hills' />
        </svg>
        {/* the only motion: the card fades in, then the bars grow */}
        <div className='absolute top-6 left-10 w-140 translate-y-2.5 rounded-[16px] bg-white px-6.5 pt-5 pb-4.75 opacity-0 shadow-[0_0_0_1px_rgba(10,48,68,.08),0_14px_28px_-18px_rgba(10,48,68,.3),0_40px_70px_-40px_rgba(10,48,68,.45)] [transition:opacity_.5s_var(--ease-brand),translate_.6s_var(--ease-brand)] group-data-on/host:translate-y-0 group-data-on/host:opacity-100'>
          <div className='mb-4 flex items-center justify-between'>
            <b className='text-[15px] font-semibold tracking-[-.01em] text-fg'>
              Vos sites
            </b>
            <span className='inline-flex items-center gap-2 text-[13px] font-medium text-cyan-700'>
              <i className='size-2 rounded-full bg-cyan-500' />
              Tout est en ligne
            </span>
          </div>
          <ul className='grid gap-2'>
            {ROWS.map(({ site, uptime, days }, row) => (
              <li key={site}>
                <div className='mb-1.25 flex h-3.75 items-baseline justify-between'>
                  <span className='text-[12.5px] text-muted'>{site}</span>
                  <em className='font-mono text-[11px] text-muted not-italic tabular-nums'>
                    {uptime}
                  </em>
                </div>
                <div className='flex h-3.5 gap-0.75'>
                  {days.map((pale, day) => (
                    // Each bar has its own delay (--d), so they grow in left to right, one row after the other.
                    <i
                      key={day}
                      style={{ '--d': `${row * 70 + day * 9}ms` }}
                      className={cx(bar, pale ? 'bg-[#c4e4ee]' : 'bg-cyan-500')}
                    />
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className='mt-3.75 flex justify-between text-[11.5px] text-[#8aa1ab]'>
            <span>
              Hébergé en Suisse · Sauvegardes quotidiennes · Mises à jour
            </span>
            <span className='text-muted-2'>{DAYS} jours</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostScene
