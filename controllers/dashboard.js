"use strict";

const logger = require("../utils/logger");
const memberStore = require('../models/member-store.js');
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      id: uuid.v1(),
      title: "BMI Tracker Dashboard",
      members: memberStore.getAllMembers(),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render("dashboard", viewData);
  },
  
  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/dashboard');
  }
};

module.exports = dashboard;
