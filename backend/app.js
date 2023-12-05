import express from "express";
import appRouter from "./routes/app.router.js"
import { connectDb } from "./database/config.js";

const port = 8000

const app = express()
app.use(express.json())



app.use('/api', appRouter)

// error handling
app.use((err, req, res, next) => {

  console.log('handling', err)

  let errMsg = 'Server error'
  res.status(500)
  if (err.message.includes('tal')) {
    errMsg = "Tal error"
    res.status(301)
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
