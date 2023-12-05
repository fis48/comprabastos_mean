import mongoose from "mongoose";

const AdminPriceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    default: 0
  },
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

const AdminPriceModel = mongoose.model('AdminPrice', AdminPriceSchema)
export default AdminPriceModel