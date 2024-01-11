import express from 'express'
import { getCompanyQuotes, getLoggedUser, updateCompanyList, createOrder, getOrders, 
    getVariation 
} from '../controller/company.controller.js'

const companyRouter = express.Router()

companyRouter.get('/quotes/:companyId', getCompanyQuotes)
companyRouter.get('/orders/:userId/:userType', getOrders)
companyRouter.get('/variation/:productId', getVariation)
companyRouter.post('/logged', getLoggedUser)
companyRouter.post('/order', createOrder)
companyRouter.patch('/company-list', updateCompanyList)



export default companyRouter