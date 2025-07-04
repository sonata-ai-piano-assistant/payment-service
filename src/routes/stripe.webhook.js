const stripeConfig = require("../config/stripe.config")
const stripe = require("stripe")(stripeConfig.STRIPE_SECRET_KEY)
const express = require("express")
const router = express.Router()
const subscriptionService = require("../services/subscription.service")
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
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
        const subscriptionData = {
          user: checkoutSessionCompleted.metadata
            ? checkoutSessionCompleted.metadata.userId
            : undefined, // set this in your Stripe session metadata
          stripeSubscriptionId: checkoutSessionCompleted.subscription,
          plan: checkoutSessionCompleted.metadata
            ? checkoutSessionCompleted.metadata.plan
            : undefined, // set this in your Stripe session metadata
          status: "active",
          currentPeriodEnd: checkoutSessionCompleted.current_period_end
            ? new Date(checkoutSessionCompleted.current_period_end * 1000)
            : undefined
        }
        await subscriptionService.createOrUpdateSubscription(subscriptionData)
        console.log(
          `Subscription created/updated for user ID: ${subscriptionData.user}`
        )

        break
      }
      case "customer.subscription.deleted": {
        const customerSubscriptionDeleted = event.data.object

        await subscriptionService.deleteSubscription(
          customerSubscriptionDeleted.id
        )
        console.log(
          `Subscription deleted for subscription ID: ${customerSubscriptionDeleted.id}`
        )
        break
      }
      case "invoice.paid": {
        const invoicePaid = event.data.object
        const subscriptionData = {
          user: invoicePaid.metadata ? invoicePaid.metadata.userId : undefined, // set this in your Stripe invoice metadata
          stripeSubscriptionId: invoicePaid.subscription,
          plan: invoicePaid.metadata ? invoicePaid.metadata.plan : undefined, // set this in your Stripe invoice metadata
          status: "active",
          currentPeriodEnd: invoicePaid.period_end
            ? new Date(invoicePaid.period_end * 1000)
            : undefined
        }
        await subscriptionService.createOrUpdateSubscription(subscriptionData)
        console.log(
          `Subscription updated for user ID: ${subscriptionData.user} with subscription ID: ${subscriptionData.stripeSubscriptionId}`
        )
        break
      }
      case "invoice.upcoming": {
        const invoiceUpcoming = event.data.object
        // Send an email to the customer to notify them of the upcoming invoice
        console.log(
          `Upcoming invoice for customer ID: ${invoiceUpcoming.customer}`
        )
        break
      }
      case "subscription_schedule.expiring": {
        const subscriptionScheduleExpiring = event.data.object
        // Send an email to the customer to notify them of the expiring subscription schedule
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
