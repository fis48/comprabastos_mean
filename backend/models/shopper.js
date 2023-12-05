import mongoose from "mongoose";

const ShopperSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  companies: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
      }
    ]
  }
})

const ShopperModel = mongoose.model('Shopper', ShopperSchema)
export default ShopperModel