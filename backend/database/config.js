import mongoose from "mongoose"

export const connectDb = async () => {
  // const localMongoUrl = 'mongodb://localhost:27017/comprabastos'
  const localMongoUrl = 'mongodb+srv://webmaster:M0ng0F1d3l@cluster0.59ehxjd.mongodb.net/'

  try {
    return await mongoose.connect(localMongoUrl)
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error)
  }

}