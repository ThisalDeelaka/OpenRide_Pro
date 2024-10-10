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
  combinationLock: { type: String, required: true }, // New field for combination lock
  bikeImage: { type: String }, // URL or path to the stored bike image
});

module.exports = mongoose.model("Bike", bikeSchema);
