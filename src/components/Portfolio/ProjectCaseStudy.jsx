import { Fragment, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ProjectCaseStudy.module.css'

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

    if (reducedMotion) {
      gsap.set(sections, { opacity: 1, y: 0 })
      return
    }

    gsap.set(sections, { opacity: 0, y: 100 })

    const tweens = sections.map((section) =>
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          scroller,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
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

  return (
    <Fragment>
      <div className={styles.hero}>
        <img src={cs.heroImage} alt="" />
        <div className={styles.heroCaption}>
          {cs.logo && <img src={cs.logo} alt="" className={styles.heroLogo} />}
          <h2 className={styles.heroTitle} style={cs.heroTitleSize ? { fontSize: cs.heroTitleSize } : undefined}>
            {cs.heroTitle}
          </h2>
          {cs.heroSubtitle && <p className={styles.heroSubtitle}>{cs.heroSubtitle}</p>}
        </div>
        <div className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollMouse}>
            <span className={styles.scrollWheel} />
          </span>
        </div>
      </div>

      <div className={styles.wrap} ref={wrapRef}>
      {cs.background && (
        <div className={styles.background}>
          <h3 className={styles.sectionTitle} ref={registerSection}>{cs.background.title}</h3>
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
      )}

      {cs.approach && (
        <div className={styles.approachSection}>
          <h3 className={styles.sectionTitle} ref={registerSection}>{cs.approach.title}</h3>
          <div className={styles.approachRow}>
            <div className={styles.approachImage} ref={registerSection}>
              <img src={cs.approach.image} alt="" />
            </div>
            <div className={styles.approachCard} ref={registerSection}>
              <p className={styles.approachEnglish}>
                <strong>{cs.approach.englishBold}</strong>
                <br />
                {cs.approach.englishBody}
              </p>
              <div>
                <span className={styles.approachLabel}>{cs.approach.label}</span>
                <p className={styles.approachKorean}>{cs.approach.koreanBody}</p>
              </div>
            </div>
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
              <div className={styles.qaLine} />
              {cs.interview.qa.map((item) => (
                <Fragment key={item.q}>
                  <div className={styles.qaRow} ref={registerSection}>
                    <h4 className={styles.qaQuestion}>{item.q}</h4>
                    <p className={styles.qaAnswer}>
                      {item.a.map((seg, i) => (typeof seg === 'string' ? seg : <strong key={i}>{seg.bold}</strong>))}
                    </p>
                  </div>
                  <div className={styles.qaLine} />
                </Fragment>
              ))}
            </div>
          )}
        </div>
      )}

      {cs.insight && (
        <div className={styles.insightSection}>
          <div className={styles.insightRow}>
            <div className={styles.insightList}>
              <h3 className={styles.sectionTitle} ref={registerSection}>{cs.insight.title}</h3>
              {cs.insight.items.map((item) => (
                <div key={item.title} className={styles.insightItem} ref={registerSection}>
                  <h4 className={styles.insightItemTitle}>{item.title}</h4>
                  <p className={styles.insightItemBody}>{item.body}</p>
                </div>
              ))}
            </div>
            <div className={styles.insightImage} ref={registerSection}>
              <img src={cs.insight.image} alt="" />
            </div>
          </div>
        </div>
      )}

      {cs.problems && (
        <div className={styles.problemsSection}>
          <h3 className={styles.sectionTitle} ref={registerSection}>
            {cs.problems.title}
            <span className={styles.problemsTitleSuffix}>{cs.problems.titleSuffix}</span>
          </h3>
          <div className={styles.problemsCard} ref={registerSection}>
            <video src={cs.problems.video} autoPlay loop muted playsInline />
            <div className={styles.problemsText}>
              <span className={styles.problemsNumber}>{cs.problems.number}</span>
              <p className={styles.problemsBody}>{cs.problems.body}</p>
            </div>
          </div>

          {cs.problems.grid && (
            <div className={styles.problemsGrid}>
              {cs.problems.grid.map((cell, i) =>
                cell.type === 'image' ? (
                  <div key={i} className={`${styles.problemsGridCell} ${styles.problemsGridImageCell}`} ref={registerSection}>
                    <img src={cell.image} alt="" />
                  </div>
                ) : (
                  <div key={i} className={styles.problemsGridCell} ref={registerSection}>
                    <div className={styles.problemsGridText}>
                      <div>
                        <span className={styles.problemsNumber}>{cell.number}</span>
                        <p className={styles.problemsBody}>{cell.body}</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      {cs.solution && (
        <div className={styles.solutionSection}>
          <h3 className={styles.sectionTitle} ref={registerSection}>{cs.solution.title}</h3>
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
              <h4 className={styles.solutionDetailHeading} ref={registerSection}>{cs.solution.detail.heading}</h4>
              <p className={styles.solutionDetailBody} ref={registerSection}>{cs.solution.detail.body}</p>
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
          <h4 className={styles.solutionDetailHeading} ref={registerSection}>{cs.retrospective.title}</h4>
          <p className={styles.solutionDetailBody} ref={registerSection}>{cs.retrospective.body}</p>
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
