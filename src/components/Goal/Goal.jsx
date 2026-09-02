import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Goal.module.css'

// Placeholder swatches stand in for the real per-segment preview photos —
// swap `color` for an `image` path once they're ready. `slot` positions each
// photo fully outside the headline's box (reference layout) so it never
// covers the text, and doesn't follow the cursor.
const SEGMENTS = {
  ablock: { words: ['A', 'BLOCK-SHAPED'], color: '#7dd3fc', slot: { top: -130, left: '8%', rotate: -8 } },
  designer: { words: ['DESIGNER'], color: '#a5b4fc', slot: { top: -130, right: -50, rotate: 7 } },
  across: { words: ['ACROSS', 'DESIGN,'], color: '#86efac', slot: { top: '38%', right: -120, rotate: 10 } },
  proto: { words: ['PROTOTYPING,'], color: '#fca5a5', slot: { bottom: -120, right: '12%', rotate: -6 } },
  deploy: { words: ['AND', 'DEPLOYMENT.'], color: '#fdba74', slot: { top: '48%', left: -120, rotate: -8 } },
}

const LINES = [
  ['ablock', 'designer'],
  ['across', 'proto'],
  ['deploy'],
]

const CAPTION = '경계를 넘나들며, 두루 해낼 수 있는 디자이너가 되고자 합니다.'

export function Goal() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const wordRefs = useRef([])
  const [hoverId, setHoverId] = useState(null)

  useEffect(() => {
    const words = wordRefs.current.filter(Boolean)
    if (!words.length) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      gsap.set(words, { color: '#ffffff' })
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    // Starts once the section's top edge reaches viewport center — later
    // than "top bottom" — so it's still close to the default gray right as
    // the section centers in view, not already most of the way to white.
    // Goal is the last section, so the page can never scroll the section's
    // bottom edge above the viewport's own bottom edge ("bottom 100%") —
    // any `end` past that (e.g. "bottom 85%", "bottom top") is unreachable
    // and the scrub stalls short of white forever. "bottom 102%" sits just
    // past that ceiling for rounding/reflow safety, so completion lands as
    // late as the scroll room actually allows.
    const tween = gsap.to(words, {
      color: '#ffffff',
      ease: 'none',
      stagger: 0.05,
      scrollTrigger: { trigger: sectionRef.current, start: 'top center', end: 'bottom 102%', scrub: 0.5 },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  let wordIndex = 0

  return (
    <section id="goal" ref={sectionRef} className={styles.goal}>
      <div className={styles.content}>
        <div className={styles.headline} ref={headlineRef} lang="en">
          {LINES.map((segmentIds, li) => (
            <div key={li} className={styles.line}>
              {segmentIds.map((id) => {
                const seg = SEGMENTS[id]
                return (
                  <span
                    key={id}
                    className={styles.group}
                    onMouseEnter={() => setHoverId(id)}
                    onMouseLeave={() => setHoverId((cur) => (cur === id ? null : cur))}
                  >
                    {seg.words.map((w, wi) => {
                      const idx = wordIndex++
                      return (
                        <span key={wi} className={styles.word} ref={(el) => (wordRefs.current[idx] = el)}>
                          {w}
                          {wi < seg.words.length - 1 ? ' ' : ''}
                        </span>
                      )
                    })}
                    {' '}
                  </span>
                )
              })}
            </div>
          ))}

          {Object.entries(SEGMENTS).map(([id, seg]) => (
            <div
              key={id}
              className={`${styles.photoSlot} ${hoverId === id ? styles.photoVisible : ''}`}
              style={{
                top: seg.slot.top,
                left: seg.slot.left,
                right: seg.slot.right,
                bottom: seg.slot.bottom,
                transform: `rotate(${seg.slot.rotate}deg)`,
                background: seg.color,
              }}
            />
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.dash} />
          <p className={styles.caption}>{CAPTION}</p>
        </div>
      </div>
    </section>
  )
}
