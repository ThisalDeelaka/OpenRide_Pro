const express = require("express");
const {
  registerBike,
  updateBikeStatus,
  getAllBikes,
  deleteBike,
} = require("../controllers/bikeController");
const router = express.Router();

router.get("/", getAllBikes);
router.post("/register", registerBike);
router.put("/status", updateBikeStatus);
router.delete("/:bikeId", deleteBike); // Handle bike deletion

module.exports = router;
