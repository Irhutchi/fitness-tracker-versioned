"use strict";
 
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store");
const accounts = require("./accounts.js");
const uuid = require("uuid");
const bmiCategory = require("../utils/bmi-category.js");
const BMI = require("../utils/currentbmi.js");
const idealBodyWeight = require("../utils/ideal-body-weight.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Dashboard",
      assessments: assessmentStore.getUserAssessments(loggedInUser.id).reverse(),
      member: memberStore.getMemberById(loggedInUser.id),
      BMI: BMI.BMICalc(loggedInUser.id),
      bmiCategory: bmiCategory.bmiCategory(loggedInUser.id),
      idealBodyWeight: idealBodyWeight.isIdealBodyWeight(loggedInUser.id),
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
    
  },
  /*The value returned by getMonth() is an integer between 0 and 11. 0 corresponds to January, 
      1 to February, and so on.*/
  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
   
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id, // find out who the logged in user is and then make sure that users ID is stored with the assessment
      datetime: new Date().toUTCString(),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperArm: Number(request.body.upperArm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      comment: undefined,
    };
    logger.debug("Creating a new assessment ", newAssessment);
    logger.info(`New assessment created ${newAssessment.id} against ${loggedInUser.id}`);
    assessmentStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },
  
  deleteAssessment(request, response) {
    const assessmentId = request.params.id;
    logger.debug(`Deleting assessment ${assessmentId}`);
    logger.info(`Member assessment being deleted ${assessmentId}`);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
