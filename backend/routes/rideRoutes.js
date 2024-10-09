const express = require('express');
const { startRide, endRide } = require('../controllers/rideController');
const router = express.Router();

router.post('/start', startRide);
router.post('/end', endRide);

module.exports = router;
