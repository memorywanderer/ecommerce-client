import Image from 'next/image'
import styles from './Slider.module.css'
import { useState, useMemo } from 'react'

export const Slider = ({ items }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const slidesCount = useMemo(() => items.length, [items])

  const nextSlide = () => {
    setCurrentSlide(currentSlide => (currentSlide + 1) % slidesCount)
  }
  const prevSlide = () => {
    setCurrentSlide(currentSlide => (currentSlide - 1 + slidesCount) % slidesCount)
  }

  return (
    <div className={styles.slider}>
      <div className={styles.slide}>
        <Image
          className={styles['main-img']}
          src={`https://ecommerce-admin-silk.vercel.app/images/${items.length > 0 && items[currentSlide]}`}
          width={480}
          height={500}
          alt=''
        />
      </div>
      <div className={styles.thumbs}>
        {items.length > 0 && items.map((item, index) => (
          <div
            onClick={() => setCurrentSlide(index)}
            className={styles.thumb}
            key={index}
          >
            <Image
              className={styles.img}
              src={`https://ecommerce-admin-silk.vercel.app/images/${item}`}
              width={250}
              height={110}
              alt=''
            />
          </div>))}
      </div>
      <button
        className={`${styles.btn} ${styles['btn-left']}`}
        onClick={prevSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>

      </button>
      <button
        className={`${styles.btn} ${styles['btn-right']}`}
        onClick={nextSlide}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>

      </button>
    </div>
  )
}