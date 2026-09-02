import { useEffect, useRef, useState } from 'react'
import { useScramble } from '../Hero/useScramble.js'
import styles from './About.module.css'

// Highlights a fixed character range (by index, not content) so the color
// stays correct even while `text` is still mid-scramble.
function ScrambleHighlight({ text, match, color, active, duration, onDone, className }) {
  const display = useScramble(text, { active, duration, onDone })
  const i = text.indexOf(match)
  if (i === -1) return <span className={className}>{display}</span>
  return (
    <span className={className}>
      {display.slice(0, i)}
      <span style={{ color }}>{display.slice(i, i + match.length)}</span>
      {display.slice(i + match.length)}
    </span>
  )
}

const INFO_COLUMNS = [
  {
    title: 'Profile',
    pairs: [
      { top: 'Name', topTier: 'sub', bottom: '안찬영', bottomTier: 'main' },
      { top: 'E-mail', topTier: 'sub', bottom: 'chanyoung210@gmail.com', bottomTier: 'main' },
    ],
  },
  {
    title: 'Works',
    pairs: [
      { top: '(주)지피티코리아', topTier: 'main', bottom: '2024. 07 ~ 2026. 05', bottomTier: 'sub' },
      { top: '제이엘투자그룹', topTier: 'main', bottom: '2022. 05 ~ 2023. 12', bottomTier: 'sub' },
    ],
  },
  {
    title: 'Education',
    pairs: [
      { top: '한양사이버대학교', topTier: 'main', bottom: '2027년도 졸업예정', bottomTier: 'sub' },
      { top: '[디지털디자인]웹 & 앱디자인', topTier: 'main', bottom: '2021. 09 ~ 2022. 03', bottomTier: 'sub' },
    ],
  },
]

const TITLE_LINES = [
  '안녕하세요. 디자인러너 안찬영입니다.',
  '디자인은 다양한 형태로 분류 되어있지만 궁극적으론',
  '사용자와 만나는 지점으로 하나의 흐름이된다고 생각합니다.',
]
const TITLE_HIGHLIGHT = '사용자와 만나는 지점'
const SUBTITLE = '이를 위해 학업을 병행하며 더 다각적인 시야를 넓히고 있으며 사용자 경험과 비즈니스의 가치를 고민하고 있습니다.'
const SUBTITLE_HIGHLIGHT = '사용자 경험과 비즈니스의 가치'

export function About() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  // 0..2 = TITLE_LINES index in progress, 3 = subtitle in progress, 4 = done
  const [step, setStep] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.heading}>
        <h2 className={styles.title}>
          {TITLE_LINES.map((line, i) =>
            i === TITLE_LINES.length - 1 ? (
              <ScrambleHighlight
                key={line}
                text={line}
                match={TITLE_HIGHLIGHT}
                color="#27aef3"
                active={visible && step === i}
                duration={200}
                onDone={() => setStep(i + 1)}
              />
            ) : (
              <ScrambleHighlight
                key={line}
                text={line}
                match=""
                color="#27aef3"
                active={visible && step === i}
                duration={200}
                onDone={() => setStep(i + 1)}
              />
            )
          )}
        </h2>
        <p className={styles.subtitle}>
          <ScrambleHighlight
            text={SUBTITLE}
            match={SUBTITLE_HIGHLIGHT}
            color="#ffffff"
            active={visible && step === TITLE_LINES.length}
            duration={250}
            onDone={() => setStep(TITLE_LINES.length + 1)}
          />
        </p>
      </div>

      <div className={styles.info}>
        {INFO_COLUMNS.map((col) => (
          <div key={col.title} className={styles.infoColumn}>
            <div className={styles.infoTitle}>{col.title}</div>
            <div className={styles.infoRow}>
              {col.pairs.map((pair) => (
                <div key={pair.top} className={styles.infoPair}>
                  <span className={styles[pair.topTier]}>{pair.top}</span>
                  <span className={styles[pair.bottomTier]}>{pair.bottom}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
