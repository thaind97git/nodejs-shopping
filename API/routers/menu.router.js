const express = require("express")
const menuController = require("../controllers/menu.controller")
const urlContain = require("../contains/url.contains")
const menuContain = urlContain.URL_MENU

var router = express.Router()

/*============PARENT-MENU-ROUTER===========*/
const createParentMenu = router.post(menuContain.CREATE_PARENT_MENU, menuController.createParentMenu)

/*============SUB-MENU-ROUTER===========*/
const createSubMenu = router.post(menuContain.CREATE_SUB_MENU, menuController.createSubMenu)

module.exports = {
    createParentMenu,
    createSubMenu
}