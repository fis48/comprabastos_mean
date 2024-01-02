import express from "express"
import { createQuote, getCompanies, getCompany, getQuote 
} from "../controller/shopper.controller.js"

const shopperRouter = express.Router()

shopperRouter.get('/companies', getCompanies)
shopperRouter.get('/company/:companyId', getCompany)
shopperRouter.get('/quote/:companyId/:shopperId', getQuote)
shopperRouter.post('/quote', createQuote)

export default shopperRouter