const mongoose = require("mongoose");

// Transportation schema
const transportationSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      required: true
    }
  });
  
  const transportationModel = mongoose.model("Transportation", transportationSchema);
  module.exports = transportationModel;