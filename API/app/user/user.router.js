const express = require("express")
const userController = require("./user.controller")
const authController = require('../authenticate/authenticate.controller');
const urlContain = require("../../contains/url.contains")
const userContain = urlContain.URL_USER
var router = express.Router()



router.get(userContain.ALL_USER,authController.authenticate, userController.getAllAccount);
router.post(userContain.CREATE_USER, userController.createUser);
router.put(userContain.UPDATE_USER, userController.updateUserByUsername)
// router.put(userContain.UPDATE_ROLE,authController.authenticate, userController.updateRoleByUsername);
router.post(userContain.DELETE_USER,authController.authenticate, userController.deleteUserByUsername);
router.post(userContain.CHECK_LOGIN, userController.checkLogin);

module.exports = router;
