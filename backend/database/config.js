import mongoose from "mongoose"

export const connectDb = async () => {
  const localMongoUrl = 'mongodb://localhost:27017/comprabastos'

  try {
    return await mongoose.connect(localMongoUrl)
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error)
  }

}