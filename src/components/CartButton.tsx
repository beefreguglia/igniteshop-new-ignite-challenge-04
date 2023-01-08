import { Handbag } from 'phosphor-react'
import { ButtonHTMLAttributes } from 'react'
import {
  CartButtonContainer,
  CartQuantity,
  CartStyledButton,
} from '../styles/components/CartButton'

type Variant = 'gray' | 'green'
type Size = 'sm' | 'md'

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant
  size?: Size
  productsQuantity?: number
}

export function CartButton({ 
  variant, 
  size = 'sm', 
  productsQuantity = 0, 
  ...rest
}: CartButtonProps) {
  const haveProductsInCart = productsQuantity > 0
  return (
    <CartButtonContainer>
      <CartStyledButton variant={variant} {...rest}>
        {size === 'sm' ? (
          <Handbag size={24} weight="bold" />
        ) : (
          <Handbag size={32} weight="bold" />
        )}
        { haveProductsInCart && (
          <>
            { productsQuantity < 10 ? (
              <CartQuantity variant='small'>{productsQuantity}</CartQuantity>
            ) : (
              <CartQuantity variant='large'>{productsQuantity}</CartQuantity>
            )}
          </>
        )}
      </CartStyledButton>
    </CartButtonContainer>
  )
}
