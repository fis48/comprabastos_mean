import shopperModel from "../models/shopper"

export const createShopper = (req, res, next) => {

  console.log(req.body)

  return res.json({ ok: true })

  // const newShopper = new shopperModel({

  // })
}