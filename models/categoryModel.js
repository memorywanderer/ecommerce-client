import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  parentCategory: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  },
  properties: {
    type: [Object],
  },
}, {
  timestamps: true
})


export default mongoose.models.Category || mongoose.model('Category', categorySchema)