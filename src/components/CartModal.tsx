import * as Dialog from '@radix-ui/react-dialog'
import axios from 'axios'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'react-toastify'
import { Product, useCart } from '../hooks/useCart'
import {
  CardImageContainer,
  CardModalContainer,
  CardModalContent,
  CartModalContent,
  CartModalOverlay,
  Close,
  DescriptionCardContainer,
  RemoveButton,
  Title,
} from '../styles/components/CartModal'
import NumberInput from './NumberInput'

export function CartModal() {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const {
    cartProducts,
    changeProductQuantity,
    deleteProductInCart,
    totalPrice,
    quantityOfProductsInCart,
  } = useCart()
  const formattedTotalPrice = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(totalPrice / 100)
  function handleChangeProductQuantity(
    event: ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    changeProductQuantity(id, Number(event.target.value))
  }

  function handleSumOneProductQuantity(productId: string, quantity: number) {
    changeProductQuantity(productId, quantity + 1)
  }

  function handleSubOneProductQuantity(productId: string, quantity: number) {
    changeProductQuantity(productId, quantity - 1)
  }

  function handleDeleteProduct(productId: string) {
    deleteProductInCart(productId)
  }

  async function handleCartPurchase(cart: Product[]) {
    event?.preventDefault()
    setIsCreatingCheckoutSession(true)
    const formattedCheckoutData = cart.map((cartProduct) => ({
      price: cartProduct.priceId,
      quantity: cartProduct.quantity,
    }))
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', formattedCheckoutData)
      const { checkoutUrl } = response.data
      window.location.href = checkoutUrl
    } catch (e) {
      setIsCreatingCheckoutSession(false)
      toast.error('Falha ao redirecionar ao checkout')
    }
  }

  return (
    <Dialog.Portal>
      <CartModalOverlay />
      <CartModalContent>
        <Close>
          <X size={24} weight="bold" />
        </Close>
        <form onSubmit={() => handleCartPurchase(cartProducts)}>
          <Title>Sacola de compras</Title>
          <CardModalContainer>
            {cartProducts.length > 0 &&
              cartProducts.map((cartProduct, index) => {
                const formattedPrice = new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format((cartProduct.price * cartProduct.quantity) / 100)
                return (
                  <CardModalContent key={cartProduct.id}>
                    <CardImageContainer>
                      <Image
                        src={cartProduct.imageUrl}
                        width={100}
                        height={100}
                        alt=""
                      />
                    </CardImageContainer>
                    <DescriptionCardContainer>
                      <p>{cartProduct.name}</p>
                      <NumberInput
                        id={`product-${index + 1}`}
                        value={cartProduct.quantity}
                        onChange={(event) =>
                          handleChangeProductQuantity(event, cartProduct.id)
                        }
                        increaseProductQuantity={() =>
                          handleSumOneProductQuantity(
                            cartProduct.id,
                            cartProduct.quantity,
                          )
                        }
                        decreaseProductQuantity={() =>
                          handleSubOneProductQuantity(
                            cartProduct.id,
                            cartProduct.quantity,
                          )
                        }
                      />
                      <span>{formattedPrice}</span>
                      <RemoveButton
                        onClick={() => handleDeleteProduct(cartProduct.id)}
                      >
                        Remover
                      </RemoveButton>
                    </DescriptionCardContainer>
                  </CardModalContent>
                )
              })}
            <footer>
              <div>
                <p>Quantidade</p>
                <p>{quantityOfProductsInCart} itens</p>
              </div>
              <div>
                <p>
                  <span>Valor total</span>
                </p>
                <p>
                  <span className="price">{formattedTotalPrice}</span>
                </p>
              </div>
              <button disabled={isCreatingCheckoutSession} type="submit">
                Finalizar compra
              </button>
            </footer>
          </CardModalContainer>
        </form>
      </CartModalContent>
    </Dialog.Portal>
  )
}
