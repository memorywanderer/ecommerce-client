import { connectMongoDB } from '../../utils/connectMongo'
import Order from '../../models/orderModel'
const stripe = require('stripe')(process.env.STRIPE_SK)

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      await connectMongoDB()
      const { name, email, city, postalCode, streetAddress, country, products } = req.body

      let line_items = []
      products.forEach(product => {
        line_items.push({
          quantity: product.quantity,
          price_data: {
            currency: 'USD',
            product_data: { name: product.product.title },
            unit_amount: product.quantity * product.product.price * 100,
          }
        })
      })

      console.log(line_items)
      const order = await Order.create({
        line_items,
        name, email, city,
        postalCode, streetAddress,
        country, paid: false,
      })

      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart/success=true',
        cancel_url: process.env.PUBLIC_URL + '/cart/cancel=true',
        metadata: { orderId: order._id.toString() }
      })
      return res.status(200).json({
        url: session.url
      })
    } else {
      return res.status(409).json('Method is not allowed')
    }
  } catch (error) {
    return res.status(500).json({ message: `Server error: ${error}` })
  }

} 