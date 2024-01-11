import mongoose from "mongoose";

const GlobalPriceSchema = new mongoose.Schema({
  timestamp: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    default: 0
  },
  productId: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  }
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v
      delete ret._id
      ret.id = doc.id
      return ret
    }
  }
})

const GlobalPriceModel = mongoose.model('GlobalPrice', GlobalPriceSchema)
export default GlobalPriceModel