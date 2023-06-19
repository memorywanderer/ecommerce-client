import bcrypt from 'bcrypt'
import Customer from '../../models/customerModel'
import Cart from '../../models/cartModel'
import { connectMongoDB } from '../../utils/connectMongo'

export default async function handler(req, res) {
  const { method } = req
  await connectMongoDB()
  try {
    if (method === 'POST') {
      const { email, password } = req.body
      const userExists = await Customer.findOne({ email })
      if (!userExists) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newCustomer = await Customer.create({
          ...req.body,
          password: hashedPassword,
        })

        const newCart = await Cart.create({
          customerId: newCustomer._id,
          cartItems: [],
        })
        if (newCustomer) {
          newCustomer.shoppingCart = newCart._id
          await newCustomer.save()
          const { password: _, ...customerWithoutPassword } = newCustomer._doc;
          res.status(201).json({ customer: customerWithoutPassword })
        } else {
          res.status(400).json({ message: 'Error in customer creation' })
        }
      } else {
        res.status(409).json({ message: 'User already exists' });
      }
    } else {
      res.status(405).json('Method Not Allowed')
    }
  } catch (error) {
    res.status(500).json(`Server signup error ${error}`)
  }
}