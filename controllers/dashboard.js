"use strict";

const logger = require("../utils/logger");
const memberStore = require("../models/member-store.js");
const userStore = require("../models/user-store.js");
const accounts = require("./accounts.js");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      assessments: memberStore.getUserDetails(loggedInUser.id),
      name: userStore.getUserById(),
    };
    logger.info("about to render", memberStore.getAllMembers());
    {
      response.render("dashboard", viewData);
    }
  },
  
  addAssessment(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    let current_datetime = new Date() // Set variable to current date and time
    let formatted_date = current_datetime.getDate() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getFullYear() + " " + current_datetime.getHours() + ":" + current_datetime.getMinutes() + ":" + current_datetime.getSeconds();
    const newAssessment = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      entry: formatted_date,  
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

  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting assessment ${assessmentId} from Member ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect("/dashboard/" + memberId);
  }
};

module.exports = dashboard;
