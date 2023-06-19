import axios from "axios"
import { Header } from "../components/Header/Header"
import { useContext } from "react"
import { Store } from "../utils/store"
import styles from '../styles/Checkout.module.css'
import form from '../styles/Form.module.css'
import button from '../styles/Button.module.css'
import typography from '../styles/Typography.module.css'
import { useFormik } from "formik"
import * as yup from 'yup'
import { useRouter } from "next/router"

const Checkout = ({ categories }) => {
  const { state } = useContext(Store)
  const { cart } = state
  const { cartItems } = cart || {}

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      city: '',
      postalCode: '',
      streetAddress: '',
      country: '',
      products: cartItems || []
    },
    validationSchema: yup.object({
      name: yup.string().required('Name is required'),
      email: yup.string().required('Email is required'),
      city: yup.string().required('City is required'),
      postalCode: yup.string().required('Postal code is required'),
      streetAddress: yup.string().required('Street address is required'),
      country: yup.string().required('Country is required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/checkout', values)
        router.push(response.data.url)
      } catch (error) {
        console.error(error.response)
      }
    }
  })
  return (
    <>
      <Header categories={categories} />
      <div className="container">
        <h1 className={typography['title-36']}>Your order</h1>
        <div className={styles.body}>
          <div>
            <div className={styles.grid}>
              {cartItems.map((item, index) => {
                return <div className={styles['order-item']} key={item.product._id}>{index + 1}. {item.product.title} {item.product.price}₸</div>
              })}
            </div>
            <div className={styles['order-info']}>
              <div>{cartItems.length} items</div>
              <div className={styles.cost}>
                <div className={typography['title-24']}>Subtotal</div>
                <div className={styles.price}>
                  {cartItems.reduce((a, c) => a + c.quantity * c.product.price, 0)}₸
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container}>
            <form className={`${form.form} ${styles.form}`} onSubmit={formik.handleSubmit}>
              <div className={form.field}>
                <label htmlFor="name">Name:</label>
                <input
                  className={form.input}
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Your name"
                />
                {formik.errors.name && formik.touched.name ? <div className={form.error}>{formik.errors.name}</div> : null}
              </div>
              <div className={form.field}>
                <label htmlFor="email">Email:</label>
                <input
                  className={form.input}
                  type="text"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                />
                {formik.errors.email && formik.touched.email ? <div className={form.error}>{formik.errors.email}</div> : null}
              </div>
              <div className={styles.row}>
                <div className={form.field}>
                  <label htmlFor="email">City:</label>
                  <input
                    className={form.input}
                    type="text"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    placeholder="City"
                  />
                  {formik.errors.city && formik.touched.city ? <div className={form.error}>{formik.errors.city}</div> : null}
                </div>
                <div className={form.field}>
                  <label htmlFor="email">Postal code:</label>
                  <input
                    className={form.input}
                    type="text"
                    name="postalCode"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    placeholder="Postal code"
                  />
                  {formik.errors.postalCode && formik.touched.postalCode ? <div className={form.error}>{formik.errors.postalCode}</div> : null}
                </div>
              </div>
              <div className={form.field}>
                <label htmlFor="email">Street address:</label>
                <input
                  className={form.input}
                  type="text"
                  name="streetAddress"
                  value={formik.values.streetAddress}
                  onChange={formik.handleChange}
                  placeholder="Street address"
                />
                {formik.errors.streetAddress && formik.touched.streetAddress ? <div className={form.error}>{formik.errors.streetAddress}</div> : null}
              </div>
              <div className={form.field}>
                <label htmlFor="email">Country:</label>
                <input
                  className={form.input}
                  type="text"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  placeholder="Country"
                />
                {formik.errors.country && formik.touched.country ? <div className={form.error}>{formik.errors.country}</div> : null}

              </div>
              <div hidden>
                <label htmlFor="email">Products:</label>
                <input
                  className={form.input}
                  type="text"
                  name="products"
                  value={formik.values.products}
                  readOnly
                  required
                />

              </div>
              <button className={button.primary}>Continue to payment</button>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}

export const getServerSideProps = async () => {
  try {
    const response = await axios.get('/api/categories')
    const categories = response.data

    return {
      props: {
        categories
      }
    }
  } catch (error) {
    console.error(error.response)
  }
}

export default Checkout