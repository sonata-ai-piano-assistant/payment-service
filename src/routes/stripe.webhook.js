const stripeConfig = require("../config/stripe.config")
const stripe = require("stripe")(stripeConfig.STRIPE_SECRET_KEY)
const express = require("express")
const router = express.Router()

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"]

    let event

    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        sig,
        stripeConfig.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const checkoutSessionCompleted = event.data.object
        // Then define and call a function to handle the event checkout.session.completed
        console.log(
          `Checkout session completed for session ID: ${checkoutSessionCompleted.id}`
        )
        break
      }
      case "customer.subscription.deleted": {
        const customerSubscriptionDeleted = event.data.object
        // Then define and call a function to handle the event customer.subscription.deleted
        console.log(
          `Subscription deleted for customer ID: ${customerSubscriptionDeleted.customer}`
        )
        break
      }
      case "invoice.paid": {
        const invoicePaid = event.data.object
        // Then define and call a function to handle the event invoice.paid
        console.log(`Invoice paid for invoice ID: ${invoicePaid.id}`)
        break
      }
      case "invoice.upcoming": {
        const invoiceUpcoming = event.data.object
        // Then define and call a function to handle the event invoice.upcoming
        console.log(
          `Upcoming invoice for customer ID: ${invoiceUpcoming.customer}`
        )
        break
      }
      case "subscription_schedule.expiring": {
        const subscriptionScheduleExpiring = event.data.object
        console.log(
          `Subscription schedule expiring for schedule ID: ${subscriptionScheduleExpiring.id}`
        )
        // Then define and call a function to handle the event subscription_schedule.expiring
        break
      }
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send()
  }
)
module.exports = router
