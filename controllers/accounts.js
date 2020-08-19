"use strict";

const memberStore = require("../models/member-store");
const trainerStore = require("../models/trainer-store");
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
  
  /*updateSettings (request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const editProfile = {
      //id: uuid.v1(),
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
  },*/

   updateSettings(request, response) {
    const userId = request.params.id;
    const loggedInMember = memberStore.getMemberById(userId);
    const editProfile = {
      fullname: request.body.fullname,
      gender:  request.body.gender,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
    };
    logger.debug(`Updating User Details ${userId}`);
    memberStore.updateMember(userId);
    response.redirect("/settings/" + userId);
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
    const member = request.body;
    member.id = uuid.v1();
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    assessments:[];
    response.redirect("/");
  },

   authenticate(request, response) {
    const member = memberStore.getUserByEmail(request.body.email);
    const trainer = trainerStore.getTrainerByEmail(request.body.email);
    const password = request.body.password;
    if (member && member.password === password) {
      response.cookie("member", member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect("/dashboard");
    } 
     else if(trainer && trainer.password === password) {
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
    return memberStore.getUserByEmail(userEmail);
  },
  
  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.trainer;
    return trainerStore.getTrainerByEmail(trainerEmail);
  }
};

module.exports = accounts;
