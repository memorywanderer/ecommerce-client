import { useContext, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Store } from '../../utils/store'
import styles from './BottomMenu.module.css'
import button from '../../styles/Button.module.css'

export const BottomMenu = () => {
  const { state } = useContext(Store)
  const { cartItems } = state.cart || []
  const [itemsCount, setItemsCount] = useState(0)
  const [categories, setCategories] = useState([])
  const parentCategories = useMemo(() => categories.filter(
    (category) =>
      category.parentCategory === null
  ), [categories])
  const [showCatalog, setShowCatalog] = useState(false)
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('/api/categories')
        setCategories(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    getCategories()
  }, [])

  useEffect(() => {
    setItemsCount(cartItems.length)
  }, [cartItems])


  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Link
            className={styles.link}
            href='/'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Home
          </Link>
        </li>
        <li>
          <button
            className={styles.link}
            onClick={() => setShowCatalog(prev => !prev)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
            Catalog
          </button>
          {categories.length > 0 && (
            <nav className={showCatalog ? `${styles.menu} ${styles.open}` : styles.menu}>
              <div className={styles.title}>Catalog</div>
              <ul className={styles['list-v']}>
                {parentCategories.map((category) => (
                  <ParentCategory
                    key={category._id}
                    category={category}
                    categories={categories}
                  />
                ))}
              </ul>
            </nav>
          )}
        </li>
        <li>
          <Link
            className={styles.link}
            href='/cart'
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Cart
            {itemsCount > 0 && <div className={styles.badge}>{itemsCount}</div>}
          </Link>
        </li>
        <li>
          <Link className={styles.link} href='#'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            Favs
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const ParentCategory = ({ category, categories }) => {
  const [showSubmenu, setShowSubmenu] = useState(false)
  const [currentCategory, setCurrentCategory] = useState(null)

  const handleMenuClick = (category) => {
    setCurrentCategory(category)
    setShowSubmenu(true)
  }

  return (
    <>
      <li>
        <button className={button['primary-light']} onClick={() => handleMenuClick(category)}>
          {category.name}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </li>

      {currentCategory && <Subcategory
        categories={categories}
        currentCategory={currentCategory}
        setShowSubmenu={setShowSubmenu}
        showSubmenu={showSubmenu}
      />}
    </>
  )
}

const Subcategory = ({ categories, currentCategory, setShowSubmenu, showSubmenu }) => {
  const subcategories = useMemo(() => categories.filter(
    (category) =>
      category.parentCategory !== null &&
      category.parentCategory._id === currentCategory._id
  ), [categories])

  return (
    <>
      <ul className={showSubmenu ? `${styles.submenu} ${styles.open}` : styles.submenu}>
        <button className={button['primary-light']} onClick={() => setShowSubmenu(false)}>
          Back
        </button>
        <Link className={button.link} href={`/categories/${currentCategory.name}`}>All {currentCategory.name}</Link>
        {subcategories.map((subcategory) => (
          <li className={button.link} key={subcategory._id}>
            <Link href={`/categories/${subcategory.name}`}>
              {subcategory.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
