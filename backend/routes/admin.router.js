import express from 'express'
import { adminProducts, createProduct } from '../controller/admin.controller.js'
const adminRouter = express.Router()

adminRouter.post('/create-product', createProduct)
adminRouter.get('/admin-products', adminProducts)


export default adminRouter