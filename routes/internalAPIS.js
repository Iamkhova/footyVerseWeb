const express = require('express');
const router = express.Router();

const userAccount_controller = require('../controllers/userAccounts.controller');


// User Account API
router.post('/v1/userAccount/create', userAccount_controller.createUser);
router.post('/v1/userAccount/handleSocialLogin', userAccount_controller.handleSocialLogin);

module.exports = router;
