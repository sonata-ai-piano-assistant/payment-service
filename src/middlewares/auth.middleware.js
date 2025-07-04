const { getUserFromToken } = require("../services/user.service")

exports.module = {
  verifyAuth: async (req, res, next) => {
    // retreive token from request headers
    const token = req.headers.authorization["Bearer "]
    if (!token) {
      return res.status(401).json({ message: "Unauthorized access" })
    }
    // Here you would typically verify the token with your auth service
    const user = await getUserFromToken(token)
    if (!user) {
      return res.status(401).json({ message: "Invalid token" })
    }
    // Attach user data to the request object
    req.user = user
    // Call the next middleware or route handler
    next()
  }
}
