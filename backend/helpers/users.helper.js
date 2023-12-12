import CompanyModel from "../models/company.js"
import ShopperModel from "../models/shopper.js"

export const createCompany = (userId) => {
  const company = new CompanyModel({
    user: userId,
    products: []
  })
  return company.save()
}

export const createShopper = (userId) => {
  const shopper = new ShopperModel({
    user: userId,
    companies: []
  })
  return shopper.save()
}

