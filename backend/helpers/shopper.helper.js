import QuoteModel from "../models/quote.js"

export const quoteExists = async (shopperId, companyId) => {
    return await QuoteModel.find({ shopperId, companyId })
}