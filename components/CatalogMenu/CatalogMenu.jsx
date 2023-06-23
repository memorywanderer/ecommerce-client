'use client'
import { useEffect, useState } from "react"
import { CatalogItem } from "../CatalogItem/CatalogItem"
import styles from './CatalogMenu.module.css'
import Link from "next/link"
import { useRouter } from "next/router"
import { Spinner } from "../Spinner/Spinner"

export const CatalogMenu = ({ showCatalog, categories }) => {
  const [catalogCategories, setCatalogCategories] = useState(null)
  const [currentMenu, setCurrentMenu] = useState(null)
  const [menuItemHovered, setMenuItemHovered] = useState(false)

  useEffect(() => {
    /*
      Категории разделены на две группы:
      Первая -- основные категории, которые будут показаны на главной в навигации
      Вторые -- под меню, будут показаны внутри основных категорий

      Каждая категория имеет два поля: name -- имя категории и parent -- вложена ли категория 
      Если парент отсутствует, то значит, что категория главная, 
      если парент есть, то это подкатегория

      Например: 
      Fiction -- художественная литература
      Poetry -- поджанр художественной литературы, поэтому не может существовать в отрыве от нее
      У fiction parentCategory будет null -- оно высшее в иерархии
      У poetry parentCategory будет fiction
    */
    const parentCategories = categories.filter(category => category?.parentCategory === null)
    const childCategories = categories.filter(category => category?.parentCategory !== null)
    const categoriesHierarchy = parentCategories.map(parentCategory => {
      return {
        parent: parentCategory,
        categories: childCategories.filter(childCategory => parentCategory._id === childCategory.parentCategory._id)
      }
    })
    setCatalogCategories(categoriesHierarchy)
  }, [categories]);

  const handleMouseEnter = (id) => {
    setCurrentMenu(id)
    setMenuItemHovered(true)
  }

  const handleMouseLeave = () => {
    setCurrentMenu(null)
    setMenuItemHovered(false)
  }

  return (
    <nav
      onMouseLeave={handleMouseLeave}
      className={menuItemHovered ? `${styles.catalog} ${styles.hovered}` : `${styles.catalog}`}>
      <ul className={styles['catalog-menu']}>
        {catalogCategories && catalogCategories.map((category, index) => (
          <CatalogItem
            isLinkActive={currentMenu === category.parent._id}
            category={category.parent}
            key={category.parent._id}
            handleMouseEnter={handleMouseEnter}
          />
        ))}
      </ul>
      {currentMenu && (
        <ul className={styles.submenu}>
          {catalogCategories &&
            catalogCategories.find(subcategories => subcategories.parent._id === currentMenu)?.categories.map(category => {
              return (<li className={styles['sub-item']} key={category._id}>
                <Link href={`/categories/${category.name}`} >{category.name}</Link>
              </li>)
            })}
        </ul>
      )}
    </nav>
  )
}
