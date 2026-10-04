import { useEffect, useState } from 'react'
import { useYouTubeBackground } from './useYouTubeBackground.js'
import styles from './Nav.module.css'

const LINKS = ['About', 'Portfolio', 'Goal']
const MUSIC_VIDEO_ID = 'K8wN9IK89vU'
const MUSIC_PLAYER_ID = 'yt-bg-player'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [dimmed, setDimmed] = useState(false)
  const [muted, setMuted] = useState(true)
  const [volume, setVolume] = useState(5)
  const playerRef = useYouTubeBackground(MUSIC_VIDEO_ID, MUSIC_PLAYER_ID, 5)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      // Portfolio's project carousel (part 1) is a single tall element —
      // dim the nav for as long as any of it is on screen, not just at
      // entry, since a scroll listener (unlike IntersectionObserver) can't
      // tell "still inside" from "never entered" on its own.
      const part1 = document.getElementById('portfolio-part1')
      if (part1) {
        const rect = part1.getBoundingClientRect()
        setDimmed(rect.top < window.innerHeight && rect.bottom > 0)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleMuted = () => {
    setMuted((m) => {
      const next = !m
      if (next) playerRef.current?.mute?.()
      else playerRef.current?.unMute?.()
      return next
    })
  }

  const handleVolumeChange = (e) => {
    const v = Number(e.target.value)
    setVolume(v)
    playerRef.current?.setVolume?.(v)
  }

  const iconUrl = muted ? '/volume-off.svg' : '/volume-on.svg'

  // FocusList scroll-jacks the region right before Portfolio, so letting
  // the browser's own anchor-jump/smooth-scroll run there races its timing
  // against FocusList's state and can leave the page ping-ponging between
  // sections. Instead, hand the target off to FocusList, which drives the
  // whole scroll itself with the same tween it already uses for landings.
  const handleNavClick = (id) => (e) => {
    const el = document.getElementById(id)
    if (!el) return
    e.preventDefault()
    const targetY = el.getBoundingClientRect().top + window.scrollY
    window.dispatchEvent(new CustomEvent('focuslist:nav-jump', { detail: { targetY } }))
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${dimmed ? styles.dimmed : ''}`}>
      <div id={MUSIC_PLAYER_ID} className={styles.hiddenPlayer} />
      <a href="#hero" className={styles.icons} aria-label="Hero 섹션으로 이동" onClick={handleNavClick('hero')}>
        <img src="/hero/star.svg" alt="" className={styles.starRotated} width="20" height="20" />
        <img src="/hero/star.svg" alt="" width="20" height="20" />
      </a>
      <ul className={styles.links}>
        {LINKS.map((label) => (
          <li key={label}>
            <a href={`#${label.toLowerCase()}`} onClick={handleNavClick(label.toLowerCase())}>
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className={styles.volumeControl}>
        <div className={styles.volumeSlider}>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="볼륨 조절"
          />
        </div>
        <button
          type="button"
          className={styles.volumeButton}
          onClick={toggleMuted}
          aria-label={muted ? '음소거 해제' : '음소거'}
        >
          <span
            className={styles.volumeIcon}
            style={{ maskImage: `url(${iconUrl})`, WebkitMaskImage: `url(${iconUrl})` }}
          />
        </button>
      </div>
    </nav>
  )
}
