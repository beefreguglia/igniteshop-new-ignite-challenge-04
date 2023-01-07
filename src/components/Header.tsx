import Image from 'next/image'
import Link from 'next/link'
import { CartButton } from './CartButton'
import logoImg from '../assets/logo.svg'
import { HeaderContainer } from '../styles/components/Header'

export function Header() {
  return (
    <HeaderContainer>
      <Link href="/" prefetch={false}>
        <Image src={logoImg} alt="Logo ignite shop" />
      </Link>
      <CartButton variant="gray" />
    </HeaderContainer>
  )
}
