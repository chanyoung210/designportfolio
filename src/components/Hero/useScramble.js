import { useEffect, useRef, useState } from 'react'

const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const LOWER = 'abcdefghijklmnopqrstuvwxyz'
const DIGITS = '0123456789'

function randomGlitchChar(char) {
  if (char >= '0' && char <= '9') return DIGITS[Math.floor(Math.random() * DIGITS.length)]
  const isLower = char === char.toLowerCase() && char !== char.toUpperCase()
  const pool = isLower ? LOWER : UPPER
  return pool[Math.floor(Math.random() * pool.length)]
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Reveals `text` character-by-character in a scramble/glitch style, bounded
// to `duration` regardless of length (a single rAF loop drives the whole
// unit, not one timer per character) so long paragraphs don't balloon the
// total reveal time.
// A run of plain spaces collapses to zero rendered height in CSS, so the
// pre-reveal placeholder swaps in a non-breaking space instead — same
// visual blank, but it holds the line's real height from first paint
// instead of only gaining it once the reveal fills in real characters.
export function useScramble(text, { active, duration = 500, onDone } = {}) {
  const [display, setDisplay] = useState(reducedMotion ? text : text.replace(/\S/g, ' '))
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (!active) return
    if (reducedMotion) {
      setDisplay(text)
      onDoneRef.current?.()
      return
    }

    const chars = text.split('')
    const order = shuffle(chars.map((_, i) => i).filter((i) => chars[i] !== ' '))
    const n = order.length
    const state = chars.map((c) => (c === ' ' ? ' ' : ''))
    const start = performance.now()
    let raf

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration)
      const revealedCount = Math.floor(t * n)
      order.forEach((idx, i) => {
        state[idx] = i < revealedCount ? chars[idx] : randomGlitchChar(chars[idx])
      })
      setDisplay(state.join(''))
      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
        onDoneRef.current?.()
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, text, duration])

  return display
}
