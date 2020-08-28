"use strict";

const express = require("express");
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const about = require("./controllers/about.js");
const dashboard = require("./controllers/dashboard.js");
const trainerdashboard = require('./controllers/trainerdashboard.js');

router.get('/', accounts.index);
router.get("/about", about.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get("/settings/:id", accounts.settings);
router.post('/settings', accounts.updateSettings);
router.post("/accounts/updatesettings/:id", accounts.updateSettings);


router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);
router.get('/dashboard/deleteassessment/:id', dashboard.deleteAssessment);
router.post("/dashboard/addassessment", dashboard.addAssessment);



router.get("/trainerdashboard", trainerdashboard.index);
router.get('/trainerassessments', trainerdashboard.index);
router.get('/trainerdashboard/trainerassessments/:id', trainerdashboard.trainerAssessments);
router.get('/trainerdashboard/deletemember/:id', trainerdashboard.deleteMember);
router.post("/trainerdashboard/:userid/updatecomment/:id", trainerdashboard.updateComment);

module.exports = router;
