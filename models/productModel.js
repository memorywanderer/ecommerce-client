import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Add a title'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Add an author'],
  },
  description: {
    type: String,
    required: [true, 'Add a description']
  },
  price: {
    type: Number,
    required: [true, 'Add a price']
  },
  stock: {
    type: Number,
    require: [true, 'Add a stock']
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  },
  imagesUrl: [{
    type: String,
    required: [true, 'Add an image url']
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    required: [true, 'Add a rating']
  }
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', productSchema)