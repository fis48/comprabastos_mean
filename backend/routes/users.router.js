import express from 'express'
import { getUSer, login, register } from '../controller/users.controller.js'
const usersRouter = express.Router()

usersRouter.post('/login', login)
usersRouter.post('/register', register)
usersRouter.get('/user/:userId', getUSer)

usersRouter.get('/health-check', (req, res) => { return res.json({ ok: true }) })

export default usersRouter