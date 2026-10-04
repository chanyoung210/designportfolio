import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Goal.module.css'

const LINES = [
  ['A', 'BLOCK-SHAPED', 'DESIGNER'],
  ['ACROSS', 'DESIGN,', 'PROTOTYPING,'],
  ['AND', 'DEPLOYMENT.'],
]

const CAPTION = '경계를 넘나들며, 두루 해낼 수 있는 디자이너가 되고자 합니다.'

const TESTIMONIALS = [
  {
    quote: '항상 긍정적인 태도와 열정으로 맡은 역할을 해내고, 묵묵히 팀을 서포트해주셔서 고마웠어요.',
    by: '디자인팀 팀장님',
  },
  {
    quote: '예상치 못한 이슈가 생길 때마다 침착하게 해결해주셔서 든든했어요. 늘 믿고 의지할 수 있는 동료가 되어주셔서 감사해요!',
    by: '디자인팀 팀원님',
  },
  {
    quote: '퍼블리싱 이해도가 높아 소통이 원활했어요. 기획 변경에도 빠르게 대응하고 변경 사항을 명확히 설명해주셔서 협업하기 편했습니다.',
    by: '개발팀 팀원님',
  },
]

export function Goal() {
  const sectionRef = useRef(null)
  const wordRefs = useRef([])

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
        <div className={styles.headline} lang="en">
          {LINES.map((words, li) => (
            <div key={li} className={styles.line}>
              {words.map((w, wi) => {
                const idx = wordIndex++
                return (
                  <span key={wi} className={styles.word} ref={(el) => (wordRefs.current[idx] = el)}>
                    {w}
                    {wi < words.length - 1 ? ' ' : ''}
                  </span>
                )
              })}
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <span className={styles.dash} />
          <p className={styles.caption}>{CAPTION}</p>
        </div>

        <ul className={styles.testimonials}>
          {TESTIMONIALS.map((t) => (
            <li key={t.by}>
              {t.quote} <span>- {t.by} -</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
