import axios from "axios"
import { useFormik } from "formik"
import * as yup from 'yup'
import { useState } from "react"
import { useRouter } from "next/router"
import form from '../styles/Form.module.css'
import button from '../styles/Button.module.css'
import Link from "next/link"

const Signup = () => {
  const [isSubmitting, setIsSubmiting] = useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      email: yup.string().required('Email is required'),
      password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password
      }
      try {
        setIsSubmiting(true)
        const response = await axios.post('/api/signup', payload)
        if (response) {
          router.push('/signin')
        }
      } catch (error) {
        console.error(error)
        setFieldError('confirmPassword', error.response.data.message);
      } finally {
        setIsSubmiting(false)
      }
    }
  })
  return (
    <div className={form.container}>
      <form className={form.form} onSubmit={formik.handleSubmit}>
        <div className={form.field}>
          <label className={form.label} htmlFor="firstName">First name:</label>
          <input
            className={form.input}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.errors.firstName && formik.touched.firstName ? <div className={form.error}>{formik.errors.firstName}</div> : null}
        </div>
        <div className={form.field}>
          <label className={form.label} htmlFor="lastName">Last name:</label>
          <input
            className={form.input}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && formik.touched.lastName ? <div className={form.error}>{formik.errors.lastName}</div> : null}
        </div>
        <div className={form.field}>
          <label className={form.label} htmlFor="email">Email:</label>
          <input
            className={form.input}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? <div className={form.error}>{formik.errors.email}</div> : null}
        </div>
        <div className={form.field}>
          <label className={form.label} htmlFor="password">Password:</label>
          <input
            className={form.input}
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? <div className={form.error}>{formik.errors.password}</div> : null}
        </div>
        <div className={form.field}>
          <label className={form.label} htmlFor="confirmPassword">Confirm password:</label>
          <input
            className={form.input}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? <div className={form.error}>{formik.errors.confirmPassword}</div> : null}
        </div>
        <button className={button.primary} type="submit" disabled={isSubmitting}>{!isSubmitting ? 'Sign up' : 'Signing up...'}</button>
        <p className={form.label}>Already have an account?<Link className={button.link} href='/signin'>Sign in</Link></p>
      </form>
    </div>
  )
}
export default Signup