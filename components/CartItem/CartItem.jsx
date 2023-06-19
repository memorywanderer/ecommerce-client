import Image from 'next/image'
import styles from './CartItem.module.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Store } from '../../utils/store'

export const CartItem = ({ product }) => {
  const { state, dispatch } = useContext(Store)
  const [subtotalPrice, setSubtotalPrice] = useState(product.price)
  const [quantity, setQuantity] = useState(1)
  const [stock, setStock] = useState(0)

  useEffect(() => {
    if (state.cart.cartItems.length > 0) {
      const item = state.cart.cartItems.find(item => item.product._id === product._id)
      setQuantity(item.quantity || 1)
    }
  }, [product])

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`/api/products/?id=${product._id}`);
        const productData = response.data;
        setStock(productData.stock);
      } catch (error) {
        console.error('Error in cart item: ', error)
      }
    };
    getProduct()
  }, [])

  useEffect(() => {
    if (quantity >= 1 && quantity <= stock) {
      dispatch({ type: 'CART_ADD_ITEM', payload: { product, quantity } })
      setSubtotalPrice(product.price * quantity)
    }
  }, [quantity, dispatch, stock])

  const handleCountIncrease = () => {
    if (quantity <= stock)
      setQuantity(prev => prev + 1)
  }

  const handleCountDecrease = () => {
    if (quantity > 1)
      setQuantity(prev => prev - 1)
  }

  const handleCountChange = (e) => {
    const { value } = e.target
    if (value >= 1 && value <= stock)
      setQuantity(+e.target.value)
  }

  const handleItemDelete = () => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: { _id: product._id } })
  }

  return (
    <div className={styles.card}>
      <Image src={`https://ecommerce-admin-silk.vercel.app/images/${product.imagesUrl[0]}`} className={styles.img} width={80} height={120} alt={product.title} />
      <div className={styles.body}>
        <div className={styles.description}>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.author}>{product.author}</p>
        </div>
        <div className={styles.counter}>
          <div className={styles.quantity}>
            <button
              className={styles.btn}
              onClick={handleCountDecrease}>
              <span>-</span>
            </button>
            <input
              className={styles.input}
              type='number'
              min={1}
              onChange={handleCountChange}
              value={quantity}
            />
            <button
              className={styles.btn}
              onClick={handleCountIncrease} >
              <span>+</span>
            </button>
          </div>
        </div>
        <div className={styles.cost}>
          <div className={styles.price}> {subtotalPrice}₸</div>
        </div>
        <div className={styles.actions}>
          <button className={styles['remove-btn']} onClick={handleItemDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.icon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}