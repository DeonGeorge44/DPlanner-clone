const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  age:{type:Number},
  gender: { type: String, required: true },
  height: { type: Number, required: true }, // in cm
  dateOfBirth: { type: Date, required: true },
  weight: { type: Number, required: true }, // in kg
  aim: { type: String, enum: ['weight gain', 'weight loss', 'maintain'], required: true },
  dietPreference: { type: String, enum: ['veg', 'non-veg'], required: true },
  allergies: { type: String },
  healthCondition: { type: String },
  dailyActivityLevel: { 
    type: String, 
    enum: ['Lightly Active', 'Moderately Active', 'Very Active', 'Extremely Active'],
    required: true 
  },
  bmi:{type:Number},
  weightStatus:{type:String, enum: ['Under Weight', 'Normal Weight', 'Over Weight', 'Obese']},
  bmr:{type:Number},
  calories:{type:Number},  //calores burnt / day  in KCAL
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('userprofiles', userProfileSchema);

