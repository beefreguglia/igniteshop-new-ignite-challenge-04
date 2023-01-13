import { GetStaticProps } from 'next'
import Image from 'next/image'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import { HomeContainer, HomeProduct } from '../styles/pages/home'

import { stripe } from '../lib/stripe'
import Stripe from 'stripe'
import Link from 'next/link'
import Head from 'next/head'
import { CartButton } from '../components/CartButton'
import { useCart } from '../hooks/useCart'

interface Product {
  id: string
  name: string
  imageUrl: string
  priceInCents: number
  quantity: number
  formattedPrice: string
  defaultPriceId: string
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const { addProductInCart } = useCart()

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.3,
      spacing: 48,
    },
  })

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products?.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            prefetch={false}
          >
            <HomeProduct className="keen-slider__slide">
              <Image
                src={product.imageUrl}
                width={520}
                height={480}
                alt={product.name}
              />
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{product.formattedPrice}</span>
                </div>
                <CartButton
                  variant="green"
                  onClick={(event) => {
                    event.preventDefault()
                    addProductInCart({
                      id: product.id,
                      imageUrl: product.imageUrl,
                      name: product.name,
                      price: product.priceInCents,
                      quantity: 1,
                      priceId: product.defaultPriceId,
                    })
                  }}
                />
              </footer>
            </HomeProduct>
          </Link>
        ))}
      </HomeContainer>
    </>
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
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price.unit_amount! / 100)

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      priceInCents: price.unit_amount,
      formattedPrice,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas,
  }
}
