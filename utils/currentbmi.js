"use strict";

const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store");
const accounts = require("../controllers/accounts.js");

const currentBMI= {
  BMICalc(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getUserAssessments(id);
    if(assessments.length===0) {
      //Convert a number into a string, rounding the number to keep only two decimals
      let bmiNum = member.weight / Math.pow(member.height, 2);
      return bmiNum.toFixed(2);
    }
    else{
      let bmiNum = assessments[assessments.length-1].weight / Math.pow(member.height, 2);
      return bmiNum.toFixed(2);
    }
  }
}

module.exports = currentBMI;