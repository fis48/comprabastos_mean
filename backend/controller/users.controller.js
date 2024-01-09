import UserModel from "../models/user.js"

export const login = (req, res, next) => {

  console.log('TODO: Login', req.body)

  const { email } = req.body
  UserModel.findOne({ email })
    .then((user) => {
      return res.json(user)

      // switch (user.type) {
      //   case 'company':
      //     CompanyModel.findOne({ user: user._id })
      //       .populate('user')
      //       .then((result) => {
      //         return res.json(result)
      //       }).catch((err) => {
      //         next(err)
      //       });
      //   break;
      //   case 'shopper':

      //   break
      // }
    }).catch((err) => {
      next(err)
    })
}

export const register = (req, res, next) => {
  const newUser = new UserModel(req.body)
  switch (newUser.type) {
    case 'company':
      newUser.products = []
      newUser.companies = null
      break
    case 'shopper':
      newUser.companies = []
      newUser.products = null
      break
  }
  newUser.save()
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });
}

export const logout = (req, res, next) => {

  return res.json({ ok: true });

}

export const getUser = async (req, res, next) => {
  const { userId } = req.params
  const shopper = await UserModel.findById(userId)
}

export const updateUser = async (req, res, next) => {
  const { status, userId } = req.body
  UserModel.findByIdAndUpdate(userId, { status }, { new: true })
    .then(resp => { return res.json(resp) })
    .catch(err => next(err))
}
