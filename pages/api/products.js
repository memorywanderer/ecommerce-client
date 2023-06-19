import { connectMongoDB } from '../../utils/connectMongo'
import Product from '../../models/productModel'
import Category from '../../models/categoryModel'

export default async function handler(req, res) {
  await connectMongoDB()
  const { method } = req
  try {
    if (method === 'GET') {
      const {
        id,
        category,
        authors,
        minPrice,
        maxPrice } = req.query

      // All products
      if (!id && !category && !authors && !minPrice && !maxPrice) {
        const products = await Product.find()
        if (products.length > 0) {
          return res.status(200).json(products)
        } else {
          return res.status(404).json({ message: 'Products not found' })
        }
      }

      // Get product by id
      if (id) {
        const product = await Product.findById(id).populate('category')
        if (product) {
          return res.status(200).json(product)
        } else {
          return res.status(404).json({ message: `Product with id of ${id} not found` })
        }
      }

      // Filter by author and price
      if (authors || (minPrice && maxPrice)) {
        let filters = {}
        if (authors) {
          filters.author = {
            $in: authors.split(',')
          }
        }
        if (minPrice && maxPrice) {
          filters.price = {
            $gte: minPrice,
            $lte: maxPrice
          }
        }

        console.log(filters)
        const filteredProducts = await Product.find(filters).populate('category')
        const categoryToSearch = await Category.findOne({ name: category })
        const parentId = categoryToSearch._id

        const filteredProductsByCategory = filteredProducts.filter(product => {
          const productCategory = product.category
          return (
            productCategory.name === categoryToSearch.name ||
            (productCategory.parentCategory && productCategory.parentCategory.equals(parentId))
          )
        })


        if (filteredProductsByCategory.length > 0) {
          return res.status(200).json(filteredProductsByCategory)
        } else {
          return res.status(404).json({ message: "Not found" })
        }
      }

      // Get items by cateogory
      if (category) {
        console.log(category)
        const allProducts = await Product.find().populate('category')
        const categoryToSearch = await Category.findOne({ name: category })
        const parentId = categoryToSearch._id

        const filteredProducts = allProducts.filter(product => {
          const productCategory = product.category
          return (
            productCategory.name === categoryToSearch.name ||
            (productCategory.parentCategory && productCategory.parentCategory.equals(parentId))
          )
        })

        if (filteredProducts.length > 0) {
          return res.status(200).json(filteredProducts)
        } else {
          return res.status(404).json({ message: `Product with category ${category} not found` })
        }
      }
    }

    if (method === 'POST') {
      const { searchValue } = req.body
      const products = await Product.find({ title: { $regex: searchValue, $options: 'i' } })
      if (products.length > 0) {
        return res.status(200).json(products)
      } else {
        return res.status(404).json({ message: 'Product not found' })
      }
    }

    return res.status(405).json({ message: 'Method Not Allowed' })
  } catch (error) {
    console.error('Error in api products: ', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
