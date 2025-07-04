const { getUserFromToken } = require("../services/user.service")

const verifyAuth = async (req, res, next) => {
  // retreive token from request headers
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized access" })
  }
  const token = authHeader.split(" ")[1]
  // Verify the token and get user data
  const user = await getUserFromToken(token)
  if (!user) {
    return res.status(401).json({ message: "Invalid token" })
  }
  // Attach user data to the request object
  req.user = user
  // Call the next middleware or route handler
  next()
}
module.exports = verifyAuth
