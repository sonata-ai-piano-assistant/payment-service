const stripeService = require("../services/stripe.service")

const priceIdByType = {
  free: process.env.FREE_SUBSCRIPTION_ID,
  premium: process.env.PREMIUM_SUBSCRIPTION_ID,
  pro: process.env.PRO_SUBSCRIPTION_ID
}

const checkoutHandler = async (req, res) => {
  try {
    const { type } = req.params
    const priceId = priceIdByType[type]
    if (!priceId) {
      return res.status(400).json({ error: "Type d'abonnement invalide" })
    }
    const session = await stripeService.createCheckoutSession({
      priceId,
      customerEmail: req.user.email
    })
    res.json({ url: session.url })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

module.exports = {
  checkoutHandler
}
