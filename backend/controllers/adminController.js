const User = require('../models/User');
const Bike = require('../models/Bike');
const Ride = require('../models/Ride');
const Incident = require('../models/Incident');

// Get admin dashboard analytics
exports.getAdminAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBikes = await Bike.countDocuments();
    const totalRides = await Ride.countDocuments();
    const totalRevenue = await Ride.aggregate([{ $group: { _id: null, total: { $sum: "$totalFare" } } }]);

    const totalIncidents = await Incident.countDocuments({ status: 'pending' });
    const bikesUnderMaintenance = await Bike.countDocuments({ status: 'maintenance' });

    res.json({
      totalUsers,
      totalBikes,
      totalRides,
      totalRevenue: totalRevenue[0]?.total || 0,
      totalIncidents,
      bikesUnderMaintenance
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get maintenance reports for bikes
exports.getMaintenanceReports = async (req, res) => {
  try {
    const bikesUnderMaintenance = await Bike.find({ status: 'maintenance' }).populate('ownerId');
    res.json(bikesUnderMaintenance);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Mark a bike as available again after maintenance
exports.resolveMaintenance = async (req, res) => {
  const { bikeId } = req.body;
  try {
    const bike = await Bike.findById(bikeId);
    if (!bike || bike.status !== 'maintenance') {
      return res.status(400).json({ message: 'Bike not found or not under maintenance' });
    }

    bike.status = 'available';
    await bike.save();
    res.json({ message: 'Bike marked as available again' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
