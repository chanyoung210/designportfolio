import { useState } from 'react'
import { useScramble } from './useScramble.js'
import styles from './Hero.module.css'

function Scramble({ text, active, duration, onDone, className }) {
  const display = useScramble(text, { active, duration, onDone })
  return <span className={className}>{display}</span>
}

const TITLE_UNITS = ['PLAYING', 'WITH', 'THE', 'DESIGN']
const TAGLINE = '_Design, and Design Again'

export function Hero() {
  // 0..3 = TITLE_UNITS index in progress, 4 = tagline in progress, 5 = title block done
  const [titleStep, setTitleStep] = useState(0)

  const titleDone = titleStep >= TITLE_UNITS.length + 1

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.heroContent}>
        <img
          src="/hero/me.png"
          alt=""
          className={`${styles.photo} ${titleDone ? styles.fadeIn : ''}`}
        />
        <div className={styles.stack} lang="en">
          <div className={`${styles.icons} ${styles.fadeIn}`}>
            <img src="/hero/star.svg" alt="" className={styles.starRotated} width="24" height="24" />
            <img src="/hero/star.svg" alt="" width="24" height="24" />
          </div>
          {TITLE_UNITS.map((word, i) => (
            <Scramble
              key={word}
              text={word}
              active={titleStep === i}
              duration={200}
              onDone={() => setTitleStep(i + 1)}
              className={word === 'DESIGN' ? styles.design : styles.line}
            />
          ))}
          <div className={styles.tagline} style={{ opacity: titleStep >= TITLE_UNITS.length ? 1 : 0 }}>
            <Scramble
              text={TAGLINE}
              active={titleStep === TITLE_UNITS.length}
              duration={200}
              onDone={() => setTitleStep(TITLE_UNITS.length + 1)}
            />
            <img src="/hero/horse.png" alt="" width="24" height="24" />
          </div>
        </div>
      </div>
    </section>
  )
}
