const mongoose = require("mongoose");

// Booking schema
const bookingSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    schedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schedule",
      required: true
    },
    numSeats: {
      type: Number,
      required: true
    },
    class: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true
    },
    dateBooked: {
      type: Date,
      default: Date.now,
      required: true
    }
  });

const BookingModel = mongoose.model("Booking", bookingSchema);
module.exports = BookingModel;