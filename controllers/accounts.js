"use strict";

const userstore = require("../models/user-store");
const trainerstore = require("../models/trainer");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },
  
  settings(request, response) {
    const viewData = {
      title: "Settings"
    };
    response.render("settings", viewData);
  },
  
  updateSettings (request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const editProfile = {
      id: uuid.v1(),
      userid: loggedInUser.id, 
      name: request.body.name,
      gender: request.body.gender,
      email: request.body.email,
      password: request.body.password,
      height: request.body.height,
      startingweight: request.body.startingweight,
    };
    //logger.debug("Creating a new assessment = ", newAssessment);
    //memberStore.addAssessment(editProfile);
    response.redirect("/settings", editProfile);
  },


  logout(request, response) {
    response.cookie("member", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    const trainer = trainerstore.getTrainerByEmail(request.body.email);
    const password = request.body.password;
    if (user && user.password === password) {
      response.cookie("member", user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else if(trainer && trainer.password === password) {
      const trainerId = request.params.id;
      response.cookie("trainer", trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect("/trainerdashboard");
    }
    else {
      response.redirect("/login");
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.member;
    return userstore.getUserByEmail(userEmail);
  }
};

module.exports = accounts;
