import { Suspense } from "react"
import { BottomMenu } from "./BottomMenu/BottomMenu"
import { Footer } from "./Footer/Footer"
import { Loading } from "./Loading"

export const Layout = ({ children }) => {
  return (
    <>
      <BottomMenu />
      <main>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </>
  )
}