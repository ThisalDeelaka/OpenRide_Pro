const express = require('express');
const { registerBike, updateBikeStatus } = require('../controllers/bikeController');
const router = express.Router();

router.post('/register', registerBike);
router.put('/status', updateBikeStatus);

module.exports = router;
