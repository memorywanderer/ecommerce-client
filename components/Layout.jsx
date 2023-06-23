import { useEffect, useState } from "react"
import { BottomMenu } from "./BottomMenu/BottomMenu"
import { Footer } from "./Footer/Footer"
import { Spinner } from "./Spinner/Spinner"
import { useRouter } from "next/router"

export const Layout = ({ children }) => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const start = () => {
      setLoading(true)
    }
    const end = () => {
      setLoading(false)
    }

    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', end)
    router.events.on('routeChangeError', end)

    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', end)
      router.events.off('routeChangeError', end)
    }
  }, [])

  if (loading) {
    return <Spinner />
  }
  return (
    <>
      <BottomMenu />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}