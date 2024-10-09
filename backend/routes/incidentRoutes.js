const express = require('express');
const { reportIncident, getIncidents, resolveIncident } = require('../controllers/incidentController');
const router = express.Router();

router.post('/report', reportIncident);
router.get('/', getIncidents); // Admin route to view all incidents
router.put('/resolve', resolveIncident); // Admin route to resolve an incident

module.exports = router;
