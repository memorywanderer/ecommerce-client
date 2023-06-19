import Link from "next/link"
import styles from './Header.module.css'
import { useEffect, useState } from "react"
import { CatalogMenu } from "../CatalogMenu/CatalogMenu"
import { Search } from "../Search/Search"
import { useCartContext } from "../../hooks/useCartContext"

export const Header = ({ categories }) => {
  const [itemsCount, setItemsCount] = useState(0)
  const { state } = useCartContext()
  const { cart } = state
  const { cartItems } = cart || {}

  useEffect(() => {
    setItemsCount(cartItems?.length || 0)
  }, [cartItems])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link className={styles.logo} href='/'>Logos</Link>
        <Search />
        <nav className={styles.nav}>
          {/* <Link className={styles.link} href='#'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span>Messages</span>
          </Link> */}
          <Link className={styles.link} href='#'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span>Wishlist</span>
          </Link>
          <Link className={styles.link} href='/cart'>
            {itemsCount > 0 && <div className={styles.badge}>{itemsCount}</div>}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span>Cart</span>
          </Link>
        </nav>
      </header>
      <CatalogMenu showCatalog={true} categories={categories} />
    </div>
  )
}