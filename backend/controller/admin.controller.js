import GlobalPriceModel from "../models/globalPrice.js"
import AdminProductModel from "../models/product.js"
import UserModel from "../models/user.js"


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

export const updateGlobalPrices = (req, res, next) => {
  const newGlobalPrice = new GlobalPriceModel(req.body)
  newGlobalPrice.save()
    .then(created => {
      return res.json(created)
    })
    .catch(err => next(err))
}

export const getProduct = (req, res, next) => {
  const { id } = req.params
  AdminProductModel.findById(id)
    .then(result => {
      return res.json(result)
    })  
    .catch(err => next(err))
}

export const updateProduct = (req, res, next) => {
  const { name, productId } = req.body
  AdminProductModel.findByIdAndUpdate(productId, { name }, { new: true })
    .then(resp => {
      return res.json(resp)
    })
    .catch(err => next(err))
}

export const getUsers = (req, res, next) => {
  UserModel.find()
    .then(result => {
      return res.json(result)
    })
    .catch(err => next(err))
  

}

export const clearPrices = (req, res, next) => {
  const prices = AdminProductModel.find()
    .then(resp => {
      resp.forEach(element => {
        AdminProductModel.findByIdAndUpdate(element._id, { prices: [] })
          .then(cResp => {

            console.log('cResp::', cResp)

          } )
          .catch(err => console.log(err))
      });
    })
    .catch(err => console.log(err))
}
