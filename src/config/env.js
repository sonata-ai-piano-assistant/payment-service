const { PORT, DATABASE_URI, AUTH_SERVICE_URL, DATABASE_SERVICE_URL } =
  process.env

if (!PORT || !DATABASE_URI || !AUTH_SERVICE_URL || !DATABASE_SERVICE_URL) {
  throw new Error("Missing environment variables")
}

/**
 * Environment configuration module
 * @module config/env
 */
module.exports = {
  PORT: parseInt(PORT),
  DATABASE_URI,
  AUTH_SERVICE_URL,
  DATABASE_SERVICE_URL
}
