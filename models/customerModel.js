import mongoose from 'mongoose'

const customerSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String
  },
  address: {
    type: String
  },
  billingInformation: {
    type: String,
  },
  orderHistory: [{
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  }],
  wishlist: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  }],
  shoppingCart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
  },
  paymentHistory: [{
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  }],
  reviews: [{
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },
  }],
}, {
  timestamps: true
})

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema)