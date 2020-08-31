"use strict";

const assessmentStore = require("../models/assessment-store");
const memberStore = require("../models/member-store.js");
const accounts = require("../controllers/accounts.js");
const currentBMI = require("./currentbmi.js");

                //-------  IBW Devine Formula 1974  -------//
/*  
    For males, an ideal body weight is: 50.0kg + 2.3kg/inch over 5 feet (60inches)
    For females, an ideal body weight is: 45.5kg + 2.3kg/inch > 5 feet (60inches) 
   
    Note: if no gender is specified, the result corresponding to female will be returned 
*/

const idealBodyWeight = {
  isIdealBodyWeight(id) {
    const member = memberStore.getMemberById(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    
    let inches = (member.height * 39.77); //converting height parameter from metric to imperial
    const fiveFeet = 60;   //5ft = 60inches
    
    const assessment = assessments[(assessments.length)-1];
    let isIdealBodyWeight;
    if (inches <= fiveFeet) {
      if (member.gender === "Male") {
        idealBodyWeight === 50;
      } else if (member.gender === "Female" || member.gender === "Unspecified"){
        idealBodyWeight === 45.5;
      }
    } else {  
      if (member.gender === "Male") {
        idealBodyWeight === 50 + ((inches - fiveFeet) * 2.3);
      } else if (member.gender === "Female" || member.gender === "Unspecified") {
        idealBodyWeight === 45.5 + ((inches - fiveFeet) * 2.3);
      }
    }
    //logger.info(`Ideal Weight ${idealBodyWeight}`);
    return ((idealBodyWeight <= (member.weight + 2.3))
        && (idealBodyWeight >= (member.weight - 2.3))
    );
  }
}

module.exports = idealBodyWeight;