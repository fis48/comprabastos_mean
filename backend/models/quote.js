import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({

  shopperId: {
    type: String,
    required: true
  },
  shopperName: {
    type: String,
    required: true
  },
  companyId: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  products: [
    {
      productId: {
        type: String,
      },
      productName: {
        type: String
      },
      value: {
        type: Number
      },
    }
  ]

})

const QuoteModel = mongoose.model('QuoteModel', QuoteSchema)
export default QuoteModel