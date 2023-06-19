import Image from 'next/image'
import styles from './Product.module.css'
import button from '../../styles/Button.module.css'
import { useContext, useState } from 'react'
import { Store } from '../../utils/store'
import Link from 'next/link'

export const Product = ({ product }) => {
  const [addedToCart, setAddedToCart] = useState(false)
  const { dispatch } = useContext(Store)
  const addCartHandle = (e) => {
    e.preventDefault()
    dispatch({ type: 'CART_ADD_ITEM', payload: { product, quantity: 1 } })
    setAddedToCart(true)
  }

  return (
    <Link href={`/products/${product._id}`} className={styles.card}>
      <Image src={`https://ecommerce-admin-silk.vercel.app/images/${product?.imagesUrl[0]}`} className={styles.img} width={200} height={320} alt={product.title} />
      <div className={styles.body}>
        <p className={styles.price}>{product.price}₸</p>
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.author}>{product.author}</p>
        {!addedToCart
          ? <button onClick={addCartHandle} className={`${button.primary} ${styles.btn}`}>Add to card</button>
          : <Link className={button['primary-bordered']} href='/cart'>Proceed to checkout</Link>}
      </div>
    </Link>
  )
}