import mongoose from "mongoose";

const userShema = new mongoose.Schema({

  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  whatsapp: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    default: 'ON_HOLD'
  },
  type: {
    type: String
  },
  deliveryTerms: {
    type: String
  },
  paymentTerms: {
    type: String
  },
  companies: {
    type: Array,
    default: []
  },
  products: {
    type: Array,
    default: []
  }
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v
      delete ret.password
      delete ret._id
      ret.id = doc.id
      return ret
    }
  }
})

const UserModel = mongoose.model("User", userShema)
export default UserModel