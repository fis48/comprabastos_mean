import { IProduct } from "./adminProduct"
import { ICompanyProduct } from "./companyProduct"

export interface ICompany {
  id?: string
  user: any
  products: ICompanyProduct[]
}