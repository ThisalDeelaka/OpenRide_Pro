const express = require('express');
const { sendMessage, getMessages,getUsers } = require('../controllers/massageController');
const router = express.Router();

router.post('/send', sendMessage);
router.get('/getmassages/:userId', getMessages);
router.get('/getusers', getUsers);

module.exports = router;
