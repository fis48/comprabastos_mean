import express from 'express'
import { getCompanyQuotes, getLoggedUser, updateCompanyList, createOrder } from '../controller/company.controller.js'

const companyRouter = express.Router()

companyRouter.post('/logged', getLoggedUser)
companyRouter.post('/order', createOrder)
companyRouter.patch('/company-list', updateCompanyList)
companyRouter.get('/quotes/:companyId', getCompanyQuotes)



export default companyRouter