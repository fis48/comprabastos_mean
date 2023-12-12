import { IUserItems } from "./userItems"

export interface IUser {
  id?: string
  address: string
  email: string
  name: string
  phone: string
  whatsapp: string
  status: string
  type: string
  products?: IUserItems[]
  companies?: IUser[]
}