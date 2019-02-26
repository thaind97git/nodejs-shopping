const express = require("express")
const menuController = require("../menu/menu.controller")
const urlContain = require("../../contains/url.contains")
const menuContain = urlContain.URL_MENU

var router = express.Router()

/*============PARENT-MENU-ROUTER===========*/
router.post(menuContain.CREATE_PARENT_MENU, menuController.createParentMenu)

/*============SUB-MENU-ROUTER===========*/
router.post(menuContain.CREATE_SUB_MENU, menuController.createSubMenu)

module.exports = router