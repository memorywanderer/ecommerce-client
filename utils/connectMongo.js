import mongoose from "mongoose"

let isConnected = false

export const connectMongoDB = async () => {
  if (isConnected) {
    console.log('Connected to mongoDB!')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log('Connected to mongoDB!')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}