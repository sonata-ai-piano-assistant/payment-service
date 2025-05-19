const express = require("express")
const router = express.Router()
const paymentsRouter = require("./payments.route")

router.use("/payments", paymentsRouter)

module.exports = router
