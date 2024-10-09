const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bikeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
  description: { type: String, required: true },
  reportTime: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'resolved'], default: 'pending' },
  resolutionNotes: { type: String },
  resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // For admin support
});

module.exports = mongoose.model('Incident', incidentSchema);
