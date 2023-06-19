import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  line_items: {
    type: Object,
    required: true
  },
  paid: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true,
})

export default mongoose.models.Order || mongoose.model("Order", orderSchema)