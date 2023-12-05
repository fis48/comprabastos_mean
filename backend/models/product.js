import mongoose from "mongoose";

const AdminProductSchema = new mongoose.Schema({

  name: {
    type: String
  },
  prices: [
    { 
      date: Number,
      value: Number
    }
  ],

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

const AdminProductModel = mongoose.model('AdminProduct', AdminProductSchema)
export default AdminProductModel