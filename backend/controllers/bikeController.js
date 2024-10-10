const Bike = require("../models/Bike");

// Register a new bike
exports.registerBike = async (req, res) => {
  const { ownerId, currentLocation, rentalPrice, combinationLock } = req.body;

  try {
    const newBike = new Bike({
      ownerId, // Now ownerId is correctly passed
      currentLocation,
      rentalPrice,
      combinationLock,
    });

    await newBike.save();
    res
      .status(201)
      .json({ message: "Bike registered successfully", bike: newBike });
  } catch (error) {
    console.error("Error registering bike:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all bikes
exports.getAllBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().populate("ownerId"); // Fetch all bikes and populate ownerId
    res.json(bikes); // Return the list of bikes
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update bike status (for maintenance, etc.)
exports.updateBikeStatus = async (req, res) => {
  const { bikeId, status } = req.body;
  try {
    await Bike.findByIdAndUpdate(bikeId, { status });
    res.json({ message: "Bike status updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a bike
exports.deleteBike = async (req, res) => {
  const { bikeId } = req.params; // Get bikeId from request parameters
  try {
    const bike = await Bike.findByIdAndDelete(bikeId); // Delete the bike
    if (!bike) {
      return res.status(404).json({ message: "Bike not found" }); // Handle case where bike does not exist
    }
    res.json({ message: "Bike deleted successfully" }); // Send success response
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
