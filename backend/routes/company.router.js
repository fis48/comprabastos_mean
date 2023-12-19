import express from 'express'
import { getCompanyQuotes, getLoggedUser, updateCompanyList } from '../controller/company.controller.js'

const companyRouter = express.Router()

companyRouter.post('/logged', getLoggedUser)
companyRouter.patch('/company-list', updateCompanyList)
companyRouter.get('/quotes/:companyId', getCompanyQuotes)



export default companyRouter