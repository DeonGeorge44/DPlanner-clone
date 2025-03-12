const DailyDiet = require("../models/dailydietModel");
const Food = require("../models/foodModel");

// Function to extract the numeric value from a quantity string
const extractNumericQuantity = (quantityString) => {
  const numericValue = parseFloat(quantityString.replace(/[^\d.]/g, ""));
  return isNaN(numericValue) ? 0 : numericValue;
};

// Add a new daily diet entry
exports.addDailyDiet = async (req, res) => {
  try {
    const { date, mealType, foodId, quantity } = req.body;

    console.log("Received request:", req.body);

    // Convert input quantity to a number
    const numericQuantity = Number(quantity);
    if (isNaN(numericQuantity) || numericQuantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    // Find food details from the Food collection
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    console.log("Fetched food details:", food);

    // Extract numeric part from food.quantity
    const storedQuantity = extractNumericQuantity(food.quantity);

    if (storedQuantity <= 0) {
      return res.status(400).json({ message: "Invalid stored quantity in database" });
    }

    // Calculate calories
    const calories = (numericQuantity / storedQuantity) * food.calories;

    console.log(`Calculating calories: (${numericQuantity} / ${storedQuantity}) * ${food.calories} = ${calories}`);

    if (isNaN(calories)) {
      return res.status(400).json({ message: "Error calculating calories" });
    }

    // Create new daily diet entry
    const newEntry = new DailyDiet({
      date,
      mealType,
      foodName: food.name,
      quantity: numericQuantity,
      calories,
    });

    await newEntry.save();
    res.status(201).json({ message: "Daily diet entry added successfully", newEntry });
  } catch (error) {
    console.error("Error adding daily diet entry:", error);
    res.status(500).json({ message: "Error adding daily diet entry", error });
  }
};
// Get all daily diet entries for a specific date
exports.getDailyDietByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const dailyDiet = await DailyDiet.find({ date });

    if (dailyDiet.length === 0) {
      return res.status(200).json({ message: "No items selected", dailyDiet: [] });
    }

    res.status(200).json(dailyDiet);
  } catch (error) {
    res.status(500).json({ message: "Error fetching daily diet", error });
  }
};

// Update a daily diet entry
exports.updateDailyDiet = async (req, res) => {
  try {
    const { id } = req.params;
    const { foodId, quantity } = req.body;

    // Find food details from the Food collection
    const food = await Food.findById(foodId);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Calculate calories
    const calories = (quantity / food.quantity) * food.calories;

    const updatedEntry = await DailyDiet.findByIdAndUpdate(
      id,
      { foodName: food.name, quantity, calories },
      { new: true }
    );

    res.status(200).json({ message: "Daily diet entry updated successfully", updatedEntry });
  } catch (error) {
    res.status(500).json({ message: "Error updating daily diet entry", error });
  }
};

// Delete a daily diet entry
exports.deleteDailyDiet = async (req, res) => {
  try {
    const { id } = req.params;
    await DailyDiet.findByIdAndDelete(id);
    res.status(200).json({ message: "Daily diet entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting daily diet entry", error });
  }
};
