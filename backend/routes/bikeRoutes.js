const express = require("express");
const {
  registerBike,
  updateBikeStatus,
  getAllBikes,
  deleteBike,
  getBikesByOwner,
} = require("../controllers/bikeController");
const router = express.Router();

router.get("/", getAllBikes);
router.post("/register", registerBike);
router.put("/status", updateBikeStatus);
router.delete("/:bikeId", deleteBike); // Handle bike deletion
router.get("/owner/:ownerId", getBikesByOwner);


module.exports = router;
