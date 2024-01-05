import { getOfferTotal } from "../helpers/company.helper.js";
import OrderModel from "../models/order.js";
import QuoteModel from "../models/quote.js";
import UserModel from "../models/user.js";

export const getLoggedUser = (req, res, next) => {
  const { loggedId } = req.body
  UserModel.findById(loggedId)
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });
}

export const updateCompanyList = (req, res, next) => {
  const { companyId, list } = req.body
  UserModel.findByIdAndUpdate(companyId, { products: list }, { new: true })
    .then((result) => {
      return res.json(result);
    }).catch((err) => {
      next(err)
    });
}

export const getCompanyQuotes = (req, res, next) => {
  const { companyId } = req.params
  if (companyId) {
    QuoteModel.find({ companyId })
      .then(result => {
        return res.json(result)
      })
      .catch(err => next(err))
  }
  else {
    next(new Error('Missing data'))
  }
}

export const createOrder = async (req, res, next) => {
  const { company, offer } = req.body
  try {
    const shopper = await UserModel.findById(offer.shopperId)
    const newOrder = new OrderModel({
      products: offer.details,
      total: getOfferTotal(offer.details),
      shopperId: shopper.id,
      shopperName: shopper.name,
      shopperEmail: shopper.email,
      shopperPhone: shopper.phone,
      shopperWhatsapp: shopper.whatsapp,
      shopperAddress: shopper.address,
      companyId: company.id,
      companyName: company.name,
      companyEmail: company.email,
      companyPhone: company.phone,
      companyWhatsapp: company.whatsapp,
      companyAddress: company.address,
      deliveryTerms: company.deliveryTerms,
      paymentTerms: company.paymentTerms
    })
    const created = await newOrder.save()
    return res.json(created)
  } catch (error) {
    next(error)
  }
}

export const getOrders = async (req, res, next) => {
  const { userId, userType } = req.params
  let query = null
  switch (userType) {
    case 'company':
      query = { companyId: userId }
    break;
    case 'shopper':
      query = { shopperId: userId }
    break;
  }
  OrderModel.find(query)
    .then(resp => {
      return res.json(resp)
    })
    .catch(err => next(err)) 
}