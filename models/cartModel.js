import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  cartItems: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      min: 1,
      default: 1,
    }
  }],
}, {
  timestamps: true
})

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema)