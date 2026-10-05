import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ContentGrid.module.css'

// Real w/h per file (public/portfolio/content) — the single source of
// truth for both the row-height math below and each item's aspect-ratio,
// so images are never cropped/stretched off their saved proportions.
const IMAGES = {
  '01': { w: 874, h: 462 },
  '02': { w: 430, h: 462 },
  '03': { w: 430, h: 600 },
  '04': { w: 430, h: 600 },
  '05': { w: 430, h: 600 },
  '06': { w: 430, h: 600 },
  '07': { w: 874, h: 600 },
  '08': { w: 430, h: 429 },
  '09': { w: 430, h: 429 },
  '10': { w: 430, h: 429 },
}

// Row groups match the reference layout: 2 items, 3, 2, 3.
const ROW_GROUPS = [
  ['01', '02'],
  ['03', '04', '05'],
  ['06', '07'],
  ['08', '09', '10'],
]

const GRID_PADDING_X = 200 // .grid's left+right padding
const GAP = 8

// Justified-row math: pick the one row height where each item's width
// (height * its own aspect ratio) sums exactly to the available row
// width — so every image keeps its saved ratio uncropped, edge to edge,
// instead of forcing a uniform crop height per row.
function rowHeight(ids) {
  const ratioSum = ids.reduce((sum, id) => sum + IMAGES[id].w / IMAGES[id].h, 0)
  const gaps = (ids.length - 1) * GAP
  return `calc((min(100vw, 1480px) - ${GRID_PADDING_X + gaps}px) / ${ratioSum})`
}

export function ContentGrid() {
  const wrapRef = useRef(null)
  const titleRef = useRef(null)

  // Title rises from below with opacity 0→1 as the section scrolls in,
  // finishing exactly as it reaches the sticky-pinned top (see
  // .titleSticky's top:0) so the motion hands off into the pin seamlessly.
  useEffect(() => {
    const wrap = wrapRef.current
    const title = titleRef.current
    if (!wrap || !title) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      gsap.set(title, { opacity: 1, y: 0 })
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const tweenIn = gsap.fromTo(
      title,
      { opacity: 0, y: 240 },
      {
        opacity: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'top 300%', end: 'top top', scrub: 0.6 },
      }
    )
    // Fade the title fully out as Review scrolls in, finishing well
    // before the sticky pin itself releases (see .grid's padding-bottom).
    const tweenOut = gsap.fromTo(
      title,
      { opacity: 1 },
      {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: wrap, start: 'bottom 90%', end: '+=400', scrub: 0.6 },
      }
    )
    return () => {
      tweenIn.scrollTrigger?.kill()
      tweenIn.kill()
      tweenOut.scrollTrigger?.kill()
      tweenOut.kill()
    }
  }, [])

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <div className={styles.titleSticky}>
        <span ref={titleRef}>AI CREATIVE</span>
      </div>
      <div className={styles.grid}>
        {ROW_GROUPS.map((ids) => (
          <div key={ids.join('')} className={styles.row} style={{ height: rowHeight(ids) }}>
            {ids.map((id) => (
              <div key={id} className={styles.item} style={{ aspectRatio: `${IMAGES[id].w} / ${IMAGES[id].h}` }}>
                <img src={`portfolio/content/img_content_${id}.png`} alt="" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
