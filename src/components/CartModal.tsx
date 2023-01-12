import * as Dialog from '@radix-ui/react-dialog'
import Image from 'next/image'
import { X } from 'phosphor-react'
import { ChangeEvent } from 'react'
import { useCart } from '../hooks/useCart'
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
  const { cartProducts, changeProductQuantity, deleteProductInCart } = useCart()

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

  return (
    <Dialog.Portal>
      <CartModalOverlay />
      <CartModalContent>
        <Close>
          <X size={24} weight="bold" />
        </Close>
        <form>
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
          </CardModalContainer>
        </form>
      </CartModalContent>
    </Dialog.Portal>
  )
}
