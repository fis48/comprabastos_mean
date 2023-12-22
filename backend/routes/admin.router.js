import express from 'express'
import { adminProducts, createProduct, updatePrices } from '../controller/admin.controller.js'
const adminRouter = express.Router()

adminRouter.post('/create-product', createProduct)
adminRouter.get('/admin-products', adminProducts)
adminRouter.patch('/product-prices', updatePrices)


export default adminRouter