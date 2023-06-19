import bcrypt from 'bcrypt'
import Customer from '../../models/customerModel'
import { generateToken } from '../../utils/jwt'
import { connectMongoDB } from '../../utils/connectMongo'

export default async function handle(req, res) {
  const { method } = req
  await connectMongoDB()
  try {
    if (method === 'POST') {
      const { email, password } = req.body;
      const customer = await Customer.findOne({ email });

      if (customer && bcrypt.compare(password, customer.password)) {
        const { password: _, ...customerWithoutPassword } = customer._doc;
        const token = generateToken(customer._id);
        res.status(200).json({ ...customerWithoutPassword, token });
      } else {
        res.status(400).json({ message: 'Email or password are incorrect' });
      }
    } else {
      res.status(405).json('Method Not Allowed');
    }
  } catch (error) {
    res.status(500).json(`Server signin error ${error}`)
  }
}