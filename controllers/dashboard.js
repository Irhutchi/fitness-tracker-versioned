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
      userid: loggedInUser.id,
      title: request.body.title,
      members: memberStore.getMember(),
      //members: memberStore.getMember(memberId),
    };
    logger.info("about to render", memberStore.getMember());
    response.render("dashboard", viewData);
  },

  addAssessment(request, response) {
    const memberId = request.params.id;
    const newAssessment = {
      id: uuid.v1(),
      title: request.body.title,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips
    };
    logger.debug("Creating a new assessment = ", newAssessment);
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect("dashboard",  newAssessment);
  },

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
