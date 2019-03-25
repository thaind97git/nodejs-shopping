const appRoot = '../../app/';
const parentMenuModel = require(`./parent.menu.model`);
const subMenuModel = require("./sub.menu.model");
const productModel = require("../product/product.model");
const STATUS = require("../../contains/status.response");
const $S_MESSAGE = STATUS.MESSAGE;
const UTILS = require("../../library/utils");
const $lib = require("../../library/message");


/*============PARENT-MENU-CONTROLLER===========*/
const createParentMenu = function(request, response, next){
    try {
        const parentMenu = {
            name: request.body.name,
            _subMenus: request.body._subMenus,
            isActive: request.body.isActive
        }
        /*=========Check SubMenu========*/
        Array.isArray(parentMenu._subMenus) && 
            UTILS.UTIL.checkArrayObjectID(subMenuModel, parentMenu._subMenus, $S_MESSAGE.CANNOT_FIND_SUBMENU, response);

        parentMenu.create(parentMenu)
            .then(rs => {
                return $lib.successFunc(response, rs, 'Create');
            })
            .catch(e => {
                if (e.toString().includes("duplicate")) {
                    return $lib.errorFunc(response, e, 'duplicate');
                }
                if (e.toString().includes("required")) {
                    return $lib.errorFunc(response, e, 'required');
                }
                return $lib.errorFunc(response, e);
            })
    } catch (error) {
        return $lib.catchFunc(response, error);
    }
}

/*============SUB-MENU-CONTROLLER===========*/
const createSubMenu = function(request, response, next){
    try {
        const subMenu = {
            name: request.body.name,
            _parentMenu: request.body._parentMenu,
            isActive: request.body.isActive
        }
        /*=========Check SubMenu========*/
        Boolean(!!subMenu._parentMenu) && 
            UTILS.UTIL.checkOneObjectID(parentMenuModel, subMenu._parentMenu, $S_MESSAGE.CANNOT_FIND_PARENTMENU, response);

        subMenu.create(parentMenu)
            .then(rs => {
                return $lib.successFunc(response, rs, 'Create');
            })
            .catch(e => {
                if (e.toString().includes("duplicate")) {
                    return $lib.errorFunc(response, e, 'duplicate');
                }
                if (e.toString().includes("required")) {
                    return $lib.errorFunc(response, e, 'required');
                }
                return $lib.errorFunc(response, e);
            })
    } catch (error) {
        return $lib.catchFunc(response, error);
    }
}


module.exports = {
    createParentMenu,
    createSubMenu
}
