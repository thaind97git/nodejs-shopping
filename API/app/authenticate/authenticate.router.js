const express = require("express")
const authController = require('./authenticate.controller');
const urlContain = require("../../contains/url.contains")
const userContain = urlContain.URL_USER
var router = express.Router()

const createAuth = router.post(userContain.CREATE_AUTHENTICATE, authController.createAuthenticate);
const authenticate = router.post(userContain.CHECK_AUTH, authController.authenticate);

module.exports = {
    createAuth,
    authenticate
}