const Bike = require("../models/Bike");
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use current timestamp to avoid conflicts
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeType = fileTypes.test(file.mimetype);

    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images (jpeg, jpg, png) are allowed!"));
    }
  },
});

exports.upload = upload.single("bikeImage");

// Register a new bike
exports.registerBike = async (req, res) => {
  const { currentLocation, rentalPrice, combinationLock } = req.body;

  try {
    const bikeImage = req.file ? req.file.filename : null; // Save filename if image is uploaded

    const newBike = new Bike({
      ownerId,
      currentLocation,
      rentalPrice,
      combinationLock,
      bikeImage,
    });

    await newBike.save();
    res
      .status(201)
      .json({ message: "Bike registered successfully", bike: newBike });
  } catch (error) {
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
      return res.status(404).json({ message: 'Bike not found' }); // Handle case where bike does not exist
    }
    res.json({ message: 'Bike deleted successfully' }); // Send success response
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
