import Link from 'next/link'
import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        <Link className={styles.logo} href='/'>Logos</Link>
        <p className={styles.description}>
          "Logos: A Journey into the World of Books"
          is an enchanting exploration of the fascinating realm
          of book e-commerce. Written by renowned author and industry expert,
          this book serves as a comprehensive guide that delves into the history,
          evolution, and intricacies of the online book marketplace.
        </p>
        <small>Logos© 2023</small>
      </div>
    </footer>
  )
}