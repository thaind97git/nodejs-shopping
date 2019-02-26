const express = require("express")
const colorController = require("./color.controller")
const urlContain = require("../../contains/url.contains")
const colorContain = urlContain.URL_COLOR

var router = express.Router()

router.get(colorContain.ALL_COLOR, colorController.getAllColor);
router.get(colorContain.GET_COLOR_BYID, colorController.getColorById);
router.get(colorContain.GET_COLOR_BYNAME, colorController.getColorByName);
router.post(colorContain.CREATE_COLOR, colorController.createColor);
router.put(colorContain.UPDATE_COLOR_BYID, colorController.updateColorById);
router.put(colorContain.UPDATE_COLOR_BYNAME, colorController.updateColorByName);
router.post(colorContain.DELETE_COLOR_BYID, colorController.deleteColorById);
router.post(colorContain.DELETE_COLOR_BYNAME, colorController.deleteColorByName);

module.exports = router;