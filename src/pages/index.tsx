import Image from 'next/image'
import { styled } from '../styles'
import { HomeContainer, HomeProduct } from '../styles/pages/home'

import camisa1 from '../assets/camisas/1.png'
import camisa2 from '../assets/camisas/2.png'
import camisa3 from '../assets/camisas/3.png'
import camisa4 from '../assets/camisas/4.png'

export default function Home() {
  return (
    <HomeContainer>
      <HomeProduct>
        <Image src={camisa1} width={520} height={480} alt='' />
        <footer>
          <strong>
            Camisa X
          </strong>
          <span>R$ 79.90</span>
        </footer>
      </HomeProduct>
      <HomeProduct>
        <Image src={camisa2} width={520} height={480} alt='' />
        <footer>
          <strong>
            Camisa X
          </strong>
          <span>R$ 79.90</span>
        </footer>
      </HomeProduct>
      <HomeProduct>
        <Image src={camisa3} width={520} height={480} alt='' />
        <footer>
          <strong>
            Camisa X
          </strong>
          <span>R$ 79.90</span>
        </footer>
      </HomeProduct>
      <HomeProduct>
        <Image src={camisa4} width={520} height={480} alt='' />
        <footer>
          <strong>
            Camisa X
          </strong>
          <span>R$ 79.90</span>
        </footer>
      </HomeProduct>
    </HomeContainer>
  )
}
