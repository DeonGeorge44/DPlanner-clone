const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    calories: { type: Number, required: true }, 
    quantity: { type: String, required: true }, 
    type: { type: [String],  required: true },
    richIn: { type: [String], required: true } 
  });
  
  module.exports = mongoose.model("food", foodSchema);

  // enum: ["Breakfast", "Lunch", "Dinner","Morning Snack","Evening Snack"],