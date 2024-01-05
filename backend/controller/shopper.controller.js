import { quoteExists } from "../helpers/shopper.helper.js";
import OrderModel from "../models/order.js";
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
  quoteExists(body.shopperId, body.companyId)
    .then(resp => {

      console.log('resp', resp)

      if (resp.length === 0) {
        const quote = new QuoteModel({
          shopperId: body.shopperId,
          shopperName: body.shopperName,
          companyId: body.companyId,
          dueDate: body.dueDate,
          products: body.products
        })
        quote.save()
          .then(result => {
            return res.json(result)
          })
          .catch(err => {
            next(err)
          })              
      }
      else {
        let quote = resp[0]
        quote.updateOne({
          dueDate: body.dueDate,
          products: body.products
        })
          .then(resp => {
            console.log('updated::', resp)
          })
          .catch(err => next(err))
        

        console.log('quote::', quote)


      }
    })
    .catch(err => next(err))


}

export const getQuote = async (req, res, next) => {
  const { companyId, shopperId } = req.params
  const found = await QuoteModel.findOne({ companyId, shopperId })
  return res.json(found)
}

export const sendOrder = async (req, res, next) => {
  const { orderId, status } = req.body
  OrderModel.findByIdAndUpdate(orderId, { status }, { new: true })
    .then(updated => {
      res.json(updated)
    })
    .catch(err => next(err))


}
