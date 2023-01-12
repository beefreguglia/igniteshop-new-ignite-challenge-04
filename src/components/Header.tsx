import Image from 'next/image'
import Link from 'next/link'
import * as Dialog from '@radix-ui/react-dialog'
import { CartButton } from './CartButton'
import { useCart } from '../hooks/useCart'
import logoImg from '../assets/logo.svg'
import { HeaderContainer } from '../styles/components/Header'
import { CartModal } from './CartModal'

export function Header() {
  const { quantityOfProductsInCart } = useCart()
  console.log(quantityOfProductsInCart)
  return (
    <>
      <HeaderContainer>
        <Link href="/" prefetch={false}>
          <Image src={logoImg} alt="Logo ignite shop" />
        </Link>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <CartButton
              variant="gray"
              productsQuantity={quantityOfProductsInCart}
            />
          </Dialog.Trigger>
          <CartModal />
        </Dialog.Root>
      </HeaderContainer>
    </>
  )
}
