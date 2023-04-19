const mongoose = require("mongoose");

// Payment schema
const paymentSchema = new mongoose.Schema({
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    datePaid: {
      type: Date,
      default: Date.now,
      required: true
    }
  });

const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = paymentModel;