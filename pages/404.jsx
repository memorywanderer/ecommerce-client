import Link from 'next/link'
import button from '../styles/Button.module.css'
import { Header } from '../components/Header/Header'
import axios from 'axios'
import { useEffect, useState } from 'react'
import typography from '../styles/Typography.module.css'
import styles from '../styles/Custom404.module.css'

const Custom404 = () => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('https://ecommerce-client-vert.vercel.appapi/categories')
        const categoriesData = response.data
        setCategories(categoriesData)
      } catch (error) {
        console.error(error)
      }
    }

    getCategories()
  }, [])
  return (
    <>
      <Header categories={categories} />
      <div className="container">
        <h1 className={typography['title-36']}>Sorry, this page is missing</h1>
        <p className={`${typography.subtitle} ${styles.row}`}>Go to <Link className={button.link} href='/'>homepage</Link></p>

      </div>
    </>
  )
}

export default Custom404