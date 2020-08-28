"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const trainerStore = require("../models/trainer-store.js");
const memberStore = require("../models/member-store.js");
//const idealBodyWeight = require("../utils/ideal-body-weight");
const idealBodyWeight = require("../utils/ideal-body-weight.js");
const bmiCategory = require("../utils/bmi-category.js");
const BMI = require("../utils/currentbmi.js");
const uuid = require("uuid");

const trainerdashboard = {
  index(request, response) {
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    logger.info("Trainer dashboard rendering");
    const viewData = {
      title: "Trainer Dashboard",
      trainer: trainerStore.getTrainerById(loggedInTrainer.id),
      members: memberStore.getAllMembers(),
      
    };
    logger.info("about to render", memberStore.getAllMembers());
    response.render("trainerdashboard", viewData);
  },
  
   trainerAssessments(request, response){
    const userId = request.params.id;
    const viewMemeberData = {
      title: "Trainer View | Member:",
      member: memberStore.getMemberById(userId),
      assessments: assessmentStore.getUserAssessments(userId).reverse(),
      BMI: BMI.BMICalc(userId),
      bmiCategory: bmiCategory.bmiCategory(userId),
      idealBodyWeight: idealBodyWeight.isIdealBodyWeight(userId),
    };
    response.render("trainerassessments", viewMemeberData);
  },

  deleteMember(request, response) {
    const userId = request.params.id;
    logger.debug(`Deleting Member ${userId}`);
    memberStore.removeMember(userId);
    assessmentStore.removeAllMemberAssessments(userId);
    response.redirect("/trainerdashboard");
  },
  
  updateComment(request, response) {
    const userId = request.params.id;
    const member = memberStore.getMemberById(userId);
    const assessmentId = request.params.assessmentid;
    logger.info(`Testing params ${request.params.assessmentid}`);
  
    const updatedComment = {
      comment: request.body.comment,
    };
    logger.debug ("Trainer comment added to ${assessmentId}", updatedComment);
    logger.info(`Updating Assessment with a Commentfor ${assessmentId} Member ${userId}`);
    assessmentStore.updateComment(userId, assessmentId, updatedComment);
    //response.redirect("/trainerassessments/" + userId);
    response.redirect("/trainerassessments");
  }
  
};

module.exports = trainerdashboard;
