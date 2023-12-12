import CompanyModel from "../models/company.js"

export const createCompany = (userId) => {
  const company = new CompanyModel({
    user: userId,
    products: []
  })
  return company.save()
}
