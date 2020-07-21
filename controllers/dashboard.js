"use strict";

const logger = require("../utils/logger");
const assessmentListCollection = require('../models/assessmentlist-store.js'); 

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "BMI Tracker Dashboard",
      members: assessmentListCollection,
    };
    logger.info('about to render', assessmentListCollection);
    response.render("dashboard", viewData);
  },
};

module.exports = dashboard;
