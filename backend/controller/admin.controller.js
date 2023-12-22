import AdminProductModel from "../models/product.js"


export const createProduct = (req, res, next) => {

  const { price, name } = req.body
  let prices = []
  let newPrice = {}
  newPrice.timestamp = new Date().getTime()
  newPrice.value = price
  prices = [...prices, newPrice]

  const product = new AdminProductModel({
    name,
    prices
  })
  product.save()
    .then((result) => {
      console.log(result)
      return res.json(result);
    }).catch((err) => {
      next(err)
    });
}

export const adminProducts = (req, res, next) => {
  AdminProductModel.find()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });
}

export const updatePrices = (req, res, next) => {
  const { productId, prices } = req.body
  AdminProductModel.findOneAndUpdate(
    { _id: productId }, { prices: prices }, { new: true })
    .then((result) => {
      res.json(result)
    }).catch((err) => {
      next(err)
    });
}