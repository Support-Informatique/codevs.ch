import { Check } from '@/components/home/shared/Icons'
import { cx } from '@/components/home/shared/ui'
import { Bar, Chip, Frame, ICON, OK_PILL } from './frame'
import { CODE_TOKENS, type TokenKind } from './steps'
import type { CodeState } from './useProcessSequence'

const COLOR: Record<TokenKind, string> = {
  k: 'text-[#b0306a]',
  f: 'text-primary',
  s: 'text-[#1a8f66]',
  t: 'text-muted'
}

/** The first `typed` characters of the code, each token in its colour. */
const typedTokens = (typed: number) => {
  const spans = []
  let left = typed
  for (const [i, [text, kind]] of CODE_TOKENS.entries()) {
    if (left <= 0) break
    const part = text.slice(0, left)
    left -= part.length
    spans.push(
      <span key={i} className={COLOR[kind]}>
        {part}
      </span>
    )
  }
  return spans
}

/** 3 · development: React types itself into page.tsx, then "Aperçu à jour". */
const CodeMock = ({ typed, ok }: CodeState) => (
  <Frame>
    <Bar title='page.tsx'>
      <Chip>React</Chip>
    </Bar>
    <pre className='m-0 flex-1 overflow-hidden px-3 pt-2.5 pb-3 font-mono text-[11px] leading-[1.65] whitespace-pre text-fg'>
      {/* v5 left <code> on the browser's own monospace font: kept so it looks the same */}
      <code className='font-[monospace]'>{typedTokens(typed)}</code>
      <i className='ml-0.5 inline-block h-[1.1em] w-[1.5px] animate-blink bg-primary align-[-.2em]' />
    </pre>
    <span
      className={cx(
        'absolute right-2.5 bottom-2.5 inline-flex items-center gap-1.25 px-2.25 py-0.75 text-[11px] font-medium [transition:opacity_.3s,translate_.35s_var(--ease-brand)]',
        OK_PILL,
        ok ? 'translate-y-0 opacity-100' : 'translate-y-1.5 opacity-0'
      )}
    >
      <Check className={ICON} />
      Aperçu à jour
    </span>
  </Frame>
)

export default CodeMock
