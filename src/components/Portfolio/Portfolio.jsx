import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ProjectCarousel } from './ProjectCarousel.jsx'
import { ContentGrid } from './ContentGrid.jsx'
import styles from './Portfolio.module.css'

export function Portfolio() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Hidden until FocusList's exit sequence clears and this section actually
  // scrolls into view, faded in there — and faded back out if the user
  // scrolls back away (either direction), matching FocusList's reveal/hide.
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion) {
      setVisible(true)
      return
    }

    gsap.set(el, { opacity: 0 })
    const obs = new IntersectionObserver(
      ([entry]) => {
        gsap.killTweensOf(el)
        if (entry.isIntersecting) {
          // 0.4s hold before fading in — and `visible` flips with it (not
          // immediately), so the scramble reveal starts once the section is
          // actually appearing, not ahead of anything being visible.
          gsap.to(el, { opacity: 1, duration: 0.4, delay: 0.4, ease: 'power1.out', onStart: () => setVisible(true) })
        } else {
          // Reset immediately on the way out (no delay) so scrolling back
          // in replays the scramble from scratch instead of staying "done".
          setVisible(false)
          gsap.to(el, { opacity: 0, duration: 0.4, ease: 'power1.in' })
        }
      },
      // Section is now several viewports tall (ProjectCarousel's scroll-scrub
      // track), so any nonzero threshold would basically never fire — fire
      // as soon as its top edge starts entering instead.
      //
      // rootMargin shrinks the effective viewport by 2px at the bottom:
      // FocusList's reverse lands scrollY exactly flush with this section's
      // top (by design), which floating-point rounding can read as "still
      // 0.0001% intersecting" forever — the fade-out edge never firing.
      // The 2px margin guarantees a real crossing to 0%.
      { threshold: 0, rootMargin: '0px 0px -2px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="portfolio" ref={sectionRef} className={styles.portfolio}>
      <ProjectCarousel active={visible} />
      <ContentGrid />
    </section>
  )
}
