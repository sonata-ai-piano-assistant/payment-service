const stripeService = require("../services/stripe.service")

const { priceIdByType } = require("../config/stripe.config")

const checkoutHandler = async (req, res) => {
  try {
    const { type } = req.params
    const priceId = priceIdByType[type]
    if (!priceId) {
      return res.status(400).json({ error: "Type d'abonnement invalide" })
    }
    const session = await stripeService.createCheckoutSession({
      priceId,
      customerEmail: req.user.email,
      userId: req.user.id,
      plan: type
    })
    res.json({ url: session.url })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  checkoutHandler
}
