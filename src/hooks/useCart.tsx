import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'react-toastify'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  quantity: number
}

interface CartContextInterface {
  cartProducts: Product[]
  addProductInCart: (product: Product) => void
  quantityOfProductsInCart: number
}

interface ProductContextProviderProps {
  children: ReactNode
}

const CartContext = createContext({} as CartContextInterface)

export function CartContextProvider({ children }: ProductContextProviderProps) {
  const [cartProducts, setCartProducts] = useState<Product[]>([])
  const quantityOfProductsInCart = cartProducts.reduce(
    (prevCartQuantity, currentCartProduct) => prevCartQuantity + currentCartProduct.quantity,
    0,
  )

  function addProductInCart(product: Product) {
    const findedProduct = cartProducts.find((cartProduct) => cartProduct.id === product.id)
    if (findedProduct) {
      const updatedProducts = cartProducts.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return ({
            ...cartProduct,
            quantity: cartProduct.quantity += product.quantity,
          })
        }
        return cartProduct
      })
      setCartProducts(updatedProducts)  
    } else {
      setCartProducts((state) => [...state, product])
    }

    toast.success('O produto foi adicionado com sucesso!')
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        quantityOfProductsInCart,
        addProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const cartContext = useContext(CartContext)
  return cartContext
}
