"use strict";
 
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store");
const accounts = require("./accounts.js");
const uuid = require("uuid");
const bmiCategory = require("../utils/bmi-category.js");
const BMI = require("../utils/currentbmi.js");

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
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
    
  },
  /*The value returned by getMonth() is an integer between 0 and 11. 0 corresponds to January, 
      1 to February, and so on.*/
  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    let current_datetime = new Date() // Set variable to current date and time
    let dd = current_datetime.getDate();
    let current_month = current_datetime.getMonth()+1;
    let mmm = current_datetime.getMonth()+1;
    const yyyy = current_datetime.getFullYear();
    if(dd<10) 
      {
          dd='0'+dd;
      } 
    if(mmm<10) 
      {
          mmm='0'+mmm;
      } 
    //let formatted_date = dd + '-' +mmm+'-'+yyyy;
    let formatted_date = `${current_datetime} - ${current_month} -${yyyy}`;
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id, // find out who the logged in user is and then make sure that users ID is stored with the assessment
      date: formatted_date,  
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
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
