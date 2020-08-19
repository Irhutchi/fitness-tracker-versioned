"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const assessmentStore = require("../models/assessment-store.js");
const trainerStore = require("../models/trainer-store.js");
const memberStore = require("../models/member-store.js");
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
      title: "Trainer View | Member",
      member: memberStore.getMemberById(userId),
      assessments: assessmentStore.getUserAssessments(userId).reverse(),
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

  deleteAssessment(request, response) {
    const userId = request.params.id;
    //const loggedInUser = accounts.getCurrentUser(request);
    const assessmentId = request.params.assessmentid;
    logger.debug(
      "Deleting Assessment ${assessmentId} from Member Profile ${userId}"
    );
    assessmentStore.removeAssessment(userId, assessmentId);
    response.redirect("/dashboard/" + userId);
  },

  trainerComment(request, response) {
    const assessmentId = request.params.id;
    const userId = request.params.userid;
    const member = memberStore.getMemberById(userId);
    const newComment = {
      id: assessmentId,
      //assessments: assessmentStore.getAssessment(userId),
      member: memberStore.getMemberAssessmentById(assessmentId),
      comment: request.body.comment
    };
    logger.debug ("Trainer comment added to ${assessmentId}", newComment);
    logger.info(`New assessment created ${newComment.id} against ${userId}`);
    trainerStore.trainerComment(assessmentId, newComment.comment);
    response.redirect("/trainerassessments/" + userId);
  },  
};

module.exports = trainerdashboard;
