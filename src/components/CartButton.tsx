import { Handbag } from 'phosphor-react'
import { ButtonHTMLAttributes } from 'react'
import {
  CartButtonContainer,
  CartStyledButton,
} from '../styles/components/CartButton'

type Variant = 'gray' | 'green'
type Size = 'sm' | 'md'

interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: Variant
  size?: Size
}

export function CartButton({ variant, size = 'sm', ...rest }: CartButtonProps) {
  return (
    <CartButtonContainer>
      <CartStyledButton variant={variant} {...rest}>
        {size === 'sm' ? (
          <Handbag size={24} weight="bold" />
        ) : (
          <Handbag size={32} weight="bold" />
        )}
      </CartStyledButton>
    </CartButtonContainer>
  )
}
