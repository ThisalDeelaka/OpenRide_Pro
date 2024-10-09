const Incident = require('../models/Incident');
const Bike = require('../models/Bike');

// Report an incident
exports.reportIncident = async (req, res) => {
  const { bikeId, description } = req.body;
  try {
    const newIncident = new Incident({
      userId: req.session.userId,
      bikeId,
      description
    });

    await newIncident.save();
    res.status(201).json({ message: 'Incident reported successfully', incidentId: newIncident._id });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all incidents (for admin)
exports.getIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find().populate('userId bikeId').sort({ reportTime: -1 });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Resolve an incident (admin)
exports.resolveIncident = async (req, res) => {
  const { incidentId, resolutionNotes } = req.body;
  try {
    const incident = await Incident.findById(incidentId);
    if (!incident || incident.status === 'resolved') {
      return res.status(400).json({ message: 'Incident not found or already resolved' });
    }

    incident.status = 'resolved';
    incident.resolutionNotes = resolutionNotes;
    incident.resolvedBy = req.session.userId; // Assuming admin session

    await incident.save();
    res.json({ message: 'Incident resolved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
