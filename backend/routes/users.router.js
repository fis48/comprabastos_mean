import express from 'express'
import { login, register } from '../controller/users.controller.js'
const usersRouter = express.Router()

usersRouter.post('/login', login)
usersRouter.post('/register', register)

usersRouter.get('/health-check', (req, res) => { return res.json({ ok: true }) })

export default usersRouter