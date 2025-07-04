const envConfig = require("../config/env")
/** Stripe service for handling user operations
 * @module services/user.service
 */
module.exports = {
  /**
   * @string token - JWT token to decode
   * @returns {object} - User data from the token
   * @description Decodes a JWT token and returns the user data.
   */
  async getUserFromToken(token) {
    try {
      const response = await fetch(
        `${envConfig.AUTH_SERVICE_URL}/auth/validate-token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ token })
        }
      )
      if (!response.ok) {
        throw new Error("Failed to verify token")
      }
    } catch (error) {
      throw new Error(`Error verifying token: ${error.message}`)
    }
  }
}
