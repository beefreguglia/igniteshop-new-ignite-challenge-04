import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'

import { stripe } from '../../lib/stripe'
import {
  ImageProductContainer,
  ProductContainer,
  ProductDetails,
  SkeletonButton,
  SkeletonDescriptionLine,
  SkeletonImage,
  SkeletonPrice,
  SkeletonTitle,
} from '../../styles/pages/product'

interface ProductProps {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
}

export default function Product({
  description,
  imageUrl,
  name,
  price,
  defaultPriceId,
}: ProductProps) {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { isFallback } = useRouter()

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)
      const response = await axios.post('/api/checkout', {
        priceId: defaultPriceId,
      })

      const { checkoutUrl } = response.data
      console.log(response.data)
      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao redirecionar ao checkout')
    }
  }

  if (isFallback) {
    return (
      <ProductContainer>
        <SkeletonImage />
        <ProductDetails>
          <SkeletonTitle />
          <SkeletonPrice />
          <SkeletonDescriptionLine line="1" />
          <SkeletonDescriptionLine line="2" />
          <SkeletonDescriptionLine line="3" />
          <SkeletonDescriptionLine line="4" />
          <SkeletonButton />
        </ProductDetails>
      </ProductContainer>
    )
  }

  return (
    <ProductContainer>
      <ImageProductContainer>
        <Image src={imageUrl} width={520} height={480} alt="" />
      </ImageProductContainer>
      <ProductDetails>
        <h1>{name}</h1>
        <span>{price}</span>
        <p>{description}</p>
        <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
          Comprar agora
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_N3zax7FdTtIxol' } },
      { params: { id: 'prod_N3zZ5jrnmUkaUV' } },
    ],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id

  const product = await stripe.products.retrieve(productId!, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price
  return {
    props: {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount! / 100),
      description: product.description,
      defaultPriceId: price.id,
    },
    revalidate: 60 * 60 * 1, // 1 horas,
  }
}
