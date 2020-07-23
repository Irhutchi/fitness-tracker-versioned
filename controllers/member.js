'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');


const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('Member id = ', memberId);
    const viewData = {
      title: 'Member',
      member: memberStore.getMember(memberId),
    };
    response.render('member', viewData);
  },
  
  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member Profile ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect('/member/' + memberId);
  }
};

module.exports = member;