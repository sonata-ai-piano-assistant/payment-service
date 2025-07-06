const { DATABASE_SERVICE_URL } = require("../config/env")

/** Stripe service for handling subscription operations
 * @module services/subscription.service
 * @description This service handles subscription operations such as creating, updating, and deleting subscriptions.
 */

module.exports = {
  /**
   * @function createOrUpdateSubscription
   * @param {object} subscriptionData - The subscription data to be saved or updated.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   * @description Sends a POST request to the database service to create or update a subscription.
   */
  async createOrUpdateSubscription(subscriptionData) {
    try {
      const response = await fetch(`${DATABASE_SERVICE_URL}/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(subscriptionData)
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      console.log("Subscription saved in DB:", data)
    } catch (error) {
      console.error("Error saving subscription:", error.message)
    }
  },

  /**
   * @function deleteSubscription
   * @param {string} subscriptionId - The ID of the subscription to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the operation is complete.
   * @description Sends a DELETE request to the database service to delete a subscription.
   */
  async deleteSubscription(subscriptionId) {
    try {
      await fetch(
        `${DATABASE_SERVICE_URL}/api/subscriptions/${subscriptionId}`,
        {
          method: "DELETE"
        }
      )
      console.log("Subscription deleted in DB")
    } catch (error) {
      console.error("Error deleting subscription:", error.message)
    }
  }
}
