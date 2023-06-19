import axios from 'axios'
import { useRouter } from 'next/router'
import { Product } from '../components/Product/Product'
import { Header } from '../components/Header/Header'
import typography from '../styles/Typography.module.css'

const Search = ({ products, categories }) => {
  const router = useRouter()
  const { searchValue } = router.query
  console.log(products)
  return (
    <>
      <Header categories={categories} />
      <div className='container'>
        <div className={typography['title-36']}>You've searched for "{searchValue}"</div>
        {products.length > 0 ? products.map(product => (
          <Product key={product._id} product={product} />
        )) : <div className={typography.subtitle}>We didn't find anything</div>}
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  try {
    const searchValue = context.query.searchValue;
    const response = await axios.post('/api/products', { searchValue });
    const products = await response.data;

    const headerCategories = await axios.get(`/api/categories`);
    const categories = headerCategories.data;

    return {
      props: {
        products,
        categories
      }
    };
  } catch (error) {
    console.log('Error in search page: ', error);

    // Handle the error and still return the categories
    const headerCategories = await axios.get(`http://localhost:3000/api/categories`);
    const categories = headerCategories.data;

    return {
      props: {
        products: [],
        categories
      }
    };
  }
};

export default Search