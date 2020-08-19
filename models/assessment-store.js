"use strict";
const _ = require("lodash");
const JsonStore = require("./json-store");
//const accounts = require("./accounts.js");

const assessmentStore = {
  store: new JsonStore("./models/assessment-store.json", {
    assessmentCollection: []
  }),
  collection: "assessmentCollection",

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  getUserAssessments(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.remove(assessments, { id: assessmentId });
    this.store.save();
  },
  
  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
  
  removeAllMemberAssessments(userId) {
    const assessments = this.store.findBy(this.collection, { userId: userId });
    this.store.remove(this.collection, assessments);
    this.store.save();
  },
  
  addAssessment(assessment) {
    this.store.add(this.collection, assessment);
    this.store.save();
  },

  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, { id: id });
    this.store.save();
  },

  memberAssessmentSize(id, assessmentId) {
    const member = this.getMember(id);
    const assessments = member.assessments;
    _.size(assessments, { id: assessmentId });
  },
};

module.exports = assessmentStore;
