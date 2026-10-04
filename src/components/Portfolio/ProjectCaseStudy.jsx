import { Fragment, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ProjectCaseStudy.module.css'

// Hands-off looping carousel: advances one card every `interval` ms and grows
// the centered card. The list is tripled so the track can keep moving right;
// once it reaches the third copy it snaps back to the matching card in the
// middle copy with the transition switched off, so the loop looks seamless.
const CAROUSEL_W = 383
const CAROUSEL_GAP = 16
const CAROUSEL_ACTIVE_W = 479 // 383 * 1.25

function AutoCarousel({ images, interval = 2500 }) {
  const n = images.length
  const [index, setIndex] = useState(n)
  const [animate, setAnimate] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => {
      setAnimate(true)
      setIndex((i) => i + 1)
    }, interval)
    return () => clearInterval(id)
  }, [interval])

  const handleTransitionEnd = (e) => {
    if (e.target !== e.currentTarget || index < 2 * n) return
    setAnimate(false)
    setIndex(n + ((index - n) % n)) // modulo, in case ticks piled up while the tab was hidden
  }

  const offset = index * (CAROUSEL_W + CAROUSEL_GAP) + CAROUSEL_ACTIVE_W / 2

  return (
    <div className={styles.carousel} aria-hidden="true">
      <div
        className={styles.carouselTrack}
        style={{ transform: `translateX(-${offset}px)`, transition: animate ? undefined : 'none' }}
        onTransitionEnd={handleTransitionEnd}
      >
        {[...images, ...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={i === index ? styles.carouselActive : undefined}
            style={animate ? undefined : { transition: 'none' }}
          />
        ))}
      </div>
    </div>
  )
}

// Shrinks the current icon to 0, swaps the src while it's invisible, grows the
// next one back to 1 — on a loop. The SVGs keep their own canvas sizes (160–204)
// so they stay proportional to each other; `scale` blows the 180 canvas up to ~240.
const ICON_SWAP_SCALE = 240 / 180

function IconSwap({ icons, interval = 2200 }) {
  const [index, setIndex] = useState(0)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    icons.forEach((src) => {
      new Image().src = src // warm the cache so the swap never flashes blank
    })
    let swapTimer
    const id = setInterval(() => {
      setShown(false)
      swapTimer = setTimeout(() => {
        setIndex((i) => (i + 1) % icons.length)
        setShown(true)
      }, 350) // matches the shrink transition in .iconSwap
    }, interval)
    return () => {
      clearInterval(id)
      clearTimeout(swapTimer)
    }
  }, [icons, interval])

  return (
    <img
      className={styles.iconSwap}
      src={icons[index]}
      alt=""
      style={{ transform: `scale(${shown ? ICON_SWAP_SCALE : 0})` }}
    />
  )
}

// Sample bar chart that morphs between a few datasets; the tallest bar is the
// blue accent, the rest stay grey.
function ChartSwap({ charts, interval = 3000 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % charts.length), interval)
    return () => clearInterval(id)
  }, [charts, interval])

  const chart = charts[index]
  const max = Math.max(...chart.values)

  return (
    <div className={styles.chartSwap}>
      <p className={styles.chartTitle}>{chart.title}</p>
      <p className={styles.chartValue}>{chart.total}</p>
      <div className={styles.chartBars}>
        {chart.values.map((v, i) => (
          <div key={i} className={styles.chartBarCol}>
            <span
              className={v === max ? styles.chartBarAccent : undefined}
              style={{ height: `${(v / max) * 100}%` }}
            />
            <em>{chart.labels[i]}</em>
          </div>
        ))}
      </div>
    </div>
  )
}

// Text-free infographic cards in the ChartSwap palette: blue (#2A76F2) is the
// highlight, everything else is black (#222222) or grey.
const INFO_COLORS = ['#2a76f2', '#222222', '#b8bec6']

// smooth line through the points: each segment is a cubic with horizontal tangents
function smoothPath(pts) {
  return pts.reduce((d, [x, y], i) => {
    if (i === 0) return `M${x},${y}`
    const [px, py] = pts[i - 1]
    const mx = (px + x) / 2
    return `${d} C${mx},${py} ${mx},${y} ${x},${y}`
  }, '')
}

function InfoChart({ chart }) {
  if (chart.type === 'bar') {
    const max = Math.max(...chart.values)
    return (
      <div className={styles.chartBars}>
        {chart.values.map((v, i) => (
          <div key={i} className={styles.chartBarCol}>
            <span className={v === max ? styles.chartBarAccent : undefined} style={{ height: `${(v / max) * 100}%` }} />
          </div>
        ))}
      </div>
    )
  }

  if (chart.type === 'rings') {
    // concentric progress rings, outermost first
    return (
      <svg className={styles.infoSvg} viewBox="0 0 120 120">
        {chart.values.map((v, i) => {
          const r = 50 - i * 15
          return (
            <g key={i} transform="rotate(-90 60 60)">
              <circle cx="60" cy="60" r={r} fill="none" stroke="#d5d8db" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke={INFO_COLORS[i]}
                strokeWidth="10"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray={`${v} 100`}
              />
            </g>
          )
        })}
      </svg>
    )
  }

  if (chart.type === 'area') {
    const W = 300
    const H = 220
    const toPts = (values) =>
      values.map((v, i) => [(i / (values.length - 1)) * W, H - (v / 100) * H])
    const main = toPts(chart.values)
    const compare = toPts(chart.compare)
    const peak = main.reduce((a, b) => (b[1] < a[1] ? b : a))
    return (
      <svg className={styles.infoSvg} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="infoAreaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a76f2" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#2a76f2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${smoothPath(main)} L${W},${H} L0,${H} Z`} fill="url(#infoAreaFill)" />
        <path d={smoothPath(compare)} fill="none" stroke="#b8bec6" strokeWidth="3" strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
        <path d={smoothPath(main)} fill="none" stroke="#2a76f2" strokeWidth="4" vectorEffect="non-scaling-stroke" />
        <line x1={peak[0]} x2={peak[0]} y1={peak[1]} y2={H} stroke="#222222" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
    )
  }

  if (chart.type === 'waffle') {
    // 10 x 10 grid: first `accent` cells blue, next `dark` black, rest grey
    return (
      <div className={styles.infoWaffle}>
        {Array.from({ length: 100 }, (_, i) => (
          <i
            key={i}
            style={{
              background:
                i < chart.accent ? INFO_COLORS[0] : i < chart.accent + chart.dark ? INFO_COLORS[1] : '#d5d8db',
            }}
          />
        ))}
      </div>
    )
  }

  return null
}

// Renders the reference case-study layout (hero -> intro -> gallery ->
// before/after comparisons -> design system) from a project's `caseStudy`
// data. Only KICC has that data filled in right now — this is the reusable
// frame the next projects will plug into.
export function ProjectCaseStudy({ project, scrollerRef }) {
  const cs = project.caseStudy
  const [activeLang, setActiveLang] = useState(0)

  // Individual items (a title, a body, a card, a phone mockup...) register
  // themselves here via `ref={registerSection}` so one effect can wire up the
  // same scroll-in reveal for all of them, instead of repeating a ScrollTrigger
  // per item. Phones/chips that already carry their own rotate/scale transform
  // are wrapped in a plain positioning div so this reveal's own `y` transform
  // doesn't clobber it.
  const sectionRefs = useRef([])
  sectionRefs.current = []
  const registerSection = (el) => {
    if (el) sectionRefs.current.push(el)
  }
  const wrapRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const sections = sectionRefs.current
    const scroller = scrollerRef?.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // cs.revealPaused: set while a case study is still being built
    if (reducedMotion || cs.revealPaused) {
      gsap.set(sections, { opacity: 1, y: 0 })
      return
    }

    // data-reveal="fade" skips the y offset (keeps a fixed gap above it visually stable);
    // data-reveal="scale" grows the element from 0 instead of sliding it up;
    // data-reveal-start overrides when the reveal fires.
    gsap.set(sections, {
      opacity: 0,
      y: (i, el) => (el.dataset.reveal ? 0 : 100),
      scale: (i, el) => (el.dataset.reveal === 'scale' ? 0 : 1),
    })

    const tweens = sections.map((section) =>
      gsap.to(section, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          scroller,
          start: section.dataset.revealStart || 'top 85%',
          once: true,
        },
      })
    )

    // Images/video are still loading when this first measurement happens, so
    // the panel's real scroll height keeps growing after each trigger's start
    // point is calculated. Refresh whenever that content grows so every
    // trigger's position tracks where the section actually ends up.
    let resizeObserver
    if (wrapRef.current) {
      resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh())
      resizeObserver.observe(wrapRef.current)
    }

    return () => {
      resizeObserver?.disconnect()
      tweens.forEach((tw) => tw.scrollTrigger?.kill())
      gsap.killTweensOf(sections)
    }
  }, [cs, scrollerRef])

  const heroBar = cs.heroBar && (
    <div className={styles.heroBar}>
      <div>
        <h2 className={styles.heroBarTitle} style={{ color: cs.heroBar.titleColor }}>{cs.heroBar.title}</h2>
        <p className={styles.heroBarSubtitle} style={{ color: cs.heroBar.titleColor }}>{cs.heroBar.subtitle}</p>
      </div>
      <p className={styles.heroBarSide} style={cs.heroBar.sideColor ? { color: cs.heroBar.sideColor } : undefined}>
        {cs.heroBar.side.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </p>
    </div>
  )

  return (
    <Fragment>
      {!cs.heroImage ? null : cs.heroStacked ? (
        <div className={styles.heroStacked}>
          {heroBar}
          <img src={cs.heroImage} alt="" />
        </div>
      ) : (
        <div className={styles.hero}>
          <img src={cs.heroImage} alt="" />
          {heroBar}
          <div className={styles.scrollCue} aria-hidden="true">
            <span className={styles.scrollMouse}>
              <span className={styles.scrollWheel} />
            </span>
          </div>
        </div>
      )}

      <div className={styles.wrap} ref={wrapRef}>
      {/* text-only opener + stacked full-width images (no hero) */}
      {cs.promo && (
        <div className={styles.promo}>
          <div className={styles.promoHead}>
            <h2 className={styles.promoTitle} ref={registerSection}>{cs.promo.title}</h2>
            <p className={styles.promoBody} ref={registerSection}>{cs.promo.body}</p>
            <div className={styles.promoMeta} ref={registerSection}>
              {cs.promo.meta.map((m) => (
                <div key={m.label}>
                  <span>{m.label}</span>
                  <span>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
          {cs.promo.images.map((src) => (
            <img key={src} className={styles.promoImage} src={src} alt="" loading="lazy" ref={registerSection} />
          ))}
        </div>
      )}

      {cs.background && (
        <div
          className={
            cs.background.split
              ? styles.backgroundSplit
              : cs.background.center
                ? styles.backgroundCenter
                : styles.background
          }
          style={{ maxWidth: cs.background.maxWidth }}
        >
          <h3 className={styles.sectionTitle} ref={registerSection}>{cs.background.title}</h3>
          <div className={styles.backgroundContent}>
          <p className={styles.backgroundBody} ref={registerSection}>{cs.background.body}</p>
          <div className={styles.backgroundMeta}>
            {cs.background.meta.map((m) => (
              <div key={m.label} className={styles.backgroundMetaItem} ref={registerSection}>
                <span className={styles.backgroundMetaLabel}>{m.label}</span>
                <span className={styles.backgroundMetaValue}>{m.value}</span>
              </div>
            ))}
          </div>
          </div>
        </div>
      )}

      {cs.videoStage && (
        <div className={styles.videoStage} style={{ backgroundImage: `url(${cs.videoStage.background})` }}>
          <video src={cs.videoStage.video} autoPlay loop muted playsInline ref={registerSection} />
        </div>
      )}

      {cs.problem && (
        <div className={styles.problem} style={{ backgroundImage: `url(${cs.problem.background})` }}>
          <p className={styles.problemLabel} ref={registerSection}>{cs.problem.label}</p>
          <h3 className={styles.problemTitle} ref={registerSection}>{cs.problem.title}</h3>
          <p className={styles.problemBody} ref={registerSection}>{cs.problem.body}</p>
          <img src={cs.problem.image} alt="" loading="lazy" ref={registerSection} />
        </div>
      )}

      {cs.stakeholder && (
        <div className={styles.stakeholder}>
          <p className={styles.stakeholderLabel} ref={registerSection}>{cs.stakeholder.label}</p>
          <h3 className={styles.stakeholderTitle} ref={registerSection}>{cs.stakeholder.title}</h3>
          <p className={styles.stakeholderBody} ref={registerSection}>{cs.stakeholder.body}</p>
          <div className={styles.stakeholderCards}>
            {[cs.stakeholder.items.slice(0, 3), cs.stakeholder.items.slice(3)].map((col, i) => (
              <div key={i} className={styles.stakeholderCol}>
                {col.map((item) => (
                  <div key={item.label} className={styles.stakeholderCard} ref={registerSection}>
                    <span>{item.label}</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {cs.audience && (
        <div className={styles.audience}>
          <div className={styles.audienceHead}>
            <p className={styles.stakeholderLabel} ref={registerSection}>{cs.audience.label}</p>
            <h3 className={styles.stakeholderTitle} ref={registerSection}>{cs.audience.title}</h3>
            <p className={styles.stakeholderBody} ref={registerSection}>{cs.audience.body}</p>
          </div>
          <div className={styles.audienceCards}>
            {cs.audience.items.map((item) => (
              <div
                key={item.title}
                className={styles.audienceCard}
                style={{ backgroundImage: `url(${item.image})` }}
                ref={registerSection}
              >
                <h4>{item.title}</h4>
                <p>
                  <strong>{item.lead}</strong>
                  {'\n'}
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {cs.direction && (
        <div className={styles.direction}>
          <div className={styles.directionInner}>
            <div className={styles.directionHead}>
              <p className={styles.problemLabel} ref={registerSection}>{cs.direction.label}</p>
              <h3 className={styles.problemTitle} ref={registerSection}>{cs.direction.title}</h3>
              <p className={styles.directionBody} ref={registerSection}>{cs.direction.body}</p>
            </div>
            <div className={styles.directionCards}>
              {[0, 1, 2].map((col) => (
                <div key={col} className={styles.directionCol}>
                  {cs.direction.items
                    .filter((item) => item.col === col)
                    .map((item) => (
                      <div key={item.title} className={styles.directionCard} ref={registerSection} data-reveal="scale">
                        <h4>{item.title}</h4>
                        <div>
                          <h5>{item.heading}</h5>
                          <p>{item.body}</p>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
          {cs.direction.concept && (
            <>
              <div className={styles.directionConcept} ref={registerSection}>
                <img src={cs.direction.concept.image} alt="" loading="lazy" />
                <div className={styles.directionConceptText}>
                  <p>{cs.direction.concept.label}</p>
                  <h4>{cs.direction.concept.title}</h4>
                </div>
              </div>
              <img
                className={styles.directionPhones}
                src={cs.direction.concept.phones}
                alt=""
                loading="lazy"
                ref={registerSection}
              />
            </>
          )}
          {cs.direction.diagram && (
            <div className={styles.diagram} ref={registerSection}>
              <div className={styles.diagramRow}>
                <strong className={styles.diagramEnd}>{cs.direction.diagram.from}</strong>
                <span className={styles.diagramLink} aria-hidden="true" />
                <div className={styles.diagramCircles}>
                  {cs.direction.diagram.circles.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
                <span className={`${styles.diagramLink} ${styles.diagramLinkRight}`} aria-hidden="true" />
                <strong className={styles.diagramEnd}>{cs.direction.diagram.to}</strong>
              </div>
              <p className={styles.diagramBody}>{cs.direction.diagram.body}</p>
            </div>
          )}
        </div>
      )}

      {cs.define && (
        <div className={styles.define}>
          <p className={styles.problemLabel} ref={registerSection}>{cs.define.label}</p>
          <h3 className={styles.defineTitle} ref={registerSection}>{cs.define.title}</h3>
          {cs.define.problems.map((p) => (
            <div key={p.label} className={styles.defineProblem}>
              <div className={styles.defineRow}>
                <h4 ref={registerSection}>{p.label}</h4>
                <div ref={registerSection}>
                  <h5>{p.heading}</h5>
                  <p>{p.body}</p>
                </div>
              </div>
              {p.panel && (
                <div className={styles.definePanel} ref={registerSection}>
                  <img src={p.panel} alt="" loading="lazy" />
                </div>
              )}
              {p.cards && (
                <div className={styles.defineCards}>
                  {p.cards.map((c) => (
                    <div key={c.text} className={styles.defineCard} ref={registerSection}>
                      <p>{c.text}</p>
                      <img src={c.image} alt="" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {cs.system && (
        <div className={styles.system}>
          <div className={styles.systemHead}>
            <div>
              <p className={styles.stakeholderLabel} ref={registerSection}>{cs.system.label}</p>
              <h3 className={styles.systemTitle} ref={registerSection}>{cs.system.title}</h3>
            </div>
            <img src={cs.system.image} alt="" loading="lazy" ref={registerSection} />
          </div>
          <div className={styles.systemIntro} ref={registerSection}>
            <h4>{cs.system.heading}</h4>
            <p>{cs.system.body}</p>
          </div>
          <div className={styles.systemGrid}>
            <div className={`${styles.systemCard} ${styles.systemLogo}`} ref={registerSection}>
              <span className={styles.systemCardLabel}>Logo</span>
              {/* original-color logo, with a #111111 copy (same SVG used as a mask) cross-fading over it */}
              <div className={styles.logoSwap}>
                <img src={cs.system.logo} alt="almond" loading="lazy" />
                <span
                  className={styles.logoMono}
                  style={{ maskImage: `url(${cs.system.logo})`, WebkitMaskImage: `url(${cs.system.logo})` }}
                />
              </div>
            </div>
            <div className={`${styles.systemCard} ${styles.systemColor}`} ref={registerSection}>
              <span className={styles.systemCardLabel}>Color</span>
              <div className={styles.systemSwatches}>
                {cs.system.colors.map((c) => (
                  <span key={c} style={{ background: c, color: c.toLowerCase() === '#ffffff' ? '#222222' : '#ffffff' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className={`${styles.systemCard} ${styles.systemIcon}`} ref={registerSection}>
              <span className={styles.systemCardLabel}>Icon</span>
              <IconSwap icons={cs.system.icons} />
            </div>
            <div className={`${styles.systemCard} ${styles.systemCharts}`} ref={registerSection}>
              <span className={styles.systemCardLabel}>Charts</span>
              <ChartSwap charts={cs.system.charts} />
            </div>
            <div className={`${styles.systemCard} ${styles.systemType}`} ref={registerSection}>
              <span className={styles.systemCardLabel}>Typography</span>
              <p className={styles.typeSample}>
                Pretendard
                <br />
                프리텐다드
              </p>
            </div>
            <div className={`${styles.systemCard} ${styles.systemVars}`} ref={registerSection}>
              <span className={styles.systemCardLabel}>Variables &amp; Components</span>
              <img className={styles.systemTable} src={cs.system.table} alt="" loading="lazy" />
              <img className={styles.systemButtons} src={cs.system.buttons} alt="" loading="lazy" />
            </div>
          </div>
          {cs.system.iconography && (
            <>
              <div className={styles.systemRow} ref={registerSection}>
                <h4>{cs.system.iconography.title}</h4>
                <p>{cs.system.iconography.body}</p>
              </div>
              <div className={styles.iconGrid}>
                {cs.system.iconography.icons.map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" ref={registerSection} />
                ))}
              </div>
            </>
          )}
          {cs.system.infographic && (
            <>
              <div className={styles.systemRow} ref={registerSection}>
                <h4>{cs.system.infographic.title}</h4>
                <p>{cs.system.infographic.body}</p>
              </div>
              <div className={styles.infoGrid}>
                {cs.system.infographic.charts.map((chart) => (
                  <div key={chart.type} className={styles.infoCard} ref={registerSection}>
                    <InfoChart chart={chart} />
                  </div>
                ))}
              </div>
            </>
          )}
          {cs.system.structure && (
            <>
              <div className={`${styles.systemIntro} ${styles.systemIntroSpaced}`} ref={registerSection}>
                <h4>{cs.system.structure.heading}</h4>
                <p>{cs.system.structure.body}</p>
              </div>
              <figure className={styles.systemFigure} ref={registerSection}>
                <img src={cs.system.structure.image} alt="" loading="lazy" />
                <figcaption>{cs.system.structure.caption}</figcaption>
              </figure>
            </>
          )}
          {cs.system.compare?.map((c) => (
            <Fragment key={c.title}>
              <div className={styles.systemRow} ref={registerSection}>
                <h4>{c.title}</h4>
                <p>{c.body}</p>
              </div>
              <div className={styles.compareGrid}>
                <div
                  className={`${styles.compareCard} ${styles.compareLayers}`}
                  style={{ background: c.background }}
                  ref={registerSection}
                >
                  <img src={c.layers} alt="" loading="lazy" />
                </div>
                <div className={styles.compareCard} style={{ background: c.background }} ref={registerSection}>
                  <img src={c.screen} alt="" loading="lazy" />
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}

      {cs.screens && (
        <div className={styles.screens}>
          <div className={styles.screensHead}>
            <p className={styles.stakeholderLabel} ref={registerSection}>{cs.screens.label}</p>
            <h3 className={styles.systemTitle} ref={registerSection}>{cs.screens.title}</h3>
          </div>
          {cs.screens.groups.map((group) => (
            <div key={group.label} className={styles.screensGroup}>
              <div className={styles.screensIntro} ref={registerSection}>
                <p className={styles.stakeholderLabel}>{group.label}</p>
                <p>{group.body}</p>
              </div>
              <img className={styles.screensPhoto} src={group.photo} alt="" loading="lazy" ref={registerSection} />
              <div className={`${styles.screensCards} ${group.theme === 'light' ? styles.screensCardsLight : ''}`}>
                {group.cards.map((card) => (
                  <div
                    key={card.label}
                    className={`${styles.screensCard} ${card.wide ? styles.screensCardWide : ''} ${
                      card.tall ? styles.screensCardTall : ''
                    } ${card.align === 'right' ? styles.screensCardRight : ''}`}
                    ref={registerSection}
                  >
                    <span className={styles.screensCardLabel}>{card.label}</span>
                    <img src={card.image} alt="" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {cs.uiSections?.map((section) => (
        <div key={section.label} className={styles.uiSection}>
          <div className={styles.audienceHead}>
            <p className={styles.stakeholderLabel} ref={registerSection}>{section.label}</p>
            <h3 className={styles.stakeholderTitle} ref={registerSection}>{section.title}</h3>
            <p className={styles.stakeholderBody} ref={registerSection}>{section.body}</p>
          </div>
          {section.image && (
            <img className={styles.uiSectionImage} src={section.image} alt="" loading="lazy" ref={registerSection} />
          )}
          <div className={styles[section.layout]}>
            {section.cards.map((card) => (
              <div key={card.label} className={styles.uiCard} ref={registerSection}>
                <span className={styles.uiCardLabel}>{card.label}</span>
                <img src={card.image} alt="" loading="lazy" />
              </div>
            ))}
          </div>
          {section.carousel && <AutoCarousel images={section.carousel} />}
        </div>
      ))}

      {cs.statement && (
        <div className={styles.statement}>
          <div className={styles.statementText}>
            <div className={styles.statementDots} aria-hidden="true">
              <span /><span /><span /><span />
            </div>
            {/* no scroll-reveal here — the jumping dots are this section's motion */}
            <p className={styles.statementTitle}>{cs.statement.title}</p>
            <p className={styles.statementBody}>{cs.statement.body}</p>
          </div>
          <img className={styles.statementImage} src={cs.statement.image} alt="" loading="lazy" />
        </div>
      )}

      {cs.approach && (
        <div className={styles.kiccSection}>
          <div className={styles.kiccHead}>
            <h3 className={styles.sectionTitle} ref={registerSection} data-reveal="fade">{cs.approach.title}</h3>
            <p className={styles.approachBody} ref={registerSection} data-reveal="fade">{cs.approach.body}</p>
          </div>
          <div className={`${styles.approachRow} ${styles.approachLabels}`}>
            {cs.approach.columns.map((col) => (
              <span key={col}>{col}</span>
            ))}
          </div>
          {cs.approach.items.map((item) => (
            <div key={item.task} className={styles.approachRow} ref={registerSection}>
              <span>{item.task}</span>
              <span className={styles.approachDirection}>
                <img src={item.icon} alt="" loading="lazy" />
                {item.direction}
              </span>
            </div>
          ))}
        </div>
      )}

      {cs.goal && (
        <div className={styles.kiccSection}>
          <div className={styles.kiccHead}>
            <h3 className={styles.sectionTitle} ref={registerSection}>{cs.goal.title}</h3>
            <div>
              <h4 className={styles.goalHeading} ref={registerSection}>{cs.goal.heading}</h4>
              <p className={styles.approachBody} ref={registerSection}>{cs.goal.body}</p>
            </div>
          </div>
          <div className={styles.goalStage} style={{ backgroundImage: `url(${cs.goal.background})` }}>
            <img src={cs.goal.phone} alt="" loading="lazy" ref={registerSection} data-reveal-start="top 70%" />
          </div>
        </div>
      )}

      {cs.principles && (
        <div className={styles.principles} style={{ backgroundImage: `url(${cs.principles.background})` }}>
          <h3 className={styles.principlesTitle} ref={registerSection}>{cs.principles.title}</h3>
          <div className={styles.principlesList}>
            {cs.principles.items.map((item) => (
              <div key={item.title} className={styles.principlesItem} ref={registerSection}>
                <h4 className={styles.principlesItemTitle}>{item.title}</h4>
                <p className={styles.principlesItemHeading}>{item.heading}</p>
                <p className={styles.principlesItemBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {cs.elements && (
        <div className={styles.kiccSection}>
          <div className={styles.kiccHead}>
            <h3 className={styles.sectionTitle} ref={registerSection}>{cs.elements.title}</h3>
            <p className={styles.approachBody} ref={registerSection}>{cs.elements.body}</p>
          </div>
          <div className={styles.palette} ref={registerSection}>
            {cs.elements.palette.map((c) => (
              <span
                key={c.label}
                style={{ width: c.width, background: c.color, color: c.light ? '#020202' : '#ffffff' }}
              >
                {c.label}
              </span>
            ))}
          </div>
          <div className={styles.elementsAssets}>
            {cs.elements.assets.map((a) => (
              <figure key={a.label} ref={registerSection}>
                <figcaption>{a.label}</figcaption>
                <img src={a.image} alt="" loading="lazy" className={a.inset ? styles.elementsInset : undefined} />
              </figure>
            ))}
          </div>
          <div className={styles.elementsShowcase}>
            {cs.elements.showcase.map((src) => (
              <img key={src} src={src} alt="" loading="lazy" ref={registerSection} />
            ))}
          </div>
        </div>
      )}

      {cs.development && (
        <div className={styles.development} style={{ backgroundImage: `url(${cs.development.background})` }}>
          <h3 className={styles.developmentTitle} ref={registerSection}>{cs.development.title}</h3>
          <p className={styles.developmentBody} ref={registerSection}>{cs.development.body}</p>
          <div className={styles.developmentScreens}>
            {cs.development.screens.map((s) => (
              <figure key={s.label} ref={registerSection}>
                <figcaption>{s.label}</figcaption>
                <img src={s.image} alt="" loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      )}

      {cs.finalScreens && (
        <div className={styles.final}>
          <h3 className={styles.finalTitle} ref={registerSection}>{cs.finalScreens.title}</h3>
          <p className={styles.finalBody} ref={registerSection}>{cs.finalScreens.body}</p>
          <div className={styles.finalGrid}>
            <div className={styles.finalLeft}>
              {cs.finalScreens.left.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" ref={registerSection} />
              ))}
            </div>
            <div className={styles.finalCenter}>
              <img src={cs.finalScreens.center.image} alt="" loading="lazy" ref={registerSection} />
              <div className={styles.finalCaption} ref={registerSection}>
                <h4>{cs.finalScreens.center.title}</h4>
                <p>{cs.finalScreens.center.body}</p>
              </div>
            </div>
            <div className={styles.finalRight}>
              {cs.finalScreens.right.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" ref={registerSection} />
              ))}
            </div>
            <img className={styles.finalMockup} src={cs.finalScreens.center.mockup} alt="" loading="lazy" />
          </div>
        </div>
      )}

      {cs.interview && (
        <div className={styles.interviewSection}>
          <h3 className={styles.sectionTitle} ref={registerSection}>{cs.interview.title}</h3>
          <div className={styles.interviewRow}>
            <p className={styles.interviewBody} ref={registerSection}>{cs.interview.body}</p>
            <div className={styles.interviewList}>
              {cs.interview.items.map((item) => (
                <div key={item.label} className={styles.interviewItem} ref={registerSection}>
                  <span className={styles.interviewLabel}>{item.label}</span>
                  <p className={styles.interviewValue}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {cs.interview.qa && (
            <div className={styles.qaList}>
              <div className={styles.qaLine} ref={registerSection} />
              {cs.interview.qa.map((item) => (
                <Fragment key={item.q}>
                  <div className={styles.qaRow} ref={registerSection}>
                    <h4 className={styles.qaQuestion}>{item.q}</h4>
                    <p className={styles.qaAnswer}>
                      {item.a.map((seg, i) => (typeof seg === 'string' ? seg : <strong key={i}>{seg.bold}</strong>))}
                    </p>
                  </div>
                  <div className={styles.qaLine} ref={registerSection} />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      {cs.insight && (
        <div className={styles.insightSection} style={{ backgroundImage: `url(${cs.insight.image})` }}>
          <div className={styles.insightList}>
            <h3 className={styles.sectionTitle} ref={registerSection}>{cs.insight.title}</h3>
            {cs.insight.items.map((item) => (
              <div key={item.title} ref={registerSection}>
                <h4 className={styles.insightItemTitle}>{item.title}</h4>
                <p className={styles.insightItemBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {cs.problems && (
        <div className={styles.problemsSection}>
          <h3 className={styles.sectionTitle} ref={registerSection}>{cs.problems.title}</h3>
          {cs.problems.items.map((item) => (
            <Fragment key={item.title}>
              {item.video ? (
                <div className={styles.problemsCard} ref={registerSection}>
                  <video src={item.video} autoPlay loop muted playsInline />
                </div>
              ) : (
                <div className={styles.problemsGrid}>
                  {item.images.map((src) => (
                    <div key={src} className={styles.problemsGridCell} ref={registerSection}>
                      <img src={src} alt="" />
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.problemsText} ref={registerSection}>
                <h4 className={styles.problemsTitle}>{item.title}</h4>
                <p className={styles.problemsBody}>{item.body}</p>
              </div>
            </Fragment>
          ))}
        </div>
      )}

      {cs.solution && (
        <div className={styles.solutionSection}>
          <h3 className={styles.sectionTitle} ref={registerSection}>{cs.solution.title}</h3>
          {cs.solution.detail && (
            <div className={styles.solutionIntro}>
              <h4 className={styles.solutionDetailHeading} ref={registerSection}>{cs.solution.detail.heading}</h4>
              <p className={styles.solutionDetailBody} ref={registerSection}>{cs.solution.detail.body}</p>
            </div>
          )}
          <div className={styles.solutionRow}>
            {cs.solution.items.map((item) => (
              <div key={item.label} className={styles.solutionCol} ref={registerSection}>
                <div className={styles.solutionBox}>
                  <div className={styles.solutionImageWrap}>
                    <img src={item.image} alt="" />
                  </div>
                  <p className={styles.solutionCaption}>
                    <span className={styles.solutionPainPoint}>{item.painPoint}</span> - {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {cs.solution.detail && (
            <div
              className={styles.solutionDetail}
              style={{ backgroundImage: `url(${cs.solution.detail.background})` }}
            >
              <div className={styles.solutionDetailRow} ref={registerSection}>
                <div className={styles.solutionDetailCol}>
                  <img src={cs.solution.detail.left} alt="" />
                </div>
                <div className={styles.solutionDetailCol}>
                  <img src={cs.solution.detail.right} alt="" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {cs.removedFeatures && (
        <div className={styles.removedSection}>
          <h4 className={styles.solutionDetailHeading} ref={registerSection}>{cs.removedFeatures.heading}</h4>
          <p className={styles.solutionDetailBody} ref={registerSection}>{cs.removedFeatures.body}</p>
          <div className={styles.removedStage}>
            <div className={styles.removedPhoneWrap1} ref={registerSection}>
              <img src={cs.removedFeatures.phone1} alt="" className={styles.removedPhoneImg1} />
            </div>
            <div className={styles.removedPhoneWrap2} ref={registerSection}>
              <img src={cs.removedFeatures.phone2} alt="" className={styles.removedPhoneImg2} />
            </div>
            {cs.removedFeatures.chips.map((chip) => (
              <div
                key={chip.label}
                ref={registerSection}
                className={styles.removedChipWrap}
                style={{ top: chip.top, left: chip.left, zIndex: chip.behind ? 0 : 3 }}
              >
                <div
                  className={`${styles.removedChip} glass ${chip.faded ? styles.removedChipFaded : ''}`}
                  style={{
                    transform: `scale(${chip.scale})`,
                    filter: chip.faded ? `blur(${chip.blur}px)` : undefined,
                  }}
                >
                  <span className={styles.removedChipIcon} style={{ background: chip.color }}>
                    {chip.letter}
                  </span>
                  <span className={styles.removedChipLabel}>{chip.label}</span>
                </div>
              </div>
            ))}
          </div>

          {cs.removedFeatures.gallery && (
            <div className={styles.removedGallery}>
              <div className={`${styles.removedGalleryCell} ${styles.removedGalleryVideoCell}`} ref={registerSection}>
                <video src={cs.removedFeatures.gallery.video} autoPlay loop muted playsInline />
              </div>
              {cs.removedFeatures.gallery.items.map((item) => (
                <div key={item.image} className={`${styles.removedGalleryCell} ${styles.removedGalleryItemCell}`} ref={registerSection}>
                  <img src={item.image} alt="" />
                  {item.caption && <span className={styles.removedGalleryCaption}>{item.caption}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {cs.workoutCount && (
        <div className={styles.workoutCountSection}>
          <h4 className={styles.solutionDetailHeading} ref={registerSection}>{cs.workoutCount.heading}</h4>
          <p className={styles.solutionDetailBody} ref={registerSection}>{cs.workoutCount.body}</p>
          <div className={styles.workoutStage}>
            <img src={cs.workoutCount.phone1} alt="" className={styles.workoutPhone1} ref={registerSection} />
            <img src={cs.workoutCount.phone2} alt="" className={styles.workoutPhone2} ref={registerSection} />
          </div>
        </div>
      )}

      {cs.retrospective && (
        <div className={styles.retrospectiveSection}>
          <div className={styles.insightList}>
            <h3 className={styles.sectionTitle} ref={registerSection}>{cs.retrospective.title}</h3>
            {cs.retrospective.items.map((item) => (
              <div key={item.title} ref={registerSection}>
                <h4 className={styles.insightItemTitle}>{item.title}</h4>
                <p className={styles.insightItemBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {(cs.eyebrow || cs.intro) && (
        <div className={styles.introRow} ref={registerSection}>
          <h3 className={styles.eyebrow}>{cs.eyebrow}</h3>
          <div>
            <p className={styles.introText}>{cs.intro}</p>
            {cs.meta && (
              <div className={styles.metaRow}>
                {cs.meta.map((m) => (
                  <div key={m.label} className={styles.metaItem}>
                    <span className={styles.metaLabel}>{m.label}</span>
                    <span className={styles.metaValue}>{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {cs.gallery && (
        <div className={styles.gallery} ref={registerSection}>
          {cs.gallery.map((src) => (
            <div key={src} className={styles.galleryItem}>
              <img src={src} alt="" />
            </div>
          ))}
        </div>
      )}
      {cs.wideImage && (
        <div className={styles.wideImage} ref={registerSection}>
          <img src={cs.wideImage} alt="" />
        </div>
      )}

      {(cs.comparisons || []).map((c) => (
        <div key={c.label} className={styles.comparison} ref={registerSection}>
          <div className={styles.comparisonImage}>
            <img src={c.image} alt="" />
          </div>
          <div className={styles.comparisonText}>
            <span className={styles.comparisonLabel}>{c.label}</span>
            {c.title && <h4>{c.title}</h4>}
            <p>{c.body}</p>
            {c.bullets && (
              <ul className={styles.bulletList}>
                {c.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            )}
            {c.icons && (
              <div className={styles.comparisonIcon}>
                {c.icons.map((src) => (
                  <img key={src} src={src} alt="" />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {cs.colors && (
        <div className={styles.designSection} ref={registerSection}>
          <h3 className={styles.designTitle}>Design</h3>

          <div className={styles.colorGrid}>
            {cs.colors.map((c) => (
              <div key={c.hexLabel} className={styles.colorSwatch} style={{ background: c.value, color: c.text }}>
                {c.name && <span className={styles.colorName}>{c.name}</span>}
                <span className={styles.colorHex}>{c.hexLabel}</span>
              </div>
            ))}
          </div>

          {cs.typography && (
            <div className={styles.typeBlock}>
              <div className={styles.typeGlyph}>
                <span key={activeLang} className={styles.typeGlyphText}>
                  {cs.typography[activeLang].sample}
                </span>
              </div>
              <div className={styles.typeList} onMouseLeave={() => setActiveLang(0)}>
                {cs.typography.map((t, i) => (
                  <div
                    key={t.label}
                    className={i === activeLang ? styles.typeItemActive : styles.typeItem}
                    onMouseEnter={() => setActiveLang(i)}
                  >
                    {t.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {cs.logoFiles && (
            <div className={styles.logoRow}>
              {cs.logoFiles.map((src) => (
                <div key={src} className={styles.logoTile}>
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          )}

          {cs.mockups && (
            <div className={styles.mockupSpread}>
              {cs.mockups.map((src, i) => (
                <img key={src} src={src} alt="" style={{ '--i': i }} />
              ))}
            </div>
          )}
        </div>
      )}

      {cs.closing && (
        <div className={styles.closing} ref={registerSection}>
          {cs.logo && <img src={cs.logo} alt="" className={styles.closingLogo} />}
          <p>{cs.closing}</p>
        </div>
      )}

      </div>
    </Fragment>
  )
}
