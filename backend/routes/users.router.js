import express from 'express'
import { 
    getUser, login, register, updateUser 
} from '../controller/users.controller.js'
const usersRouter = express.Router()

usersRouter.get('/user/:userId', getUser)
usersRouter.post('/login', login)
usersRouter.post('/register', register)
usersRouter.patch('/user', updateUser)

usersRouter.get('/health-check', (req, res) => { return res.json({ ok: true }) })

export default usersRouter