import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScramble } from '../Hero/useScramble.js'
import { PROJECTS } from './projects.js'
import { ProjectModal } from './ProjectModal.jsx'
import styles from './ProjectCarousel.module.css'

const CARD_W = 365
const BASE_H = 487
const GAP = 8
const STEP = CARD_W + GAP
const CENTER_EXTRA_H = 87

function ScrambleText({ text, active, duration, className }) {
  const display = useScramble(text, { active, duration })
  return <span className={className}>{display}</span>
}

const TOP_RIGHT =
  'Anything beyond design fades next to user experience, because every design ultimately exists for people'
const BOTTOM_LEFT = 'AI is expanding what design can be. Great AX starts with the willingness to keep learning'
const BOTTOM_RIGHT = 'I think this... How about you?'

// Per-card look driven by distance from the (continuous) focus index: 0 =
// the active center card, 1 = an immediate dimmed neighbor, 2+ = a
// barely-there edge peek. Reused for both the resting position right after
// the intro reveal and every frame of the scroll-scrub, so there's no
// visual jump handing off from one to the other.
//
// Size (scale/height) only responds within distance 0–1 (main <-> its two
// immediate neighbors) — past that it's pinned at the neighbor's size.
// Letting it keep interpolating out to every peek card made the whole row
// subtly resize together as focusIndex moved, reading as a "ripple" rather
// than one card growing. Opacity keeps fading further out; that's just
// dimming, not motion, so it doesn't read the same way.
function applyDistanceLook(card, distance) {
  const opacity = Math.max(0.2, 1 - distance * 0.5)
  const sizeDistance = Math.min(distance, 1)
  const scale = 1 - sizeDistance * 0.08
  const extraH = (1 - sizeDistance) * CENTER_EXTRA_H
  gsap.set(card, { opacity, scale, height: BASE_H + extraH })
}

// Extra hold after Portfolio's own fade-in delay before the cards start
// rising — a beat *following* the section becoming visible, not part of it.
const ENTRANCE_EXTRA_DELAY = 200

export function ProjectCarousel({ active }) {
  const wrapRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const trackRef = useRef(null)
  const cardRefs = useRef([])
  const prepareAndPlayRef = useRef(null)
  const leaveRef = useRef(null)
  const scrollTriggerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    // This page reflows repeatedly after first paint (webfont swaps, late
    // project images) — ScrollTrigger's default 'resize' auto-refresh
    // treats each of those as a viewport resize and recalculates trigger
    // start/end, which can reposition an in-progress scrub. DOMContentLoaded
    // /load/visibilitychange are enough; drop 'resize' from the list.
    ScrollTrigger.config({ autoRefreshEvents: 'DOMContentLoaded,load,visibilitychange' })

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cards = cardRefs.current
    const track = trackRef.current

    const setTrackX = (focusIndex) => {
      gsap.set(track, { x: -(focusIndex * STEP + CARD_W / 2), y: '-50%' })
    }

    if (reducedMotion) {
      setTrackX(0)
      cards.forEach((card, i) => {
        gsap.set(card, { opacity: 1, y: 0, x: 0 })
        applyDistanceLook(card, i)
      })
      return
    }

    setTrackX(0)
    const clusterX = cards.map((_, i) => -(i * STEP))

    // Replays in full every time `active` flips back on (see the effect
    // below), same as the scramble text — so it kills whatever's still
    // running first and resets every card back to the hidden, clustered
    // starting point before playing again.
    const teardown = () => {
      scrollTriggerRef.current?.kill()
      scrollTriggerRef.current = null
      gsap.killTweensOf(cards)
    }

    prepareAndPlayRef.current = () => {
      teardown()

      // Two motions, not one: (1) rise — every card starts stacked at the
      // same spot 1000px below center (x pulled back to card 0's slot via
      // clusterX, so they're all sitting on top of each other) and only
      // card 0 is visible, so the pile reads as a single card rising; (2)
      // spread — the sub cards then slide out from that shared spot to
      // their own flex slot to the right, fading in to their dimmed
      // resting look.
      cards.forEach((card, i) => gsap.set(card, { x: clusterX[i], y: 1000, opacity: 0 }))

      const tl = gsap.timeline({
        onComplete: () => {
          scrollTriggerRef.current = ScrollTrigger.create({
            trigger: wrapRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            onUpdate: (self) => {
              const focusIndex = self.progress * (PROJECTS.length - 1)
              setTrackX(focusIndex)
              cards.forEach((card, i) => applyDistanceLook(card, Math.abs(i - focusIndex)))
            },
          })
        },
      })
      // 1. Rise, as one clustered card. Card 0 is the main/center card
      // from the moment it lands, so its height grows to main size in
      // the same motion — otherwise it'd sit at base size until the
      // scrub's first onUpdate, which only fires once the user actually
      // scrolls (exactly the "have to scroll to get main size" report).
      tl.to(cards[0], { y: 0, opacity: 1, height: BASE_H + CENTER_EXTRA_H, duration: 0.6, ease: 'power2.out' })
      tl.to(cards.slice(1), { y: 0, duration: 0.6, ease: 'power2.out' }, '<')
      // 2. Spread right, staggered, settling into the dimmed sub/peek
      // look — scale included here for the same reason as card 0's
      // height above, so nothing pops when the scrub takes over.
      tl.to(cards[1], { x: 0, opacity: 0.5, scale: 0.92, duration: 0.5, ease: 'power2.out' }, '+=0.05')
      tl.to(cards[2], { x: 0, opacity: 0.2, scale: 0.85, duration: 0.5, ease: 'power2.out' }, '-=0.35')
      tl.set(cards.slice(3), { x: 0 })
    }

    // Leaving the section: tear the scrub down and hide the cards right
    // away, instead of leaving the old trigger free to keep updating them
    // off-screen — otherwise re-entry finds them sitting at whatever
    // scroll-progress look they last had, then the entrance replay yanks
    // them back down to y:1000 and rises again, reading as a stutter.
    leaveRef.current = () => {
      teardown()
      gsap.set(cards, { opacity: 0 })
    }

    return () => {
      gsap.killTweensOf(cards)
      scrollTriggerRef.current?.kill()
    }
  }, [])

  useEffect(() => {
    if (!active) {
      leaveRef.current?.()
      return
    }
    const timer = setTimeout(() => prepareAndPlayRef.current?.(), ENTRANCE_EXTRA_DELAY)
    return () => clearTimeout(timer)
  }, [active])

  return (
    <div ref={wrapRef} id="portfolio-part1" className={styles.wrap}>
      <div className={styles.sticky}>
        <ScrambleText text="PORTFOLIO" active={active} duration={750} className={styles.title} />
        <ScrambleText text={TOP_RIGHT} active={active} duration={900} className={styles.topRight} />
        <ScrambleText text={BOTTOM_LEFT} active={active} duration={900} className={styles.bottomLeft} />
        <ScrambleText text={BOTTOM_RIGHT} active={active} duration={750} className={styles.bottomRight} />

        <div ref={trackRef} className={styles.track}>
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className={styles.card}
              onClick={() => setSelectedProject(project)}
            >
              <img src={project.image} alt="" className={styles.cardImage} />
              <div className={styles.cardOverlay} />
              <div className={styles.cardTitle}>{project.title}</div>
              <div className={styles.cardTags}>
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className={styles.cardSeeMore}>See more →</div>
            </div>
          ))}
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  )
}
