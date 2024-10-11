const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userId: { type: String,}, // Storing the user ID
  userEmail: { type: String,}, // Storing the user's email
  content: { type: String, required: true }, // Message content
  from: { type: String, enum: ['user', 'admin'], required: true }, // Identifies whether the message is from the user or assistant
  createdAt: { type: Date, default: Date.now }, // Timestamp of when the message was created
});

module.exports= mongoose.model('Message', MessageSchema);
