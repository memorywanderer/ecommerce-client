import styles from './CardPlaceholder.module.css'

export const CardPlaceholder = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.body}>
        <div className={styles.text}></div>
        <div className={styles.text}></div>
        <div className={styles.text}></div>
        <div className={styles.btn}></div>
      </div>
    </div>
  )
}