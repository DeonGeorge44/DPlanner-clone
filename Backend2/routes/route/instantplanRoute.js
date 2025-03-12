const express = require('express');
const router = express.Router();
const {addPlan, getPlans, updatePlan, deletePlan} = require('../controllers/instantplanControllers');


router.post("/add",addPlan);
router.get("/all",getPlans);
router.put("/update/:id",updatePlan);
router.delete("/delete/:id",deletePlan);


module.exports = router;