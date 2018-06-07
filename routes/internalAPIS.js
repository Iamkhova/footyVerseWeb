const express = require('express');
const router = express.Router();

const userAccount_controller = require('../controllers/userAccounts.controller');


// User Account API
router.post('/v1/userAccount/create', userAccount_controller.createUser);
router.post('/v1/userAccount/handleSocialLogin', userAccount_controller.handleSocialLogin);
router.post('/v1/userAccount/loadUUID', userAccount_controller.loadUserByUUID);
router.post('/v1/userAccount/roleCheck', userAccount_controller.roleCheck);
module.exports = router;
