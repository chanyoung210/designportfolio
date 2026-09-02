import { useEffect, useRef, useState } from 'react'
import { useScramble } from '../Hero/useScramble.js'
import styles from './Review.module.css'

function Scramble({ text, active, duration, onDone, className }) {
  const display = useScramble(text, { active, duration, onDone })
  return <span className={className}>{display}</span>
}

// Placeholder copy — swap in the real quotes when they're ready.
const REVIEWS = [
  {
    quote:
      '바쁠 때마다 묵묵하게 팀을 서포트해주는 모습이 인상적이었어요. 콘텐츠 디자인 영역까지 늘 긍정적인 태도로 맡아주셔서, 팀 전체에 큰 힘이 되었습니다.',
    author: '디자인팀 팀장님',
  },
  {
    quote:
      '프로젝트 진행 중 예상치 못한 이슈가 생길 때마다 침착하게 문제를 해결해주셔서 정말 든든했어요. 함께 일하면서 신뢰가 컸던 동료입니다.',
    author: '디자인팀 팀원님',
  },
  {
    quote:
      '퍼블리싱에 대한 이해도가 높아서 소통이 정말 원활했습니다. 기획 정책이 바뀔 때마다 빠르게 대응하고, 변경 사항을 명확하게 설명해줘서 협업하기 편한 동료였어요.',
    author: '개발팀 팀원님',
  },
]

// Step order: 0 = title, then each row contributes three steps (index, quote, author).
const TOTAL_STEPS = 1 + REVIEWS.length * 3

export function Review() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
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

  const advance = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS))

  return (
    <section id="review" ref={sectionRef} className={styles.review}>
      <h2 className={styles.title}>
        <Scramble text="REVIEW" active={visible && step === 0} duration={200} onDone={advance} />
      </h2>
      <div className={styles.list}>
        {REVIEWS.map((r, i) => {
          const indexStep = 1 + i * 3
          const quoteStep = indexStep + 1
          const authorStep = quoteStep + 1
          return (
            <div key={r.author} className={styles.row}>
              <span className={styles.index}>
                <Scramble
                  text={String(i + 1).padStart(2, '0')}
                  active={step === indexStep}
                  duration={150}
                  onDone={advance}
                />
              </span>
              <div className={styles.body}>
                <p className={styles.quote}>
                  <Scramble text={`“${r.quote}”`} active={step === quoteStep} duration={250} onDone={advance} />
                </p>
                <p className={styles.author}>
                  <Scramble text={r.author} active={step === authorStep} duration={200} onDone={advance} />
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
