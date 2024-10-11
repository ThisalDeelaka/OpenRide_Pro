const express = require('express');
const { startRide, endRide,getRideById} = require('../controllers/rideController');
const router = express.Router();

router.get('/:rideId', getRideById);
router.post('/start', startRide);
router.post('/end', endRide);

module.exports = router;
