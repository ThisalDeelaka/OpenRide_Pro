const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bikeName: {
    type: String,
    required: true, // Make this field required or optional based on your requirements
  },
  currentLocation: {
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "maintenance","in use"],
    default: "available",
  },
  rentalPrice: { type: Number, required: true },
  combinationLock: { type: String, required: true }, // Field for combination lock
});

module.exports = mongoose.model("Bike", bikeSchema);
