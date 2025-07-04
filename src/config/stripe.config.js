require("dotenv").config()
const {
  BASIC_SUBSCRIPTION_ID,
  PREMIUM_SUBSCRIPTION_ID,
  PRO_SUBSCRIPTION_ID,
  STRIPE_SECRET_KEY,
  SUCCESS_URL,
  CANCEL_URL,
  STRIPE_WEBHOOK_SECRET
} = process.env

if (
  !BASIC_SUBSCRIPTION_ID ||
  !PREMIUM_SUBSCRIPTION_ID ||
  !PRO_SUBSCRIPTION_ID ||
  !STRIPE_SECRET_KEY ||
  !SUCCESS_URL ||
  !CANCEL_URL ||
  !STRIPE_WEBHOOK_SECRET
) {
  throw new Error("Missing environment variables")
}

/**
 * Stripe configuration module
 * @module config/stripe.config
 */
module.exports = {
  priceIdByType: {
    basic: BASIC_SUBSCRIPTION_ID,
    premium: PREMIUM_SUBSCRIPTION_ID,
    pro: PRO_SUBSCRIPTION_ID
  },
  STRIPE_SECRET_KEY,
  SUCCESS_URL,
  CANCEL_URL,
  STRIPE_WEBHOOK_SECRET
}
