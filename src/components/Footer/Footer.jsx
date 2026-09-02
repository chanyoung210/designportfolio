import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <span>Portfolio Site | Designer An Chanyoung. Delivering Positive Experience Through Design.</span>
        <span className={styles.contact}>
          <span>{'{ Email: chanyoung210@gmail.com }'}</span>
          <span>{'{ Tel: 010-2961-5770 }'}</span>
        </span>
      </div>

      <h2 className={styles.title}>LET&apos;S WORK TOGETHER.</h2>

      <div className={styles.row}>
        <span>© 2026 An Chanyoung. All Rights Reserved.</span>
        <span>Thank you for watching</span>
      </div>
    </footer>
  )
}
