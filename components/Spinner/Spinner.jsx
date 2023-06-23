import styles from './Spinner.module.css'

export const Spinner = () => {
  return (
    <div class={styles.container}>
      <div className={styles.spinner}></div>
    </div>
  )
}