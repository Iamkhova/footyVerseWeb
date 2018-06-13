import * as express from "express";

// import sub-routers
import * as userAccount_controller from "../controllers/userAccounts.controller";
import * as uniName_controller from "../controllers/uniName.controller";

let router = express.Router();

// User Account API
router.post('/v1/userAccount/create', userAccount_controller.createUser);
router.post('/v1/userAccount/handleSocialLogin', userAccount_controller.handleSocialLogin);
router.post('/v1/userAccount/loadUUID', userAccount_controller.loadUserByUUID);
router.post('/v1/userAccount/roleCheck', userAccount_controller.roleCheck);

//uniName
router.post('/v1/uniName/getNewName', uniName_controller.default.getNewName);

export = router;
