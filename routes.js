"use strict";

const express = require("express");
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const about = require("./controllers/about.js");
const dashboard = require("./controllers/dashboard.js");
const trainerdashboard = require('./controllers/trainerdashboard.js');
const analytics = require("./utils/analytics.js");

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);
router.get('/settings', accounts.settings);
router.post('/settings', accounts.updateSettings);

router.get("/", dashboard.index);
router.get("/dashboard", dashboard.index);

router.get("/trainerdashboard", trainerdashboard.index);
router.get('/trainerdashboard/deletemember/:id', trainerdashboard.deleteMember);

router.get("/about", about.index);
//router.get("/analytics", analytics.index);

//router.get('/member/:id/deleteassessment/:assessmentid', dashboard.deleteAssessment);
router.get("/user/:id/deleteassessment/:assessmentid", dashboard.deleteAssessment);
router.post("/dashboard/addassessment", dashboard.addAssessment);
//router.post('/member/:id/addassessment', dashboard.addAssessment);


module.exports = router;
