const Stripe = require("stripe")
const stripeConfig = require("../config/stripe.config")
const stripe = Stripe(stripeConfig.STRIPE_SECRET_KEY)

/**
 * Stripe service for handling payment operations
 * @module services/stripe.service
 */
module.exports = {
  async createCheckoutSession({ priceId, customerEmail }) {
    return await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      success_url: stripeConfig.SUCCESS_URL,
      cancel_url: stripeConfig.CANCEL_URL
    })
  },

  async getInvoice(invoiceId) {
    return await stripe.invoices.retrieve(invoiceId)
  },

  async refundPayment(paymentIntentId) {
    return await stripe.refunds.create({ payment_intent: paymentIntentId })
  }
}
