import { createCompany } from "../helpers/users.helper.js"
import CompanyModel from "../models/company.js"
import UserModel from "../models/user.js"

export const login = (req, res, next) => {
  
  console.log('TODO: Login', req.body)

  const { email } = req.body
  UserModel.findOne({ email })
    .then((user) => {
      switch (user.type) {
        case 'company':
          CompanyModel.findOne({ user: user._id })
            .populate('user')
            .then((result) => {
              return res.json(result)
            }).catch((err) => {
              next(err)
            });
        break;
      }
    }).catch((err) => {
      next(err)
    })
}

export const register = (req, res, next) => {
  const newUser = new UserModel(req.body)
  newUser.save()
    .then((result) => {
      switch (result.type) {
        case 'company':
          createCompany(result.id)
        break;
      }
      return res.json(result) 
    }).catch((err) => {
      next(err)
    });
}

export const logout = (req, res, next) => {
  
  return res.json({ ok: true });

}