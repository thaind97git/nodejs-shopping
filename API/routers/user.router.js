const express = require("express")
const userController = require("../controllers/user.controller")
const authController = require('../controllers/authenticate.controller');
const urlContain = require("../contains/url.contains")
const userContain = urlContain.URL_USER
var router = express.Router()



const getAllUser = router.get(userContain.ALL_USER,authController.authenticate, userController.getAllAccount);
const createUser = router.post(userContain.CREATE_USER, userController.createUser);
const updateUser = router.put(userContain.UPDATE_USER, userController.updateUserByUsername)
// const updateRole = router.put(userContain.UPDATE_ROLE,authController.authenticate, userController.updateRoleByUsername);
const deleteUser = router.post(userContain.DELETE_USER,authController.authenticate, userController.deleteUserByUsername);
const checkLogin = router.post(userContain.CHECK_LOGIN, userController.checkLogin);

module.exports = {
    getAllUser,
    createUser,
    updateUser,
    // updateRole,
    deleteUser,
    checkLogin,
}
