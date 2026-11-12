import type { ReactNode } from 'react'
import { callPhone, emailHtml, openMail, phoneHtml } from '@/utils/contact'

const ACTIONS = {
  email: { html: emailHtml, open: openMail },
  phone: { html: phoneHtml, open: callPhone }
}

interface Props {
  kind: keyof typeof ACTIONS
  className?: string
  /** Shown after the address, e.g. an arrow icon. */
  children?: ReactNode
}

/**
 * Our e-mail address or phone number as a button that opens the mail app or the dialer. The
 * value is decoded at runtime (see utils/contact), so it never sits in the HTML or the bundle.
 */
const ContactAction = ({ kind, className, children }: Props) => {
  const { html, open } = ACTIONS[kind]
  return (
    <button type='button' className={className} onClick={open}>
      <span dangerouslySetInnerHTML={{ __html: html() }} />
      {children}
    </button>
  )
}

export default ContactAction
