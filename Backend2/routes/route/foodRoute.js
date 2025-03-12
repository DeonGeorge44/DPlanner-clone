const express = require('express');
const {addFood,updateFood,deleteFood, getFoodInfo,empty} = require('../controllers/foodController')
const router = express.Router();

var cors = require('cors');
router.use(cors());

//Define Routes
router.post("/add", addFood); 
router.put("/update/:id", updateFood); 
router.delete("/delete/:id", deleteFood); 
router.get("/view",getFoodInfo);
router.get("/",empty);


module.exports = router;