import UserModel from "../models/user.js"

export const getCompanies = (req, res, next) => {
 
  UserModel.find({ type: 'company' })
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });
    
}