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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ]
  }
})

const CompanyModel = mongoose.model('Company', CompanySchema)
export default CompanyModel