import CompanyModel from "../models/company.js"

export const getCompany = (req, res, next) => {
  const { loggedId } = req.body
  CompanyModel.findById(loggedId)
    .populate('user')
    .then((result) => {
      return res.json(result)
    }).catch((err) => {
      next(err)
    });
}

export const updateCompanyList = (req, res, next) => {
  const { companyId, list } = req.body
  CompanyModel.findByIdAndUpdate(companyId, { products: list }, { new: true })
    .then((result) => {
      return res.json(result);
    }).catch((err) => {
      next(err)
    });

}