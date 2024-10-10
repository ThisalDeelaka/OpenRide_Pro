const express = require("express");
const {
  registerBike,
  updateBikeStatus,
  upload,
  getAllBikes,
  deleteBike ,
} = require("../controllers/bikeController");
const router = express.Router();

router.get("/", getAllBikes);
router.post("/register", upload, registerBike);
router.put("/status", updateBikeStatus);
router.delete('/:bikeId', deleteBike); // Add this line to handle bike deletion

module.exports = router;
