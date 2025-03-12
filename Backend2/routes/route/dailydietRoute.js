const express = require("express");
const router = express.Router();
const dailyDietController = require("../controllers/dailydietController");

// Add a new daily diet entry
router.post("/add", dailyDietController.addDailyDiet);

// Get all daily diet entries for a specific date
router.get("/:date", dailyDietController.getDailyDietByDate);

// Update a daily diet entry
router.put("/update/:id", dailyDietController.updateDailyDiet);

// Delete a daily diet entry
router.delete("/delete/:id", dailyDietController.deleteDailyDiet);

module.exports = router;
