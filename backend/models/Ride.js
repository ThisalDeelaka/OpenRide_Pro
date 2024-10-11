const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bikeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
  startLocation: { type: { lat: Number, lng: Number }, required: true },
  endLocation: { type: { lat: Number, lng: Number } },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  distance: { type: Number }, // Can be calculated
  totalFare: { type: Number }
});

module.exports = mongoose.model('Ride', rideSchema);
