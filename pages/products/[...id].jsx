import axios from "axios"
import Image from "next/image"
import Head from "next/head"
import Link from "next/link"
import { useContext, useState } from "react"
import { Store } from "../../utils/store"
import { Header } from "../../components/Header/Header"
import { Slider } from "../../components/Slider/Slider"
import styles from '../../styles/Product.module.css'
import button from '../../styles/Button.module.css'

const Product = ({ product, categories }) => {
  const [inCart, setInCart] = useState(false)
  const { dispatch } = useContext(Store)
  const addToCart = () => {
    dispatch({ type: 'CART_ADD_ITEM', payload: { product, quantity: 1 } })
    setInCart(true)
  }
  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <Header categories={categories} />
      <div className="container">
        <section className={styles.page}>
          <div className={styles.content}>
            <section className={styles.info}>
              <Image
                className={styles['product-img']}
                src={`https://ecommerce-admin-silk.vercel.app/images/${product?.imagesUrl[0]}`}
                width={320}
                height={480}
                alt={product.title}
              />
              <div className={styles['info-content']}>
                <h1 className={styles['product-title']}>{product.title}</h1>
                <Link href='#' className={button.link}>{product.author}</Link>
                <div className={styles['info-details']}>
                  <div className={styles['details-item']}>
                    <span className={styles['details-title']}>Reviews</span>
                    <span className={styles['details-value']}>
                      <div>{product.rating}</div>
                      <div>(125 reviews)</div>
                    </span>
                  </div>
                  <div className={styles['details-item']}>
                    <span className={styles['details-title']}>Category</span>
                    <span className={styles['details-value']}>
                      {product.category.name}
                    </span>
                  </div>
                  <div className={styles['details-item']}>
                    <span className={styles['details-title']}>ISBN</span>
                    <span className={styles['details-value']}>
                      {product.isbn}
                    </span>
                  </div>
                  <div className={styles['details-item']}>
                    <span className={styles['details-title']}>Book length</span>
                    <span className={styles['details-value']}>
                      {product.pages}
                    </span>
                  </div>
                  <div className={styles['details-item']}>
                    <span className={styles['details-title']}>Dimensions</span>
                    <span className={styles['details-value']}>
                      {product.dimensions}
                    </span>
                  </div>
                  <div className={styles['details-item']}>
                    <span className={styles['details-title']}>Cover</span>
                    <span className={styles['details-value']}>
                      {product.cover}
                    </span>
                  </div>
                  <div className={styles['details-item']}>
                    <span className={styles['details-title']}>Language</span>
                    <span className={styles['details-value']}>
                      {product.language}
                    </span>
                  </div>
                  <div className={styles['details-item']}>
                    <span className={styles['details-title']}>Age range</span>
                    <span className={styles['details-value']}>
                      {product.ageRange}
                    </span>
                  </div>
                </div>
              </div>
            </section>
            <section className={styles.about}>
              <h2 className={styles['section-title']}>About {product.title}</h2>
              <div className={styles['about-description']}>
                {product.description}
              </div>
            </section>
            <section className={styles.gallery}>
              <h2 className={styles['section-title']}>{product.title} illustrations</h2>
              <div className={styles.slider}>
                <Slider items={product.imagesUrl} />
              </div>
            </section>
            <section className={styles.reviews}>
              <h2 className={styles['section-title']}>Reviews {product.title}</h2>
              <div className={styles.review}>
                <div className={styles['review-header']}>
                  <Image
                    className={styles['author-avatar']}
                    src={`https://ecommerce-admin-silk.vercel.app/images/profile-test.png`}
                    width={64}
                    height={64}
                    alt="Man in hat"
                  />
                  <div className={styles['author-name']}>Jhon Smith</div>
                </div>
                <div className={styles['review-body']}>
                  <div className={styles['review-title']}>
                    Epic, breathtaking and consumed my every thought
                  </div>
                  <div className={styles['review-description']}>
                    Fourth Wing was epic, breathtaking and consumed my every thought. This is easily one of my top favorite books, ever. This book had me screaming from excitement, gasping from betrayal, and crying all the happy and sad tears. Foreshadowing of what was to come was secretly laced into the pages, leaving us with the feeling of dread that was all consuming. The betrayals cut deep. The friendships were beautiful. The enemies to lovers romance was a slow burn that was passionate and steamy. And the battles were intense and epic. If you love romantasy, you definitely need this one on your tbr!
                  </div>
                  <div className={styles['review-date']}>
                    10-06-2023 20:28
                  </div>
                </div>
              </div>
              <div className={styles.review}>
                <div className={styles['review-header']}>
                  <Image
                    className={styles['author-avatar']}
                    src={`https://ecommerce-admin-silk.vercel.app/images/profile-test.png`}
                    width={64}
                    height={64}
                    alt="Man in hat"
                  />
                  <div className={styles['author-name']}>Jhon Smith</div>
                  <div className={styles['review-rating']}>24</div>
                </div>
                <div className={styles['review-body']}>
                  <div className={styles['review-title']}>
                    Epic, breathtaking and consumed my every thought
                  </div>
                  <div className={styles['review-description']}>
                    Fourth Wing was epic, breathtaking and consumed my every thought. This is easily one of my top favorite books, ever. This book had me screaming from excitement, gasping from betrayal, and crying all the happy and sad tears. Foreshadowing of what was to come was secretly laced into the pages, leaving us with the feeling of dread that was all consuming. The betrayals cut deep. The friendships were beautiful. The enemies to lovers romance was a slow burn that was passionate and steamy. And the battles were intense and epic. If you love romantasy, you definitely need this one on your tbr!
                  </div>
                  <div className={styles['review-date']}>
                    10-06-2023 20:28
                  </div>
                </div>
              </div>
            </section>
          </div>
          <section className={styles.offer}>
            <div className={styles.price}>{product.price}₸</div>

            {!inCart
              ? <button
                className={button.primary}
                onClick={addToCart}>
                Add to cart
              </button> : <Link className={`${button['primary-bordered']} ${styles.btn}`} href="/cart">Proceed to checkout</Link>}
          </section>
        </section>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const productId = context.query.id
  const response = await axios.get(`/api/products/?id=${productId}`)
  const product = await response.data
  const response2 = await axios.get(`/api/categories/`)
  const categories = await response2.data

  return {
    props: {
      product,
      categories,
    }
  }
}

export default Product