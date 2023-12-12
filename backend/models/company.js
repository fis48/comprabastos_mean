import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: {
    type: [
      {
        id: {
          type: String
        },
        name: {
          type: String
        }
      }
    ]
  }
},
{
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.__v
      delete ret._id
      ret.id = doc._id
      return ret
    }
  }
})

const CompanyModel = mongoose.model('Company', CompanySchema)
export default CompanyModel