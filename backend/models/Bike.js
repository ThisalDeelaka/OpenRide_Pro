const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  currentLocation: { type: { lat: Number, lng: Number }, required: true },
  status: {
    type: String,
    enum: ["available", "maintenance"],
    default: "available",
  },
  rentalPrice: { type: Number, required: true },
  combinationLock: { type: String, required: true }, // Field for combination lock
  adminaccepted: { type: Boolean, default: false }, // Field for admin acceptance
});

module.exports = mongoose.model("Bike", bikeSchema);
