const express = require("express")
const sizeController = require("./size.controller")
const router = express.Router()
const urlContain = require("../../contains/url.contains")
const sizeContain = urlContain.URL_SIZE

router.get(sizeContain.ALL_SIZE, sizeController.getAllSize);
router.get(sizeContain.GET_SIZE_BYID, sizeController.getSizeById);
router.get(sizeContain.GET_SIZE_BYNAME, sizeController.getSizeByName);
router.post(sizeContain.CREATE_SIZE, sizeController.createSize);
router.put(sizeContain.UPDATE_SIZE_BYID, sizeController.updateSizeById);
router.put(sizeContain.UPDATE_SIZE_BYNAME, sizeController.updateSizeByName);
router.post(sizeContain.DELETE_SIZE_BYID, sizeController.deleteSizeById);
router.post(sizeContain.DELETE_SIZE_BYNAME, sizeController.deleteSizeByName);

module.exports = router;