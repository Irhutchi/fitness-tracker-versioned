"use strict";

const express = require("express");
const router = express.Router();
const accounts = require('./controllers/accounts.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const member = require('./controllers/member.js');


router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
//router.get('/trainerdashboard/deletemember/:id', member.deleteMember);

router.get("/about", about.index);
router.get('/member/:id', member.index);
router.get('/loggedInUser/:id/deleteassessment/:assessmentid', dashboard.deleteAssessment);
router.post('/dashboard/addassessment', dashboard.addAssessment);


module.exports = router;
