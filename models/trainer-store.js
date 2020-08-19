'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const assessmentStore = require("../models/assessment-store.js");

const trainerStore = {

  store: new JsonStore('./models/trainer-store.json', { trainers: [] }),
  collection: 'trainers',

  getAllTrainers() {
    return this.store.findAll(this.collection);
  },

  addTrainer(trainer) {
    this.store.add(this.collection, trainer);
    this.store.save();
  },

  getTrainerById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getTrainerByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  
  getTrainerByName(name) {
    return this.store.FindOneBy(this.collection, { name: name });
  },
  
  trainerComment(id, comment) {
    const assessment = assessmentStore.getAssessment(id);
    assessment.comment = comment;
    this.store.update(assessment.collection, id, assessment);
  },

};

module.exports = trainerStore;