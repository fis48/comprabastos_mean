import express from 'express'
import { getCompany, updateCompanyList } from '../controller/company.controller.js'

const companyRouter = express.Router()

companyRouter.post('/logged', getCompany)
companyRouter.patch('/company-list', updateCompanyList)



export default companyRouter