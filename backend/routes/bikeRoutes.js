const express = require('express');
const { registerBike, updateBikeStatus,getAllBikes } = require('../controllers/bikeController');
const router = express.Router();

router.post('/register', registerBike);
router.get('/', getAllBikes); // Add this line to fetch all bikes
router.put('/status', updateBikeStatus);

module.exports = router;
