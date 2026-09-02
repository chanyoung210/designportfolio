import { Fragment, useState } from 'react'
import { PROJECTS } from './projects.js'
import styles from './ProjectCaseStudy.module.css'

// Renders the reference case-study layout (hero -> intro -> gallery ->
// before/after comparisons -> design system -> mockup spread -> other
// projects -> closing banner) from a project's `caseStudy` data. Only KICC
// has that data filled in right now — this is the reusable frame the next
// projects will plug into.
export function ProjectCaseStudy({ project, onSelectProject }) {
  const cs = project.caseStudy
  const otherProjects = PROJECTS.filter((p) => p.id !== project.id)
  const [activeLang, setActiveLang] = useState(0)

  return (
    <Fragment>
      <div className={styles.hero}>
        <img src={cs.heroImage} alt="" />
        <div className={styles.heroCaption}>
          <img src={cs.logo} alt="" className={styles.heroLogo} />
          <h2 className={styles.heroTitle}>{cs.heroTitle}</h2>
        </div>
        <div className={styles.scrollCue} aria-hidden="true">
          <span className={styles.scrollMouse}>
            <span className={styles.scrollWheel} />
          </span>
        </div>
      </div>

      <div className={styles.wrap}>
      <div className={styles.introRow}>
        <h3 className={styles.eyebrow}>{cs.eyebrow}</h3>
        <div>
          <p className={styles.introText}>{cs.intro}</p>
          <div className={styles.metaRow}>
            {cs.meta.map((m) => (
              <div key={m.label} className={styles.metaItem}>
                <span className={styles.metaLabel}>{m.label}</span>
                <span className={styles.metaValue}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.gallery}>
        {cs.gallery.map((src) => (
          <div key={src} className={styles.galleryItem}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
      <div className={styles.wideImage}>
        <img src={cs.wideImage} alt="" />
      </div>

      {cs.comparisons.map((c) => (
        <div key={c.label} className={styles.comparison}>
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

      <div className={styles.designSection}>
        <h3 className={styles.designTitle}>Design</h3>

        <div className={styles.colorGrid}>
          {cs.colors.map((c) => (
            <div key={c.hexLabel} className={styles.colorSwatch} style={{ background: c.value, color: c.text }}>
              {c.name && <span className={styles.colorName}>{c.name}</span>}
              <span className={styles.colorHex}>{c.hexLabel}</span>
            </div>
          ))}
        </div>

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

        <div className={styles.logoRow}>
          <div className={styles.logoTile}>
            <img src="/protfolio/kicc/logo01.svg" alt="" />
          </div>
          <div className={styles.logoTile}>
            <img src="/protfolio/kicc/logo02.svg" alt="" />
          </div>
        </div>

        <div className={styles.mockupSpread}>
          {cs.mockups.map((src, i) => (
            <img key={src} src={src} alt="" style={{ '--i': i }} />
          ))}
        </div>
      </div>

      <div className={styles.closing}>
        <img src={cs.logo} alt="" className={styles.closingLogo} />
        <p>{cs.closing}</p>
      </div>

      <div className={styles.otherProjects}>
        <h3 className={styles.sectionTitle}>Other Projects</h3>
        <div className={styles.otherGrid}>
          {otherProjects.map((p) => (
            <button
              key={p.id}
              type="button"
              className={styles.otherCard}
              onClick={() => onSelectProject(p)}
              style={{ backgroundImage: `url(${p.image})` }}
            >
              <span>{p.title}</span>
            </button>
          ))}
          <div className={`${styles.otherCard} ${styles.otherCardCta}`}>
            <span>
              Let's build it
              <br />
              together.
            </span>
          </div>
        </div>
      </div>

      <div className={styles.footerBanner}>LET'S WORK TOGETHER.</div>
      </div>
    </Fragment>
  )
}
