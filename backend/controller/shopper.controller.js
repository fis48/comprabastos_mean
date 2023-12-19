import QuoteModel from "../models/quote.js";
import UserModel from "../models/user.js"

export const getCompanies = (req, res, next) => {
 
  UserModel.find({ type: 'company' })
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });
    
}

export const getCompany = (req, res, next) => {
  const { companyId } = req.params

  UserModel.findById(companyId)
    .then(resp =>{
      return res.json(resp)
    })
    .catch(err => {
      next(err)
    })
}

export const createQuote = (req, res, next) => {
  const { body } = req
  const quote = new QuoteModel({
    shopperId: body.shopperId,
    shopperName: body.shopperName,
    companyId: body.companyId,
    dueDate: body.dueDate,
    products: body.prices
  })
  quote.save()
    .then(result => {
      return res.json(result)
    })
    .catch(err => {
      next(err)
    })
}
