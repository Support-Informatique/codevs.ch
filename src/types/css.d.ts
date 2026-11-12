import 'react'

// Lets components pass CSS custom properties (e.g. `style={{ '--d': '.1s' }}`) with type checking.
declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined
  }
}
