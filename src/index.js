const express = require("express")
require("dotenv").config()

const envConfig = require("./config/env")
const app = express()
const port = envConfig.PORT
const apiRouter = require("./routes")
const stripeWebhook = require("./routes/stripe.webhook")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (_, res) => {
  res.send("Welcome to the API")
})
app.use("/api", apiRouter)
app.use(stripeWebhook)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
