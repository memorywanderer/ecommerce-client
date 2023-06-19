import { createContext, useReducer } from "react"
import { getLocalStorageItem, setLocalStorageItem } from "../hooks/useLocalStorage"
import axios from "axios"

export const Store = createContext()

/*
 Если существуют состояния в localStorage, берём их,
 либо задаем новые пустые значения для товаров, адреса и способа оплаты
*/

const initialState = {
  cart: getLocalStorageItem('cart') || {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: ''
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    /*
     CART_ADD_ITEM
     Новый элемент(newItem) передается в payload
     Проверка существует ли элемент
     Если да, то обновляем элемент в массиве
     Если нет, то создаем новый элемент
     Добавляем полученные данные в localStorage
     Возвращаем их же
    */
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.product.slug === newItem.product.slug
      );
      let cartItems;

      if (existItem) {
        cartItems = state.cart?.cartItems.map((item) => (
          item.product.slug === existItem.product.slug ? { product: newItem.product, quantity: newItem.quantity } : item
        ))
      } else {
        cartItems = [...state.cart?.cartItems, { product: newItem.product, quantity: newItem.quantity }];
      }

      setLocalStorageItem('cart', { ...state.cart, cartItems });

      return { ...state, cart: { ...state.cart, cartItems } };
    }

    /*
     CART_REMOVE_ITEM
     Оставляем в массиве только те элементы, 
     которые не равны переданному в payload
     Добавляем полученные данные в localStorage
     Возвращаем их же
    */
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.product._id !== action.payload._id
      );
      setLocalStorageItem('cart', { ...state.cart, cartItems });

      return {
        ...state,
        cart: { ...state.cart, cartItems },
      };
    }

    /**
     * CART_RESET
     * Возвращаем все данные в изначальное состояние
     * Добавляем полученные данные в localStorage
     * Возвращаем их же
     */
    case 'CART_RESET': {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: ''
        }
      }
    }
    /**
     * CART_CLEAR_ITEMS
     * Очистка всех товаров в корзине
     * Все остальное остается без изменения
     */
    case 'CART_CLEAR_ITEMS': {
      return {
        ...state, cart: { ...state.cart, cartItems: [] }
      }
    }
    /**
     * SAVE_PAYMENT_METHOD
     * Сохраняем способ оплаты из payload
     */
    case 'SAVE_PAYMENT_METHOD': {
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload
        }
      }
    }
    default: {
      return state
    }
  }
}

export const StoreProvider = ({ children }) => {

  const addProductToCart = async (customerId, cartItems) => {
    try {
      const response = await axios.put('/api/cart', { customerId, cartItems })
      console.log('Add product response:', response)
    } catch (error) {
      console.error("Error in axios add product: ", error)
    }
  }
  /**
   * В переменной state все состояния из initialState
   * В dipatch методы из reducer
   */
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch, addProductToCart }
  return <Store.Provider value={value}>{children}</Store.Provider>
}