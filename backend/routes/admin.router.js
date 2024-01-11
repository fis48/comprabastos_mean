import express from 'express'
import { 
    adminProducts, createProduct, getProduct, getUsers, updatePrices, 
    updateProduct, updateGlobalPrices, clearPrices 
} from '../controller/admin.controller.js'
const adminRouter = express.Router()

adminRouter.get('/admin-products', adminProducts)
adminRouter.get('/clear-prices', clearPrices)
adminRouter.get('/product/:id', getProduct)
adminRouter.get('/users', getUsers)
adminRouter.post('/create-product', createProduct)
adminRouter.patch('/product-prices', updatePrices)
adminRouter.patch('/global-prices', updateGlobalPrices)
adminRouter.patch('/product', updateProduct)


export default adminRouter