const Bike = require("../models/Bike");

// Register a new bike
exports.registerBike = async (req, res) => {
  const { ownerId, bikeName, currentLocation, rentalPrice, combinationLock } =
    req.body;

  // Ensure that currentLocation contains both lat and lng
  if (!currentLocation || !currentLocation.lat || !currentLocation.lng) {
    return res.status(400).json({ message: "Invalid location data" });
  }

  try {
    const newBike = new Bike({
      ownerId,
      bikeName, // Include the bike name
      currentLocation, // Make sure this is { lat: Number, lng: Number }
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

// Get bike by ID
exports.getBikeById = async (req, res) => {
  const { id } = req.params;

  try {
    const bike = await Bike.findById(id).populate("ownerId");

    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.json(bike); // Send the bike object, including the combination lock
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

exports.getBikesByOwner = async (req, res) => {
  const { ownerId } = req.params;

  try {
    const bikes = await Bike.find({ ownerId });
    res.status(200).json(bikes);
  } catch (error) {
    console.error("Error fetching owner's bikes:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateBikeByOwner = async (req, res) => {
  const { bikeId } = req.params;
  const { rentalPrice, combinationLock } = req.body;

  try {
    const updatedBike = await Bike.findByIdAndUpdate(
      bikeId,
      { rentalPrice, combinationLock },
      { new: true }
    );

    if (!updatedBike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res
      .status(200)
      .json({ message: "Bike updated successfully", bike: updatedBike });
  } catch (error) {
    console.error("Error updating bike:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteBikeByowner = async (req, res) => {
  const { bikeId } = req.params;

  try {
    const bike = await Bike.findById(bikeId);

    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    await Bike.findByIdAndDelete(bikeId);
    res.status(200).json({ message: "Bike deleted successfully" });
  } catch (error) {
    console.error("Error deleting bike:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
