import { useFormik } from "formik"
import * as yup from 'yup'
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"
import form from '../styles/Form.module.css'
import button from '../styles/Button.module.css'

const Signin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: yup.object({
      email: yup.string().required('Email is required'),
      password: yup.string().required('Password is required')
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        setIsSubmitting(true);
        const response = await signIn('credentials', {
          ...values,
          redirect: false
        })
        if (response.ok) {
          router.push('/');
        } else {
          setFieldError('password', 'Incorrect email or password');
        }
      } catch (error) {
        console.error(error);
        setFieldError('password', 'An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  })
  return (
    <div className={form.container}>
      <form className={form.form} onSubmit={formik.handleSubmit}>
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

        <button
          className={button.primary}
          type="submit"
          disabled={isSubmitting}>
          {!isSubmitting ? 'Sign in' : 'Signing in...'}
        </button>

        <p className={form.label}>Doesn&apos;t have an account?<Link className={button.link} href='/signup'>Sign up</Link></p>

      </form>
    </div>
  )
}
export default Signin