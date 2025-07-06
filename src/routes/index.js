const express = require("express")
const router = express.Router()
const paymentsRouter = require("./payments.route")
const authMiddleware = require("../middlewares/auth.middleware")
router.use(authMiddleware)
router.use("/payments", paymentsRouter)

module.exports = router
