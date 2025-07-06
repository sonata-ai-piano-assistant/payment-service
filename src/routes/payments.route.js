const express = require("express")
const router = express.Router()
const paymentsController = require("../controllers/payments.controller")

router.post("/checkout/:type", paymentsController.checkoutHandler)

module.exports = router
