/* eslint-disable no-unused-vars */
// import { useRouter } from 'next/router'
import {
  ImageProductContainer,
  ProductContainer,
  ProductDetails,
} from '../../styles/pages/product'

export default function Product() {
  // const { query } = useRouter()
  return (
    <ProductContainer>
      <ImageProductContainer></ImageProductContainer>
      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79.90</span>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
          labore vitae provident quaerat. Possimus officiis nemo iusto veniam
          sint corrupti dolores excepturi. Cumque vero dignissimos inventore
          quisquam hic unde sint.
        </p>
        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
