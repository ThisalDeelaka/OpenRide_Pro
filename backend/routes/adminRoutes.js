const express = require('express');
const { getAdminAnalytics, getMaintenanceReports, resolveMaintenance } = require('../controllers/adminController');
const router = express.Router();

router.get('/analytics', getAdminAnalytics); // Fetch admin dashboard metrics
router.get('/maintenance', getMaintenanceReports); // View bikes under maintenance
router.put('/maintenance/resolve', resolveMaintenance); // Resolve a maintenance issue

module.exports = router;
