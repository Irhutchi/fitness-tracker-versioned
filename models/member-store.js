'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const memberStore = {

  store: new JsonStore('./models/member-store.json', { members: [] }),
  collection: 'members',

  getAllMembers() {
    return this.store.findAll(this.collection);
  },
  
  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
   getMemberAssessments(memberid) {
    return this.store.findBy(this.collection, { memberid: memberid });
  },
  

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },
  getMemberByName(name) {
    return this.store.FindOneBy(this.collection, { name: name });
  },
  
  getMemberAssessmentById(id){
    return this.store.findOneBy(this.collection, {id: id});
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
  
  removeMember(id) {
    const member = this.getMemberById(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },
  
  /*newComment(id, assessmentId, updatedAssessment){
    const assessments = this.getAssessment(id, assessmentId);
    assessments.comment = updatedAssessment.comment;
    this.store.save();  
  },*/ 
  
  updateComment(id, assessmentId, updatedComment){
    const assessment = this.getAssessment(id, assessmentId);
    assessment.comment = updatedComment.comment;
    this.store.save();  
  },

  updateMember(memberId, updatedMember) {
    //updateMember(id) {
    //const member = this.getMemberById(memberId, updatedMember);
    const member = this.getMemberById(memberId);
    member.fullname = updatedMember.fullname;
    member.gender = updatedMember.gender;
    member.email = updatedMember.email;
    member.password = updatedMember.passowrd;
    member.address = updatedMember.address;
    this.store.save();
  },
  
  updateMember(id){
    const member = this.getMember(id);
    this.store.update(this.collection, id, member);
    this.store.save();
  },
};

module.exports = memberStore;
