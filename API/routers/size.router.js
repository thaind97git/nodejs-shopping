const express = require("express")
const sizeController = require("../controllers/size.controller")
const router = express.Router()
const urlContain = require("../contains/url.contains")
const sizeContain = urlContain.URL_SIZE

const createSize = router.post(sizeContain.CREATE_SIZE, sizeController.createSize);

module.exports = {
    createSize
}