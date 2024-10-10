const express = require("express");
const {
  registerBike,
  updateBikeStatus,
  upload,
} = require("../controllers/bikeController");
const router = express.Router();

router.post("/register", upload, registerBike); 
router.put("/status", updateBikeStatus);

module.exports = router;
