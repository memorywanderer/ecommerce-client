import { connectMongoDB } from "../../utils/connectMongo"
import Cart from "../../models/cartModel"

export default async function handler(req, res) {
  await connectMongoDB()
  const { method } = req
  try {
    if (method === 'GET') {
      const { customerId } = req.query;
      const cart = await Cart.findOne({ customerId }).populate('cartItems.product');
      console.log(cart);
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(404).json('Not found');
      }
    }

    if (method === 'PUT') {
      const { customerId, cartItems } = req.body;
      console.log({ cartItems })
      const customerCart = await Cart.findOne({ customerId });
      if (customerCart) {
        // If cart exists, update the cartItems by adding the new items
        const updatedCart = await Cart.findOneAndUpdate(
          { customerId },
          { cartItems },
          { new: true }
        )
        console.log({ updatedCart })
        res.status(200).json(updatedCart);
      }
    }
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error}` })
  }
}