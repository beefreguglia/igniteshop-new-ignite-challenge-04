import { GetStaticProps } from 'next'
import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { HomeContainer, HomeProduct } from '../styles/pages/home'

import { stripe } from '../lib/stripe'
import Stripe from 'stripe'

interface Product {
  id: number
  name: string
  imageUrl: string
  price: number
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.3,
      spacing: 48,
    },
  })

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products?.map((product) => (
        <HomeProduct key={product.id} className="keen-slider__slide">
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
          />
          <footer>
            <strong>{product.name}</strong>
            <span>{product.price}</span>
          </footer>
        </HomeProduct>
      ))}
    </HomeContainer>
  )
}

//  getServerSideProps example
// export const getServerSideProps: GetServerSideProps = async () => {
//   const response = await stripe.products.list({
//     expand: ['data.default_price'],
//   })

//   const products = response.data.map((product) => {
//     const price = product.default_price as Stripe.Price
//     return {
//       id: product.id,
//       name: product.name,
//       imageUrl: product.images[0],
//       price: price.unit_amount! / 100,
//     }
//   })

//   return {
//     props: {
//       products,
//     },
//   }
// }

// Não funciona em ambiente de desenvolvimento
export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount! / 100,
    }
  })

  return {
    props: {
      products,
    },
  }
}
