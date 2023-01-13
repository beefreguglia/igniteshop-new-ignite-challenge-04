import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  ProductImagesContainer,
  SuccessContainer,
} from '../styles/pages/success'

interface Product {
  quantity: number
  imageUrl: string
  id: string
}

interface SuccessProps {
  customerName: string
  products: Product[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const totalQuantity = products.reduce(
    (totalQuantity, product) => (totalQuantity += product.quantity),
    0,
  )
  return (
    <>
      <Head>
        <title>Compra Efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
        <ProductImagesContainer>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image src={product.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          ))}
        </ProductImagesContainer>

        {totalQuantity === 1 ? (
          <p>
            Uhuul! <strong>{customerName}</strong>, sua compra de{' '}
            {totalQuantity} camiseta já está a caminho da sua casa.
          </p>
        ) : (
          <p>
            Uhuul! <strong>{customerName}</strong>, sua compra de{' '}
            {totalQuantity} camisetas já está a caminho da sua casa.
          </p>
        )}

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  const customerName = session.customer_details!.name
  const products = session.line_items?.data
  const formattedProducts = products?.map((lineItem) => {
    const price = lineItem.price as Stripe.Price
    const product = price.product as Stripe.Product
    return {
      imageUrl: product.images[0],
      quantity: lineItem.quantity,
      id: price.id,
    }
  })

  return {
    props: {
      customerName,
      products: formattedProducts,
    },
  }
}
