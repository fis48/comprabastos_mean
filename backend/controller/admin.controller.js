import AdminProductModel from "../models/product.js"


export const createProduct = (req, res, next) => {

  const { price, name } = req.body
  let prices = []
  let newPrice = {}
  newPrice.date = new Date().getTime()
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