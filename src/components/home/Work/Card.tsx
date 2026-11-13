import type { ReactNode } from 'react'
import { cx, mono } from '../shared/ui'

/** The frame of every réalisation card; hovering it moves the picture inside (`group`). */
export const card = cx(
  'group flex flex-col overflow-hidden rounded-card border border-line',
  '[transition:border-color_.3s,box-shadow_.4s] hover:border-line-2 hover:shadow-[0_30px_60px_-40px_rgba(10,48,68,.4)]'
)

/** A small cyan label: the kind of project. */
export const kindLabel = cx(mono, 'text-cyan-700')

/** A photo filling its frame, slowly zooming in on hover. */
export const Photo = ({ src, alt }: { src: string; alt: string }) => (
  <img
    src={src}
    alt={alt}
    loading='lazy'
    className='absolute inset-0 size-full object-cover transition-transform duration-1200 ease-brand group-hover:scale-[1.04]'
  />
)

/** The picture area of a card in the grid. */
export const CardArt = ({
  className,
  children
}: {
  className?: string
  children: ReactNode
}) => (
  <div
    className={cx(
      'relative aspect-3/2 overflow-hidden border-b border-line',
      className
    )}
  >
    {children}
  </div>
)

export const CardInfo = ({
  kind,
  name,
  summary
}: {
  kind: string
  name: string
  summary: string
}) => (
  <div className='px-5 pt-4.5 pb-5.5'>
    <span className={cx(kindLabel, 'text-[10.5px]')}>{kind}</span>
    <h3 className='mt-1.5 text-[18px] font-medium tracking-[-.02em]'>{name}</h3>
    <p className='mt-1 text-[14px] leading-normal text-muted'>{summary}</p>
  </div>
)
