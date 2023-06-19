import { useState, useRef, useEffect } from 'react'
import debounce from 'lodash.debounce'
import styles from './Search.module.css'
import axios from 'axios'
import { useRouter } from 'next/router'

export const Search = () => {
  const router = useRouter()
  const [searchValue, setSearchValue] = useState('')
  const handleSearch = (e) => {
    debouncedSearch(e.target.value)
  }

  const debouncedSearch = useRef(debounce(async (searchValue) => {
    setSearchValue(searchValue)
    try {
      const response = await axios.post('api/products', { searchValue });
    } catch (error) {
      console.error('Error occurred during search:', error);
    }
  })).current

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    router.push({
      pathname: '/search',
      query: { searchValue }
    })
  }

  useEffect(() => {
    return () => {
      debouncedSearch.cancel()
    }
  })

  return (
    <form className={styles.form} onSubmit={handleSearchSubmit}>
      <input
        className={styles.search}
        type="search"
        value={searchValue || ''}
        onChange={handleSearch}
        placeholder="Search..." />
      <button className={styles['btn-search']} type="submit">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles['search-icon']}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <span>Search</span>
      </button>
    </form>
  )
}