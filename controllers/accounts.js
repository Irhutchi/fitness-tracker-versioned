"use strict";

const memberStore = require("../models/member-store");
const trainerStore = require("../models/trainer-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Sign up or Login..."
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
    const loggedInMember = accounts.getCurrentUser(request);
    const userId = request.params.id;
    const viewData = {
      title: "Member | Settings",
      member: memberStore.getMemberById(loggedInMember.id)
    };
    response.render("settings", viewData);
  },

  updateSettings(request, response) {
    const userId = request.params.userid;
    const loggedInMember = memberStore.getMemberById(userId);
    //const member = memberStore.getMember(userId);
    const updatedProfile = {
      
      fullname: request.body.fullname,
      gender: request.body.gender,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address
    };
    logger.debug("Updating User Details", loggedInMember);
    memberStore.updateMember(loggedInMember, updatedProfile); //(userId, updatedProfile)
      response.redirect("/dashboard/");
    //response.render("settings", updatedProfile);
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
    assessments: [];
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
    } else if (trainer && trainer.password === password) {
      const trainerId = request.params.id;
      response.cookie("trainer", trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect("/trainerdashboard");
    } else {
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
