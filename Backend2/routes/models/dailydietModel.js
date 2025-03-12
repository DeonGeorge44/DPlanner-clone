const mongoose = require("mongoose");

const DailyDietSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Store date as 'YYYY-MM-DD'
  mealType: { type: String, required: true }, // This comes from the 'type' field in the foods collection
  foodName: { type: String, default: "No item selected" }, // This comes from the 'name' field in the foods collection
  quantity: { type: Number, required: true },
  calories: { type: Number, required: true }, // Dynamically calculated
});

module.exports = mongoose.model("DailyDiet", DailyDietSchema);
