const Ride = require('../models/Ride');
const Bike = require('../models/Bike');

// Start a new ride
exports.startRide = async (req, res) => {
  const { userId,bikeId, startLocation } = req.body;
  try {
    const bike = await Bike.findById(bikeId);
    if (bike.status !== 'available') {
      return res.status(400).json({ message: 'Bike is not available for rental' });
    }

    const newRide = new Ride({
      userId,
      bikeId,
      startLocation
    });

    bike.status = 'in use'; // Mark the bike as in use
    await bike.save();
    await newRide.save();

    res.status(201).json({ message: 'Ride started successfully', rideId: newRide._id });
  } catch (error) {
    res.status(500).json({ message:error});
  }
};

// End a ride and calculate fare based on time
exports.endRide = async (req, res) => {
  const { rideId, endLocation } = req.body;
  try {
    const ride = await Ride.findById(rideId).populate('bikeId');
    if (!ride || ride.endTime) {
      return res.status(400).json({ message: 'Ride not found or already ended' });
    }

    const bike = await Bike.findById(ride.bikeId);

    // Calculate distance (for user reference only, not for fare)
    const distance = calculateDistance(ride.startLocation, endLocation);

    // Calculate fare based on time duration
    const durationInHours = (Date.now() - new Date(ride.startTime)) / 3600000;
    const totalFare = durationInHours * bike.rentalPrice;

    // Update ride with end location, time, and calculated fare
    ride.endLocation = endLocation;
    ride.endTime = Date.now();
    ride.distance = distance; // Store distance in the database
    ride.totalFare = totalFare; // Store fare based on time

    await ride.save();

    // Mark the bike as available again
    bike.status = 'available';
    await bike.save();

    // Return the total fare and distance to the user
    res.json({ message: 'Ride ended successfully', totalFare, distance });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Helper function to calculate distance between two points (Haversine formula)
const calculateDistance = (start, end) => {
  const toRad = (value) => (value * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(end.lat - start.lat);
  const dLng = toRad(end.lng - start.lng);
  const lat1 = toRad(start.lat);
  const lat2 = toRad(end.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in kilometers
};

exports.getRideById = async (req, res) => {
  try {
    const { rideId } = req.params;

    // Find the ride by its _id
    const ride = await Ride.findById(rideId).populate('userId').populate('bikeId'); // Populating user and bike details if necessary

    if (!ride) {
      return res.status(404).json({ message: 'Ride not found.' });
    }

    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};