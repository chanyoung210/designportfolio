import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useScramble } from '../Hero/useScramble.js'
import styles from './FocusList.module.css'

const ITEMS = ['User Experience', 'User Information', 'Content Design', 'Vibe Web Publishing']
// hover preview per row, same order as ITEMS
const PREVIEWS = ['/ux.jpg', '/ui.png', '/content.png', '/publishing.PNG']
// Exit order: Vibe Web Publishing -> Content Design -> User Information -> User Experience
const EXIT_ORDER = [3, 2, 1, 0]
const ENTER_ORDER = [...EXIT_ORDER].reverse() // User Experience -> ... -> Vibe Web Publishing
const FORWARD_TRIGGER_ACCUM = 300
const OVERLAP = 0.15

function ScrambleLabel({ text, active, duration, onDone, className }) {
  const display = useScramble(text, { active, duration, onDone })
  return <span className={className}>{display}</span>
}

export function FocusList() {
  const containerRef = useRef(null)
  const rowRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [step, setStep] = useState(0)

  // Only the very first hover (nothing active yet) snaps the box open
  // instantly — every hover after that slides between stacked layers.
  const [instant, setInstant] = useState(false)
  // Track position to hold while the box is sliding out / hidden.
  const lastIndexRef = useRef(0)

  useEffect(() => {
    const el = containerRef.current
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

  // No ScrollTrigger pin here on purpose (see git history — it left stale
  // pin state behind after repeated cycles). Normal scrolling is untouched
  // until Vibe Web Publishing's row reaches the viewport bottom
  // ("boundary"). From there the page freezes — wheel/touch scroll is
  // consumed but never moves it — until the accumulated scroll reaches
  // FORWARD_TRIGGER_ACCUM px, at which point the rows exit and the page
  // eases down into Portfolio. Scrolling up from Portfolio's top edge
  // triggers the reverse immediately (no accumulation needed that way).
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let removeListeners = () => {}

    const ctx = gsap.context(() => {
      // 'idle' = above the boundary, scrolling normally. 'pinnedForward' =
      // frozen, accumulating scroll intent toward FORWARD_TRIGGER_ACCUM.
      // 'animating' = a timeline (+ landing scroll) is playing.
      // 'forwardDone' = rows gone, sitting in Portfolio — scrolling up from
      // here triggers the reverse immediately, no accumulation.
      // 'externalNav' = a nav-link click is smooth-scrolling the page
      // straight past this section; wheel/touch/scroll handling stands
      // down entirely until it lands (see onNavJump).
      let state = 'idle'
      let accum = 0
      // Scroll position the page must sit at while frozen (pinnedForward,
      // and the row-timeline portion of animating). null = free to scroll.
      // A 'scroll' listener re-asserts this every tick regardless of what
      // caused the drift, so it holds even when a browser refuses to honor
      // preventDefault on wheel events (notably momentum/inertial trackpad
      // scrolling on macOS, which can't be canceled at all).
      let lockedAt = null

      // Six @font-face families are in play (Pretendard, Hiikr, four Noto
      // Sans cuts) and keep reflowing the page for seconds after first
      // paint, shifting measureBoundary()/measurePortfolioTop() out from
      // under a spot we already settled at. Without this grace window,
      // onScroll's position checks below read that drift as "the user
      // scrolled past the line" and fire on their own — landing in
      // Portfolio would immediately, silently reverse with no input.
      const SETTLE_GRACE_MS = 1200
      let lastSettleAt = performance.now()
      const markSettled = () => {
        lastSettleAt = performance.now()
      }

      // Scroll position where the section's bottom is flush with the
      // viewport bottom. Measured fresh every call (not cached) because
      // late-loading webfonts/images can still reflow the page after mount.
      const measureBoundary = () => {
        const rect = containerRef.current.getBoundingClientRect()
        return rect.top + window.scrollY + rect.height - window.innerHeight
      }

      const measurePortfolioTop = () => document.getElementById('portfolio').getBoundingClientRect().top + window.scrollY

      const tweenScrollTo = (target, duration, onComplete) => {
        lockedAt = null // this scroll is ours to drive; don't fight it
        const proxy = { y: window.scrollY }
        gsap.to(proxy, {
          y: target,
          duration,
          ease: 'power1.inOut',
          onUpdate: () => window.scrollTo({ top: proxy.y, behavior: 'instant' }),
          onComplete,
        })
      }

      // Instant jump vs. one last eased hop: whatever tick crosses the
      // boundary lands mid-stride, up to a whole wheel/touch tick short of
      // it — teleporting the rest of the way there read as a hard cut.
      // Easing that last stretch over LANDING_DURATION instead keeps the
      // stop feeling like a deceleration, not a wall. lockedAt only turns
      // "on" once the hop finishes, so the safety net doesn't fight it.
      const LANDING_DURATION = 0.22
      const easeTo = (target, onComplete) => {
        tweenScrollTo(target, LANDING_DURATION, () => {
          lockedAt = target
          onComplete?.()
        })
      }

      const playForward = () => {
        state = 'animating'
        const tl = gsap.timeline({
          onComplete: () => {
            tweenScrollTo(measurePortfolioTop(), 0.5, () => {
              state = 'forwardDone'
              accum = 0
              markSettled()
            })
          },
        })
        EXIT_ORDER.forEach((idx, i) => {
          tl.to(rowRefs.current[idx], { xPercent: 10, duration: 0.12, ease: 'power1.in' }, i === 0 ? 0 : `-=${OVERLAP}`)
          tl.to(rowRefs.current[idx], { xPercent: -120, opacity: 0, duration: 0.2, ease: 'power1.in' })
        })
      }

      const playReverse = () => {
        state = 'animating'
        // Runs alongside the scroll-back tween, not after it: at the
        // moment this fires the viewport is still down at Portfolio, so
        // the rows are off-screen above it. Waiting for the row timeline
        // to finish before scrolling meant it played out entirely
        // off-screen — by the time the page scrolled back up to show
        // them, they'd already been sitting there fully visible the whole
        // time, no animation ever visible.
        tweenScrollTo(measureBoundary(), 0.5, () => {
          state = 'idle'
          accum = 0
          markSettled()
        })
        const tl = gsap.timeline()
        ENTER_ORDER.forEach((idx, i) => {
          const pos = i === 0 ? 0 : `-=${OVERLAP}`
          tl.to(rowRefs.current[idx], { xPercent: 10, opacity: 1, duration: 0.2, ease: 'power1.out' }, pos).to(
            rowRefs.current[idx],
            { xPercent: 0, duration: 0.12, ease: 'power1.out' }
          )
        })
      }

      // Handles one wheel/touch tick of `deltaY` (positive = scrolling
      // down). Returns true when the tick should be swallowed (page frozen).
      const consume = (deltaY) => {
        if (state === 'animating') return true
        if (state === 'externalNav') return false

        if (state === 'idle') {
          if (deltaY > 0 && window.scrollY + deltaY >= measureBoundary()) {
            state = 'pinnedForward'
            accum = 0
            easeTo(measureBoundary())
            return true
          }
          return false
        }

        if (state === 'pinnedForward') {
          accum += deltaY
          if (accum <= 0) {
            lockedAt = null
            state = 'idle'
            accum = 0
            markSettled()
            return false
          }
          if (accum >= FORWARD_TRIGGER_ACCUM) playForward()
          return true
        }

        // forwardDone
        if (deltaY < 0 && window.scrollY + deltaY <= measurePortfolioTop()) {
          easeTo(measurePortfolioTop(), playReverse)
          return true
        }
        return false
      }

      // Wheel deltaY isn't always pixels — some devices report it in
      // "lines" or "pages" (deltaMode). Left un-normalized, the pixel
      // prediction in `consume` undershoots badly on those devices.
      const normalizeDelta = (e) => {
        if (e.deltaMode === 1) return e.deltaY * 16
        if (e.deltaMode === 2) return e.deltaY * window.innerHeight
        return e.deltaY
      }

      // A fullscreen modal (see ProjectModal) sets this while open. Wheel/
      // touch events over the modal still bubble up to these window
      // listeners, and without this check this section's scroll-jacking
      // would read them as page scroll and drag the background section
      // back and forth underneath the modal.
      const isScrollLocked = () => document.documentElement.style.overflow === 'hidden'

      const onWheel = (e) => {
        if (isScrollLocked()) return
        if (consume(normalizeDelta(e))) e.preventDefault()
      }

      let touchY = 0
      const onTouchStart = (e) => {
        touchY = e.touches[0].clientY
      }
      const onTouchMove = (e) => {
        if (isScrollLocked()) return
        const y = e.touches[0].clientY
        const deltaY = touchY - y // swipe up = positive = scrolling down
        touchY = y
        if (consume(deltaY)) e.preventDefault()
      }

      const SCROLL_KEYS = new Set(['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '])
      const FROZEN_STATES = new Set(['pinnedForward', 'animating'])
      const onKeyDown = (e) => {
        if (isScrollLocked()) return
        if (FROZEN_STATES.has(state) && SCROLL_KEYS.has(e.key)) e.preventDefault()
      }

      // Safety net: catches crossings/drift that wheel/touch prevention
      // missed (unpreventable momentum scroll ticks, trackpad edge cases).
      // Runs the same idle/forwardDone transitions position-based, and
      // otherwise just re-snaps to lockedAt.
      //
      // Strict > / < (not >=/<=): landing tweens park scrollY exactly ON
      // boundary/portfolioTop, and their own final scrollTo still fires a
      // trailing 'scroll' event after state has already flipped. With an
      // inclusive comparison that trailing event re-reads as "already past
      // the line" and immediately re-triggers — e.g. arriving in Portfolio
      // would instantly bounce straight back with no actual scroll input.
      const onScroll = () => {
        if (isScrollLocked()) return
        const settledEnough = performance.now() - lastSettleAt > SETTLE_GRACE_MS
        if (settledEnough && state === 'idle' && window.scrollY > measureBoundary()) {
          state = 'pinnedForward'
          accum = 0
          easeTo(measureBoundary())
          return
        }
        if (settledEnough && state === 'forwardDone' && window.scrollY < measurePortfolioTop()) {
          easeTo(measurePortfolioTop(), playReverse)
          return
        }
        if (lockedAt !== null && window.scrollY !== lockedAt) {
          window.scrollTo({ top: lockedAt, behavior: 'instant' })
        }
      }

      // Nav dispatches this instead of letting its link's anchor jump run
      // natively — a native jump (even coordinated via an 'externalNav'
      // hand-off) races the browser's own smooth-scroll timing against our
      // state, and 'scrollend' firing before it's actually visually settled
      // was causing onScroll to see "still short of the target" and yank
      // into a full reverse mid-flight (repeatedly — a forward/reverse
      // ping-pong). Driving the scroll ourselves with the same tween we
      // already trust for landings sidesteps that race entirely: rows snap
      // instantly to whichever side of the boundary the target lands on,
      // and state only re-engages once our own tween's onComplete fires.
      const onNavJump = (e) => {
        const targetY = e.detail?.targetY
        if (targetY == null) return
        gsap.killTweensOf(rowRefs.current)
        accum = 0
        const landingForward = targetY >= measureBoundary()
        gsap.set(rowRefs.current, landingForward ? { xPercent: -120, opacity: 0 } : { xPercent: 0, opacity: 1 })
        state = 'externalNav'
        tweenScrollTo(targetY, 0.6, () => {
          // idle/forwardDone are free-scroll states — leave lockedAt null
          // (tweenScrollTo already cleared it) or every scroll attempt
          // after landing gets yanked straight back here forever.
          state = landingForward ? 'forwardDone' : 'idle'
          markSettled()
        })
      }

      window.addEventListener('wheel', onWheel, { passive: false })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: false })
      window.addEventListener('keydown', onKeyDown)
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('focuslist:nav-jump', onNavJump)

      removeListeners = () => {
        window.removeEventListener('wheel', onWheel)
        window.removeEventListener('touchstart', onTouchStart)
        window.removeEventListener('touchmove', onTouchMove)
        window.removeEventListener('keydown', onKeyDown)
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('focuslist:nav-jump', onNavJump)
      }
    })

    return () => {
      removeListeners()
      ctx.revert()
    }
  }, [])

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleRowEnter = (i) => {
    lastIndexRef.current = i
    if (activeIndex === null) {
      setInstant(true)
      setActiveIndex(i)
      setTimeout(() => setInstant(false), 50)
    } else {
      setActiveIndex(i)
    }
  }

  return (
    <section
      ref={containerRef}
      className={styles.section}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setActiveIndex(null)}
    >
      {ITEMS.map((item, i) => (
        <div
          key={item}
          ref={(el) => (rowRefs.current[i] = el)}
          className={`${styles.row} ${activeIndex === i ? styles.active : ''}`}
          onMouseEnter={() => handleRowEnter(i)}
        >
          <ScrambleLabel
            text={item}
            active={visible && step === i}
            duration={200}
            onDone={() => setStep(i + 1)}
            className={styles.label}
          />
        </div>
      ))}

      {/* All previews sit edge to edge on one track that moves as a single
          piece, so switching rows (even mid-slide) can never open a gap
          between two images. The outer `slide` handles entering/leaving the
          box; the track keeps its last position while hidden. */}
      <div className={styles.floatImage} style={{ left: pos.x, top: pos.y }}>
        <div
          className={styles.slide}
          style={{
            transform: `translateY(${activeIndex === null ? '100%' : '0%'})`,
            transitionDuration: instant ? '0ms' : '400ms',
          }}
        >
          <div
            className={styles.track}
            style={{
              transform: `translateY(${-(activeIndex ?? lastIndexRef.current) * 100}%)`,
              transitionDuration: instant ? '0ms' : '400ms',
            }}
          >
            {ITEMS.map((item, i) => (
              <img key={item} className={styles.layer} style={{ top: `${i * 100}%` }} src={PREVIEWS[i]} alt="" />

            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
