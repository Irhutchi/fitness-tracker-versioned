"use strict";

const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store.js");
const accounts = require("../controllers/accounts.js");
const currentBMI = require("./currentbmi.js");

const bmiCategory = {
  bmiCategory(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getUserAssessments(id);
    const bmi = currentBMI.BMICalc(id);
    let result = "";
    if(bmi <= 15.0){ result = 'Very severely underweight'; }
    else if(bmi > 15.0 && bmi <= 16.0){ result =  'Severely underweight';}
    else if(bmi > 16.0 && bmi <= 18.50 ){ result =  'Underweight';}   
    else if(bmi > 18.5 && bmi <= 25 ){ result =  'Normal';}    
    else if(bmi > 25  && bmi <= 30){ result =  'Overweight';}
    else if(bmi > 30  && bmi <= 35){ result =  'Moderately Obese';}
    else if(bmi > 35){ result =  'Severely Obese';}
    return result;
  }   
}


module.exports = bmiCategory;