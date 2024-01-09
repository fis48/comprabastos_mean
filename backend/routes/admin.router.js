import express from 'express'
import { 
    adminProducts, createProduct, getProduct, getUsers, updatePrices, 
    updateProduct 
} from '../controller/admin.controller.js'
const adminRouter = express.Router()

adminRouter.get('/admin-products', adminProducts)
adminRouter.get('/product/:id', getProduct)
adminRouter.get('/users', getUsers)
adminRouter.post('/create-product', createProduct)
adminRouter.patch('/product-prices', updatePrices)
adminRouter.patch('/product', updateProduct)


export default adminRouter