const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

module.exports = {
  async createCheckoutSession({ priceId, customerEmail }) {
    return await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      success_url: process.env.SUCCESS_URL,
      cancel_url: process.env.CANCEL_URL
    })
  },

  async getInvoice(invoiceId) {
    return await stripe.invoices.retrieve(invoiceId)
  },

  async refundPayment(paymentIntentId) {
    return await stripe.refunds.create({ payment_intent: paymentIntentId })
  }
}
