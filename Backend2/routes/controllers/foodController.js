const Food = require('../models/foodModel')


//to check if data is empty
exports.empty = async (req,res) => {
    try{
      const data = await Food.countDocuments();
      res.json(data);
    }
    catch(error){
      res.status(500).json({ message: "Error", error: error.message });
    }
};

// Add a food item
exports.addFood = async (req, res) => {
    try {
      const { name, calories, quantity, type, richIn } = req.body;
      
      const newFood = new Food({ name, calories, quantity, type, richIn });
      await newFood.save();
  
      res.status(201).json({ message: "Food item added successfully", food: newFood });
    } catch (error) {
      res.status(500).json({ message: "Error adding food", error: error.message });
    }
  };

  // Display all food items
exports.getFoodInfo = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a food item
exports.updateFood = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFood = await Food.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!updatedFood) {
        return res.status(404).json({ message: "Food item not found" });
      }
  
      res.json({ message: "Food item updated successfully", food: updatedFood });
    } catch (error) {
      res.status(500).json({ message: "Error updating food", error: error.message });
    }
  };

// Delete a food item
exports.deleteFood = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedFood = await Food.findByIdAndDelete(id);
  
      if (!deletedFood) {
        return res.status(404).json({ message: "Food item not found" });
      }
  
      res.json({ message: "Food item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting food", error: error.message });
    }
  };

