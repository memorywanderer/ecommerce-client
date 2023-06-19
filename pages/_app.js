import { SessionProvider } from 'next-auth/react'
import '../styles/globals.css'
import { StoreProvider } from '../utils/store'
import { Layout } from '../components/Layout'

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider>
      <StoreProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StoreProvider>
    </SessionProvider>
  )
}


export default MyApp
