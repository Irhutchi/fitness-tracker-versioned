"use strict";
 
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const memberStore = require("../models/member-store.js");
const accounts = require("./accounts.js");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "Member Dashboard",
      assessments: assessmentStore.getUserAssessments(loggedInUser.id).reverse(),
      member: memberStore.getMemberById(loggedInUser.id),
    };
    logger.info("about to render", assessmentStore.getAllAssessments());
    response.render("dashboard", viewData);
    
  },
  
  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    let current_datetime = new Date() // Set variable to current date and time
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + (current_datetime.getHours() + 1) + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
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
      comment: "",
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
