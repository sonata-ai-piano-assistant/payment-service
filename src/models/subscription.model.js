const mongoose = require("mongoose")

const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["basic", "premium", "pro"],
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["active", "inactive", "canceled"],
    default: "inactive"
  },
  stripeProductId: { type: String }
})

module.exports = mongoose.model("Subscription", subscriptionSchema)
