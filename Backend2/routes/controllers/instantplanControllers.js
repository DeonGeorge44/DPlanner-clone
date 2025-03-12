const InstantPlan = require('../models/instantplanModel')
// Add a new food item to instant plans
exports.addPlan = async (req, res) => {
    try {
      const { planName,foodName, quantity, caloriePerQuantity,type } = req.body;
      const newPlan = new InstantPlan({planName, foodName, quantity, caloriePerQuantity,type });
      await newPlan.save();
      res.status(201).json({ message: "Food item added successfully", plan: newPlan });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  // Get all food items from instant plans
exports.getPlans = async (req, res) => {
    try {
      const plans = await InstantPlan.find();
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

  // Update a food item in instant plans
// exports.updatePlan = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const updatedPlan = await InstantPlan.findByIdAndUpdate(id, req.body, { new: true });
//       res.status(200).json({ message: "Food item updated successfully", plan: updatedPlan });
//     } catch (error) {
//       res.status(500).json({ message: "Server error", error: error.message });
//     }
//   };
exports.updatePlan = async (req, res) => {
  try {
      const { id } = req.params;
      const { planName, foodName, quantity, caloriePerQuantity, type } = req.body;
      const updatedPlan = await InstantPlan.findByIdAndUpdate(id, {planName, foodName, quantity, caloriePerQuantity, type }, { new: true });
      res.status(200).json({ message: 'Instant Plan Updated', plan: updatedPlan });
  } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
  // Delete a food item from instant plans
exports.deletePlan = async (req, res) => {
    try {
      const { id } = req.params;
      await InstantPlan.findByIdAndDelete(id);
      res.status(200).json({ message: "Food item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };