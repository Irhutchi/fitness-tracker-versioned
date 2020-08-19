"use strict";

const logger = require("../utils/logger");
const memberStore = require("../models/member-store.js");
const userStore = require("../models/user-store.js");
const accounts = require("./accounts.js");


const analytics = { 
    index (request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      Member: userStore.getUserByName(name),
    };
   // logger.info("about to render", memberStore.getAllMembers());
    {
      response.render("analytics", viewData);
    }
  },
};



module.exports = analytics;
  
 /* function bmiCategory(bmi){
    if(bmi = 0 && bmi <= 15.0)
        return 'Very severely underweight';
    if(bmi > 15.0 && bmi <= 16.0)
        return 'Severely underweight';
    else if(bmi > 16.0 && bmi <= 18.50 )
        return 'Underweight';
    else if(bmi > 18.5 && bmi <= 25 )
        return 'Normal';
    else if(bmi > 25  && bmi <= 30)
        return 'Overweight';
    else if(bmi > 30  && bmi <= 35)
        return 'Moderately Obese';
     else if(bmi > 35 && bmi <= 40)
        return 'Severely Obese';
    else
        return 'Very Seriously Obese';
  	}

}

  switch (calcBMI) {

       case (calcBMI < 18.5) :
           conclusion = 'You are underweight';
           break;
       case (calcBMI > 18.5) && (calcBMI < 24.9) :
           conclusion = 'You fall within the average range';
           break;
       case (calcBMI >= 25) && (calcBMI < 29.9) :
           conclusion = 'You are overweight';
           break;
       case (calcBMI > 30) :
           conclusion = 'You are obese';
           break;
           */