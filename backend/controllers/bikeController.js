const Bike = require('../models/Bike');

exports.registerBike = async (req, res) => {
  const { ownerId,currentLocation, rentalPrice } = req.body;
  try {
    const newBike = new Bike({
      ownerId,
      currentLocation,
      rentalPrice
    });
    await newBike.save();
    res.status(201).json({ message: 'Bike registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bikes
exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().populate('ownerId'); // Fetch all bikes and populate ownerId
    res.json(bikes); // Return the list of bikes
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update bike status (for maintenance, etc.)
exports.updateBikeStatus = async (req, res) => {
  const { bikeId, status } = req.body;
  try {
    await Bike.findByIdAndUpdate(bikeId, { status });
    res.json({ message: 'Bike status updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
