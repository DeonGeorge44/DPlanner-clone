const mongoose = require("mongoose");

const instantPlanSchema = new mongoose.Schema({
  planName: { type: String, required: true },
  foodName: { type: String, required: true },
  quantity: { type: String, required: true },
  caloriePerQuantity: { type: Number, required: true }, 
  type: { 
    type: String, 
    enum: ['Breakfast', 'Morning Snacks', 'Lunch', 'Evening Snacks', 'Dinner'], 
    required: true 
}
  
});

const InstantPlan = mongoose.model("InstantPlan", instantPlanSchema);

module.exports = InstantPlan;
