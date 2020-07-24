'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');
const uuid = require("uuid");

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('Member id = ', memberId);
    const viewData = {
      title: request.body.title,
      member: memberStore.getMember(memberId),
    };
    response.render('member', viewData);
  },

  addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const newAssessment = {
      id: uuid.v1(),
      title: request.body.title,
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperArm: request.body.upperArm,
      waist: request.body.waist,
      hips: request.body.hips,
    };
    logger.debug('New Song = ', newAssessment);
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/member/' + memberId);
  },
  
  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member Profile ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect("/member/" + memberId);
  }
};

module.exports = member;
