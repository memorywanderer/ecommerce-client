import { connectMongoDB } from "../../utils/connectMongo"
import Category from "../../models/categoryModel"

export default async function handler(req, res) {
  await connectMongoDB()
  const { method } = req
  try {
    if (method === 'GET') {
      if (req.query.id) {
        const category = await Category.findById(req.query.id)
        if (category) {
          res.status(200).json(category)
        } else {
          res.status(404).json({ message: `Category with id ${req.query.id} not found` })
        }
      } else {
        const categories = await Category.find().populate('parentCategory')
        if (categories.length > 0) {
          res.status(200).json(categories)
        } else {
          res.status(404).json({ message: 'Categories not found' })
        }
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' })
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error.message}` })
  }
}