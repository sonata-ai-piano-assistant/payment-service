require("dotenv").config()

const express = require("express")
const cors = require("cors")
const envConfig = require("./config/env")

const app = express()
app.use(cors())
const port = envConfig.PORT
const apiRouter = require("./routes")
const stripeWebhook = require("./middlewares/stripe.webhook")
app.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook)

app.use(express.json({ type: "application/json" }))
app.use(express.urlencoded({ extended: true }))
app.use("/api", apiRouter)

app.get("/", (_, res) => {
  res.send("Welcome to the API")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
