import express from "express"
import { getCompanies } from "../controller/shopper.controller.js"

const shopperRouter = express.Router()

shopperRouter.get('/companies', getCompanies)

export default shopperRouter