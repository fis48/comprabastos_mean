import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema({

  shopper: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shopper',
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      price: {
        type: Number
      }
    }
  ]

})

const QuoteModel = mongoose.model('QuoteModel', QuoteSchema)
export default QuoteModel