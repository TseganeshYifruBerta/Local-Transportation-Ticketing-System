const mongoose = require("mongoose");

// Schedule schema
const scheduleSchema = new mongoose.Schema({
    transportation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transportation",
      required: true
    },
    departureTime: {
      type: Date,
      required: true
    },
    arrivalTime: {
      type: Date,
      required: true
    },
    fare: {
      type: Number,
      required: true
    }
  });

  const scheduleModel = mongoose.model("Schedule", scheduleSchema);
module.exports = scheduleModel;