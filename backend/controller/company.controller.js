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
  console.log('params::', req.params)
}
