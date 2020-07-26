"use strict";

const logger = require("../utils/logger");
const memberStore = require("../models/member-store.js");
const accounts = require("./accounts.js");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      id: uuid.v1(),
      members: memberStore.getUserDetails(loggedInUser.id),
      //members: memberStore.getMember(memberId),
    };
    logger.info("about to render", memberStore.getAllMembers());
    {
      response.render("dashboard", viewData);
    }
  },

  /*const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      members: memberStore.getMember(),
      //members: memberStore.getMember(memberId),
    };
    logger.info("about to render", memberStore.getMember());
    response.render("dashboard", viewData);
  },*/

  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    //logger.debug("Creating a new assessment = ", newAssessment);
    memberStore.addAssessment(newAssessment);
    response.redirect("/dashboard");
  },

  /*addAssessment(request, response)
  {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const newAssessment = {
      id: uuid.v1(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
      //duration: Number(request.body.assessments)
    };
    logger.debug("New Assessment = ", newAssessment);
    memberStore.newAssessment(memberId, newAssessment);
    response.redirect("/dashboard/" + memberId);
  },*/


  deleteAssessment(request, response) {
    //const memberId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    const assessmentId = request.params.assessmentid;
    logger.debug("Deleting Assessment ${assessmentId} from Member Profile ${loggedInUser}");
    memberStore.removeAssessment(loggedInUser, assessmentId);
    response.redirect("/member/" + loggedInUser);
  }
};

module.exports = dashboard;
