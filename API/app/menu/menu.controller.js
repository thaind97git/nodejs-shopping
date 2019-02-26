const appRoot = '../../app/';
const parentMenuModel = require(`./parent.menu.model`);
const subMenuModel = require("./sub.menu.model");
const productModel = require("../product/product.model");
const STATUS = require("../../contains/status.response");
const $lib = require("../../library/message");


/*============PARENT-MENU-CONTROLLER===========*/
const createParentMenu = async function(req, res, next){
    try {
        const _subMenusArr = req.body._subMenus == null ? [] : req.body._subMenus;
        const name = req.body.name == null ? "" : req.body.name.trim();

        if (!name || name.length == 0) {
            return res.json($lib.showResponse(STATUS.MISSING_DATA, false, 
                "_parentMenu name (name) must not null", null))
            // Check name of subMenu in parentMenu must not null
        } else {
            await subMenuModel.findOne({name: name}, (err , rs) => {
                if (!!rs) {
                    return res.json($lib.showResponse(STATUS.DUPLICATE, false, 
                        `_subMenus name ${name} duplicate !`, null))
                }
            }) // Check name of subMenu in parentMenu can not duplicate
        }
        
        for (let i = 0; i < _subMenusArr.length; i++) {
            const element = _subMenusArr[i];
            await subMenuModel.findById({_id: element}, (err, rs) => {
                if (err) {
                    return res.json($lib.showResponse(STATUS.NOTFOUND, false, 
                        `_subMenus ${_subMenusArr[i]} can not find !`, null))
                }
            });
        }
        var parentMenu = {
            name: req.body.name,
            _subMenus: _subMenusArr,
            isActive: req.body.isActive == null ? false : req.body.isActive
        }
        await parentMenuModel.create(parentMenu)
        return res.json($lib.showResponse(STATUS.OK, true, 
            "Create parentMenu success !", parentMenu));
    } catch (error) {
        next(error)
    }
}

/*============SUB-MENU-CONTROLLER===========*/
const createSubMenu = async function(req, res, next){
    try {
        
        var subMenu = {
            name: req.body.name,
            _product: req.body._product == null ? [] : req.body._product,
            _parentMenu: req.body._parentMenu,
            isActive: req.body.isActive == null ? false : req.body.isActive == 0 ? false : true
        };
        if(subMenu.name == null){
            return res.json($lib.showResponse(STATUS.NOTFOUND, false, 
                "Create subMenu fail, subMenu (name) name must not null!", null));
        } //Check name of Menu must not null
        else{
            if(await subMenuModel.findOne({name: subMenu.name}) != null){
                return res.json($lib.showResponse(STATUS.NOTFOUND, false, 
                    "Create subMenu fail, subMenu (name) duplicate!", null));
            }
        };//Check duplicate name of Menu
        if(subMenu._parentMenu == null){
            return res.json($lib.showResponse(STATUS.NOTFOUND, false, 
                "Create subMenu fail, Parent Menu (_parentMenu) must not null!", null));
        }//Check parent menu must not null
        else{
            if(await productModel.findById({_id : subMenu._parentMenu}) == null){
                return res.json($lib.showResponse(STATUS.NOTFOUND, false, 
                    "Create subMenu fail, Parent Menu (_parentMenu) can not find!", null));
            }
        };// Check parent menu isEmpty ?

        if(!!subMenu._product){
            for(var i = 0; i <= Object.keys(subMenu._product).length - 1; i++){
                if(await productModel.findOne({_id : subMenu._product[i]}) == null){
                    return res.json($lib.showResponse(STATUS.NOTFOUND, false, 
                        "Create subMenu fail, Product (_product) can not find!", null));
                }
            }
        };//Check product isEmpty ?
        await subMenuModel.create(subMenu);
        return res.json($lib.showResponse(STATUS.OK, true, 
            "Create subMenu success !", await subMenuModel.findOne({name: subMenu.name})));
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createParentMenu,
    createSubMenu
}
