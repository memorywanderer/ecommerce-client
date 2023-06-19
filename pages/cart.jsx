import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from "react"
import { Store } from "../utils/store"
import { CartItem } from "../components/CartItem/CartItem"
import { Header } from '../components/Header/Header'
import styles from '../styles/Cart.module.css'
import button from '../styles/Button.module.css'
import typography from '../styles/Typography.module.css'
import axios from 'axios';
import Link from 'next/link';

const Cart = ({ categories }) => {
  const [itemsCount, setItemsCount] = useState(0)
  const { state, dispatch } = useContext(Store)
  const { cart } = state
  const { cartItems: localStorageItems } = cart || {}
  const [cartItems, setCartItems] = useState(localStorageItems)

  useEffect(() => {
    setCartItems(localStorageItems)
    setItemsCount(cartItems?.length || 0)
  }, [localStorageItems])

  const handleClearCart = () => {
    dispatch({ type: "CART_RESET" })
  }

  return (
    <>
      <Header categories={categories} />
      <div className='container'>
        {cartItems.length > 0 ? <>
          <div className={styles.heading}>
            <h1 className={typography['title-36']}>Cart</h1>
            <div className={styles.subtitle}>{itemsCount} items</div>
            <button className={styles['clear-cart']} onClick={handleClearCart}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Clear cart
            </button>
          </div>
          <h2 className={typography['title-24']}>Your order</h2>
          <div className={styles.body}>
            <div className={styles.grid}>
              {cartItems.map((item) => {
                return <CartItem key={item?.product._id} product={item.product} />;
              })}
            </div>
            <div className={styles['order-info']}>
              <div>{itemsCount} items</div>
              <div className={styles.cost}>
                <div>Subtotal</div>
                <div className={styles.price}>{cartItems.reduce((a, c) => a + c.quantity * c.product.price, 0)}₸</div>
              </div>
              <Link href='/checkout' className={`btn-primary ${button.primary}`}>Proceed to checkout</Link>
            </div>
          </div>
        </> : <>
          <div>
            <h1>Your cart is empty.</h1>
            <Link className={styles.link} href="/">Go shopping</Link>
          </div>
        </>}

      </div>
    </>
  )
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

export default dynamic(() => Promise.resolve(Cart), { ssr: false });