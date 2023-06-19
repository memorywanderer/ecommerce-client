import { useContext } from "react"
import { Store } from "../utils/store"

export const useCartContext = () => {
  const { state, dispatch } = useContext(Store)
  return { state, dispatch }
}