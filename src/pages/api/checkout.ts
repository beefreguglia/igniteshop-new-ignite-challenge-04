import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

interface Product {
  price: string
  quantity: number
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const purchasedProducts: Product[] = req.body

  if (req.method !== 'POST') {
    return res.status(505).json({ error: 'Method not allowed.' })
  }

  if (purchasedProducts.length <= 0) {
    return res.status(400).json({ error: 'Product not found!' })
  }

  purchasedProducts.forEach((product) => {
    if (!product.price) {
      return res.status(400).json({ error: 'Price not found' })
    }
  })

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`
  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: purchasedProducts,
  })

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  })
}
