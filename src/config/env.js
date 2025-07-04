const { PORT, AUTH_SERVICE_URL, DATABASE_SERVICE_URL } = process.env

if (!PORT || !AUTH_SERVICE_URL || !DATABASE_SERVICE_URL) {
  throw new Error("Missing environment variables")
}

/**
 * Environment configuration module
 * @module config/env
 */
module.exports = {
  PORT: parseInt(PORT),
  AUTH_SERVICE_URL,
  DATABASE_SERVICE_URL
}
