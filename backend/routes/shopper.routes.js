import express from "express"
import { createShopper } from "../controller/shopper.controller.js"

const shopperRouter = express.Router()

shopperRouter.post('/shopper', createShopper)

export default shopperRouter