const express = require('express');
const router = express.Router();
const usermodel = require('../models/userprofileModel');


/*Create A New User Profile*/
router.post('/', async (req, res) => {
 
    try {
        const {
          
            gender,
            height,
            dateOfBirth,
            weight,
            aim,
            dietPreference,
            allergies,
            healthCondition,
            dailyActivityLevel
        } = req.body

        if(!gender || !height || !dateOfBirth || !weight || !aim || !dietPreference || !healthCondition || !dailyActivityLevel){
            return res.status(400).json({message:"All Required Fields Must Be Filled"});
        }
        
        const bmi = weight/((height/100)* (height/100));
        const weightStatus = bmi<18.5 ? 'Under Weight': bmi<25 ? 'Normal Weight' : bmi<30 ? 'Over Weight':'Obese';
        
        //Calculate Age From Date Of  Birth
        const dob = new Date(dateOfBirth);
        const today = new Date();
        const age = Math.floor((today-dob)/(1000 * 60 * 60 * 24 * 365.25));

        let bmr;
        if(gender.toLowerCase()=== 'male'){
            bmr = (10 * weight) + (6.25 * height) - (5 * age)+5;
        }
        else if(gender.toLowerCase()=== 'female'){
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        else{
            return res.status(400).json({message: "Gender must be male or female"});
        }

        const ActivityFactors = {
            'Lightly Active': 1.375,
            'Moderately Active': 1.55,
            'Very Active': 1.725,
            'Extremely Active': 1.9,
          };
      
          if (!ActivityFactors[dailyActivityLevel]) {
            return res.status(400).json({ message: "Invalid daily activity level" });
          }
      
        const calories = bmr * ActivityFactors[dailyActivityLevel];



        let updateData = {
           
            age,
            gender,
            height,
            dateOfBirth,
            weight,
            aim,
            dietPreference,
            allergies,
            healthCondition,
            dailyActivityLevel,
            bmi,
            weightStatus,
            bmr,
            calories
        };
    
        const userprofile = new usermodel(updateData);    
        await userprofile.save();
    
        res.status(201).json({message:'User Registered Successfully',userprofile});
    }
    catch(error){
        res.status(500).json({message:'Server Error',error: error.message})
    }

  });



  /*   Get All User Profiles */
router.get('/', async (req, res, next) => {
    try{
        const profiles = await usermodel.find();
        res.json(profiles);
    }
    catch(error){
        res.status(500).json({message:error.message});

    }
  });



  /* Get A User Profile By ID*/
  router.get('/:id' , async (req,res,next)=>{
    try{
        const userID = await usermodel.findById(req.params.id);
        if(!userID) return res.status(404).json({message:'Profile Not Found'});
        res.json(userID);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
  });

  module.exports = router;