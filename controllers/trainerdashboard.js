"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const memberStore = require("../models/member-store.js");
const trainerStore = require("../models/trainer.js");
//const userStore = require("../models/user-store.js");
const uuid = require("uuid");

const trainerdashboard = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("Trainer dashboard rendering");
    const viewData = {
      id: uuid.v1(),
      title: "Trainer Dashboard",
      //users: userStore.getAllUsers()
      members: memberStore.getUserDetails(loggedInUser.id)
    };
    logger.info("about to render", memberStore.getAllMembers());
    response.render("trainerdashboard", viewData);
  },

  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect("/trainerdashboard");
  },

  deleteAssessment(request, response) {
    const memberId = request.params.id;
    //const loggedInUser = accounts.getCurrentUser(request);
    const assessmentId = request.params.assessmentid;
    logger.debug(
      "Deleting Assessment ${assessmentId} from Member Profile ${memberId}"
    );
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect("/dashboard/" + memberId);
  }

  /*deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting assessment ${assessmentId} from Member ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect("/dashboard/" + memberId);
  }*/
};

module.exports = trainerdashboard;
