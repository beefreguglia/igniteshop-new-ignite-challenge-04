import { createContext, ReactNode, useContext, useState } from 'react'
import { toast } from 'react-toastify'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
}

interface CartContextInterface {
  cartProducts: Product[]
  quantityOfProductsInCart: number
  addProductInCart: (product: Product) => void
  changeProductQuantity: (productId: string, quantity: number) => void
  deleteProductInCart: (productId: string) => void
}

interface ProductContextProviderProps {
  children: ReactNode
}

const CartContext = createContext({} as CartContextInterface)

export function CartContextProvider({ children }: ProductContextProviderProps) {
  const [cartProducts, setCartProducts] = useState<Product[]>([])
  const quantityOfProductsInCart = cartProducts.reduce(
    (prevCartQuantity, currentCartProduct) =>
      prevCartQuantity + currentCartProduct.quantity,
    0,
  )

  function addProductInCart(product: Product) {
    const findedProduct = cartProducts.find(
      (cartProduct) => cartProduct.id === product.id,
    )
    if (findedProduct) {
      const updatedProducts = cartProducts.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: (cartProduct.quantity += product.quantity),
          }
        }
        return cartProduct
      })
      setCartProducts(updatedProducts)
    } else {
      setCartProducts((state) => [...state, product])
    }

    toast.success('O produto foi adicionado com sucesso!')
  }

  function deleteProductInCart(productId: string) {
    const filteredProducts = cartProducts.filter(
      (cartProduct) => cartProduct.id !== productId,
    )
    setCartProducts(filteredProducts)
    toast.success('Produto removido com sucesso!')
  }

  function changeProductQuantity(productId: string, quantity: number) {
    let isToDeleteProduct = false
    const updatedProducts = cartProducts.map((cartProduct) => {
      if (cartProduct.id === productId) {
        if (quantity > 10) {
          toast.error(
            'Não é possível colocar mais que 10 items do mesmo produto no carrinho',
          )
          return {
            ...cartProduct,
            quantity: 10,
          }
        }
        if (quantity <= 0) {
          if (confirm('Deseja remover o produto do carrinho ?')) {
            isToDeleteProduct = true
            return cartProduct
          } else {
            return {
              ...cartProduct,
              quantity: 1,
            }
          }
        }
        return {
          ...cartProduct,
          quantity,
        }
      }
      return cartProduct
    })
    setCartProducts(updatedProducts)
    if (isToDeleteProduct) {
      deleteProductInCart(productId)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        quantityOfProductsInCart,
        addProductInCart,
        changeProductQuantity,
        deleteProductInCart,
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
