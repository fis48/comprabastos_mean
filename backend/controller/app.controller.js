import UserModel from "../models/user.js"

export const login = (req, res, next) => {
  
  console.log('TODO: Login', req.body)

  const { email } = req.body
  UserModel.findOne({ email })
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    })
}

export const register = (req, res, next) => {
  const newUser = new UserModel(req.body)
  newUser.save()
    .then((result) => {
      return res.json(result)      
    }).catch((err) => {
      next(err)
    });

  return res.json({ ok: true });
}