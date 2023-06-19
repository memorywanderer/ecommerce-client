import axios from 'axios';
import { Header } from '../components/Header/Header'
import { Product } from '../components/Product/Product';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css'
import typography from '../styles/Typography.module.css'
import { BottomMenu } from '../components/BottomMenu/BottomMenu';
import { CardPlaceholder } from '../components/CardPlaceholder/CardPlaceholder';
import { PlaceholderLoading } from '../components/PlaceholderLoading';

export default function Home({ categories }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        const productsData = response.data;
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Header categories={categories} />
      <BottomMenu />
      <div className="container">
        <h1 className={typography['title-36']}>New arrivals</h1>
        <div className={styles.grid}>
          {products.length > 0 ? (
            products.map(product => (
              <Product key={product.id} product={product} />
            ))
          ) : (
            <PlaceholderLoading />
          )}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  try {
    const res = await axios.get('/api/categories');
    const categories = res.data;
    return { props: { categories } };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { props: { categories: [] } };
  }
}
