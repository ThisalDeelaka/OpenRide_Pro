const express = require("express");
const {
  registerBike,
  updateBikeStatus,
  getAllBikes,
  getBikeById,
  deleteBike,
  getBikesByOwner,
  deleteBikeByowner,
  updateBikeByOwner,
} = require("../controllers/bikeController");
const router = express.Router();

router.get("/", getAllBikes);
router.get("/:id", getBikeById);
router.post("/register", registerBike);
router.put("/status", updateBikeStatus);
router.delete("/:bikeId", deleteBike); // Handle bike deletion
router.get("/owner/:ownerId", getBikesByOwner);
router.put('/:bikeId', updateBikeByOwner); // For updating bike
router.delete('/:bikeId', deleteBikeByowner); // For deleting bike



module.exports = router;
