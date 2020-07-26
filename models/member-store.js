"use strict";
const _ = require("lodash");
const JsonStore = require("./json-store");
//const accounts = require("./accounts.js");

const memberStore = {
  store: new JsonStore("./models/member-assessment-list-store.json", {
    memberCollection: []
  }),
  collection: "memberCollection",

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getUserDetails(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments, { id: assessmentId });
    this.store.save();
  },
  
  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  /*addAssessment(id, newAssessment) {
    const member = this.getMember(id);
    member.assessments.unshift(newAssessment);
    this.store.save();
  },*/

  /*addAssessment(loggedInUser, newAssessment) {
    const loggedInUser = accounts.getCurrentUser(request)
    loggedInUser.assessments.unshift(newAssessment);
    this.store.save();
  },*/

  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, { id: id });
    this.store.save();
  }

  /*memberAssessmentSize(id, assessmentId) {
    const member = this.getMember(id);
    _.size(assessments, { id: assessmentId });
  },*/
};

module.exports = memberStore;
