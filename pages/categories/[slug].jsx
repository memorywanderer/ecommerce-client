import axios from "axios"
import { Header } from "../../components/Header/Header"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from '../../styles/Categories.module.css'
import form from '../../styles/Form.module.css'
import button from '../../styles/Button.module.css'
import typography from '../../styles/Typography.module.css'
import { Product } from "../../components/Product/Product"
import { PlaceholderLoading } from '../../components/PlaceholderLoading'

const Category = ({ products, categories }) => {
  const [authors, setAuthors] = useState(null)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  // Filters values
  const [minPriceValue, setMinPriceValue] = useState(0)
  const [maxPriceValue, setMaxPriceValue] = useState(0)
  const [selectedAuthors, setSelectedAuthors] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [showFilteredProducts, setShowFilteredProducts] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const category = router.query.slug

  useEffect(() => {
    setFilteredProducts(products)
    const authors = products.map(product => product.author)
    const prices = products.map(product => product.price)
    setAuthors(authors)
    setMinPrice(Math.min(...prices))
    setMaxPrice(Math.max(...prices))
    setMinPriceValue(Math.min(...prices))
    setMaxPriceValue(Math.max(...prices))
  }, [products, maxPriceValue, minPriceValue])


  useEffect(() => {
    const getProductByFilter = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(`/api/products/?category=${category}&minPrice=${minPriceValue}&maxPrice=${maxPriceValue}&authors=${selectedAuthors}`)
        setFilteredProducts(response.data)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setFilteredProducts([])
        }
        setIsLoading(false)
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    // if user set author filters
    if (showFilteredProducts) {
      getProductByFilter()
    } else {
      setFilteredProducts(products)
    }
    setShowFilteredProducts(false)
  }, [showFilteredProducts])

  const handleAuthorValue = (author) => {
    // If author is checked filter out selected
    // if author is not checked add to selected
    setSelectedAuthors(prev => {
      if (prev.includes(author)) {
        return [...prev.filter(p => p !== author)]
      }
      return [...prev, author]
    })
  }

  const applyPriceFilters = (e) => {
    e.preventDefault()
    setShowFilteredProducts(showFilteredProducts => !showFilteredProducts)
    setShowMobileFilters(false)
  }

  return (
    <>
      <Header categories={categories} />
      <div className='container'>
        <h1 className={typography['title-36']}>{category}</h1>
        <div className={styles.top}>
          <button
            className={`${button['primary-light']} ${styles['mobile-filter-btn']}`}
            onClick={() => setShowMobileFilters(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            Filters
          </button>
        </div>
        <div className={styles.body}>
          <div className={showMobileFilters ? `${styles.filters} ${styles.open}` : styles.filters}>
            <form className={form.form}>
              <div className={typography['title-24']}>Filters</div>
              <div className={styles['price-filter']}>
                <label
                  className={form.label}
                >
                  Minimum price:</label>
                <input
                  className={form.input}
                  type="number"
                  name="minPrice"
                  min={minPrice}
                  max={maxPrice}
                  placeholder="Minimum price"
                  onChange={(e) => setMinPriceValue(e.target.value)}
                  value={minPriceValue}
                />
                <label
                  className={form.label}
                >Maximum price:</label>
                <input
                  className={form.input}
                  type="number"
                  name="maxPrice"
                  min={minPrice}
                  max={maxPrice}
                  placeholder="Maximum price"
                  onChange={(e) => setMaxPriceValue(e.target.value)}
                  value={maxPriceValue}
                />

              </div>
              <label
                className={form.label}
              >Author:</label>
              <ul className={styles.list}>
                {authors &&
                  authors.map((author, index) => (
                    <li className={form['checkbox-control']} key={index}>
                      <input
                        className={form.checkbox}
                        type="checkbox"
                        id={`author-${index}`}
                        name="author"
                        value={author}
                        onChange={() => handleAuthorValue(author)}
                      />
                      <label className={form['checkbox-label']} htmlFor={`author-${index}`}>{author}</label>
                    </li>
                  ))}
              </ul>
              <button
                type="submit"
                onClick={applyPriceFilters}
                className={button['primary-light']}>
                Apply filters
              </button>
              <button
                type="button"
                className={`${button.danger} ${styles['mobile-filter-btn']}`}
                onClick={() => setShowMobileFilters(false)}
              >
                Close
              </button>
            </form>
          </div>

          <div className={styles.grid}>
            {isLoading && <PlaceholderLoading />}
            {!isLoading && filteredProducts.length > 0 ? filteredProducts.map(product => (
              <Product key={product._id} product={product} />
            )) : <div>No products found</div>}
          </div>

        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const category = context.query.slug;

    const productsByCategoryResponse = await axios.get(`https://ecommerce-client-vert.vercel.app/api/products/?category=${category}`);
    const products = productsByCategoryResponse.data;

    const headerCategories = await axios.get(`https://ecommerce-client-vert.vercel.app/api/categories`);
    const categories = headerCategories.data;

    return {
      props: {
        products,
        categories,
      },
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        error: 'An error occurred while fetching data.',
      },
    };
  }
}

export default Category