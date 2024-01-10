import express from "express";
import { connectDb } from "./database/config.js";
import cors from "cors"

import usersRouter from "./routes/users.router.js"
import adminRouter from "./routes/admin.router.js";
import companyRouter from "./routes/company.router.js";
import shopperRouter from "./routes/shopper.routes.js";

const port = 8000

const app = express()
app.use(cors())
app.use(express.json())

//  routes
app.use('/api', usersRouter)
app.use('/api', adminRouter)
app.use('/api', companyRouter)
app.use('/api', shopperRouter)

// error handling
app.use((err, req, res, next) => {

  console.log('handling', err)

  let errMsg = 'Server error'
  res.status(500)
  if (err.message.includes('Wrong or missing data')) {
    errMsg = "Información de registro invalida."
    res.status(400)
  }

  return res.json({ error: errMsg })
})

connectDb()
  .then((result) => {
    console.log('MongoDb connected')
    app.listen(
      port, 
      () => console.log(`Backend listening at :${port}`)
    )
  }).catch((err) => {
    console.log(err)
  });
