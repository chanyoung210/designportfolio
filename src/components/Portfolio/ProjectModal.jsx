import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ProjectCaseStudy } from './ProjectCaseStudy.jsx'
import styles from './ProjectModal.module.css'

// Two-stage entrance: the #020202 backdrop rises first (bottom:-1200px ->
// top:0, done as a translateY so it's one GPU-friendly transform), then the
// modal panel rises in behind it. Reverses on close so the panel drops out
// before the backdrop retreats back down.
export function ProjectModal({ project, onClose, onSelectProject }) {
  const backdropRef = useRef(null)
  const panelRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)
  const [rendered, setRendered] = useState(false)

  // Layout effects, not regular effects: both run synchronously before the
  // browser paints, so the backdrop/panel are already moved off-screen by
  // the time anything is shown — a regular effect leaves a one-frame gap
  // where React has already committed the overlay at rest (fully covering
  // the screen, untransformed) before GSAP gets to hide it, which flashes
  // as a jump/flicker right as the modal opens.
  useLayoutEffect(() => {
    if (project) {
      setActiveProject(project)
      setRendered(true)
    }
  }, [project])

  useLayoutEffect(() => {
    if (!rendered) return
    const backdrop = backdropRef.current
    const panel = panelRef.current
    if (project) {
      // Locking overflow removes the scrollbar, which shrinks the page by
      // its width and shifts everything sideways — pad that width back in
      // so locking the scroll doesn't itself cause a visible jump.
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.documentElement.style.overflow = 'hidden'
      document.body.style.overflow = 'hidden'
      if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    } else {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }

    if (project) {
      gsap.set(backdrop, { y: 1200 })
      gsap.set(panel, { y: 80, opacity: 0 })
      // power2.out front-loads almost all of the motion into the first
      // ~150ms (fast start, long barely-visible tail), so a full-viewport
      // wipe on it reads as an instant cut rather than a rise. inOut eases
      // into the motion first, which is what actually looks like something
      // rising up rather than snapping into place.
      gsap
        .timeline()
        .to(backdrop, { y: 0, duration: 0.8, ease: 'power2.inOut' })
        .to(panel, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.15')
    } else {
      gsap
        .timeline({ onComplete: () => setRendered(false) })
        .to(panel, { y: 80, opacity: 0, duration: 0.3, ease: 'power2.in' })
        .to(backdrop, { y: 1200, duration: 0.4, ease: 'power2.in' })
    }
  }, [project, rendered])

  useEffect(
    () => () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    },
    []
  )

  if (!rendered) return null

  return (
    <div className={styles.overlay}>
      <div ref={backdropRef} className={styles.backdrop} />
      <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
          <path d="M1 1L8 8L15 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div ref={panelRef} className={styles.panel}>
        {activeProject?.caseStudy ? (
          <ProjectCaseStudy project={activeProject} onSelectProject={onSelectProject} />
        ) : (
          <h2 className={styles.title}>{activeProject?.title}</h2>
        )}
      </div>
    </div>
  )
}
