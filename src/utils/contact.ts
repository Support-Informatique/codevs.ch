/**
 * Contact details are never stored as plain strings, so they don't show up in the
 * HTML or the JS bundle for scrapers. They are decoded at runtime and rendered as
 * one HTML entity per character.
 */

const decode = (codes: number[]) =>
  String.fromCharCode(...codes.map(c => c - 7))

const email = () =>
  decode([
    106, 118, 117, 123, 104, 106, 123, 71, 106, 118, 107, 108, 125, 122, 53,
    106, 111
  ])
const phone = () =>
  decode([50, 59, 56, 39, 62, 64, 39, 56, 64, 64, 39, 61, 62, 39, 55, 63])

const toEntities = (text: string) =>
  text
    .split('')
    .map(c => `<span>&#${c.charCodeAt(0)};</span>`)
    .join('')

export const emailHtml = () => toEntities(email())
export const phoneHtml = () => toEntities(phone())

// Links are built on click so no mailto:/tel: href sits in the DOM
export const openMail = () => {
  window.location.href = `mailto:${email()}`
}

export const callPhone = () => {
  window.location.href = `tel:${phone().replace(/\s/g, '')}`
}
