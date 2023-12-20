import { IQuoteItem } from "./quoteItem"

export interface IQuote {
    shopperId: string
    shopperName: string
    companyId: string
    dueDate: number
    products: IQuoteItem[]
}