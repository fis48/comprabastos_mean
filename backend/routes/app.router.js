import express from 'express'
import { login, register } from '../controller/app.controller.js'
const appRouter = express.Router()

appRouter.post('/login', login)
appRouter.post('/register', register)

appRouter.get('/health-check', (req, res) => { return res.json({ ok: true }) })

export default appRouter