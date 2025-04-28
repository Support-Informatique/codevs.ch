/**
 * Email obfuscation utility to prevent bot scraping
 * Uses multiple obfuscation techniques:
 * - Character encoding
 * - Dynamic string building
 * - HTML entity encoding
 * - String reversal
 * - HTML element splitting
 */

const getObfuscatedEmail = (): string => {
  // Split the email into parts
  const parts = [
    // contact
    String.fromCharCode(99, 111, 110, 116, 97, 99, 116),
    // @
    String.fromCharCode(64),
    // codevs
    String.fromCharCode(99, 111, 100, 101, 118, 115),
    // .
    String.fromCharCode(46),
    // ch
    String.fromCharCode(99, 104)
  ]

  // Build the email with some dynamic operations
  const email = parts.reduce((acc, part) => acc + part, '')

  // Split the email into multiple spans with HTML entities
  const obfuscatedEmail = email
    .split('')
    .map((char, index) => {
      const charCode = char.charCodeAt(0)
      return `<span class="email-part" data-index="${index}">&#${charCode};</span>`
    })
    .join('')

  return obfuscatedEmail
}

export default getObfuscatedEmail
