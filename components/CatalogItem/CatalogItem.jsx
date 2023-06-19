import Link from "next/link"
import styles from './CatalogItem.module.css'

export const CatalogItem = ({ category, handleMouseEnter, isLinkActive }) => {

  return (
    <li
      onMouseEnter={() => {
        handleMouseEnter(category._id)
      }}
    >
      <Link
        className={isLinkActive
          ? `${styles['catalog-link']} ${styles.active}`
          : `${styles['catalog-link']}`
        }
        href={`/categories/${category.name}`}>
        {category.name}
      </Link>
    </li >
  )
}