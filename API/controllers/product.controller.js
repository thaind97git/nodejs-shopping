const productModel = require("../models/product.model");
const subMenuModel = require("../models/sub.menu.model");
const imageModel = require("../models/image.model");
const colorModel = require("../models/color.model");
const sizeModel = require("../models/size.model");
const STATUS = require("../contains/status.response");
const showRes = require("../library/message");


const createProduct = async function (req, res, next) {
    try {
        let findProduct = await productModel.findOne({ productCode: req.body.productCode })
        if (findProduct == null) {
            var product = {
                productCode: req.body.productCode == null ? null : req.body.productCode,
                name: req.body.name == null ? null : req.body.name,
                description: req.body.description == null ? null : req.body.description,
                isPromotion: req.body.isPromotion == null ? false : true,
                quantity: req.body.quantity == null ? 0 : req.body.quantity,
                startPrice: req.body.startPrice == null ? 0 : req.body.startPrice,
                percentPromotion: req.body.isPromotion == false ? 0 : req.body.percentPromotion == null ? 0 : req.body.percentPromotion,
                dateSubmitted: req.body.dateSubmitted == null ? Date.now() : req.body.dateSubmitted,
                isActive: req.body.isActive == null ? false : req.body.isActive == false ? false : true,
                _subMenu: req.body._subMenu == null ? null : req.body._subMenu,
                _images:{
                    Image: req.body._images == null ? [] : req.body._images.Image == null ? null : req.body._images.Image,
                    SubImage: req.body._images == null ? [] : req.body._images.SubImage == null ? null : req.body._images.SubImage
                },
                _colors: req.body._colors == null ? [] : req.body._colors,
                _sizes: req.body._sizes == null ? [] : req.body._sizes
            }
            /*=========Check Product Code isEmpty========*/
            if (product.productCode == null || product.productCode.trim().length == 0) {
                return res.json(showRes.showResponse(STATUS.MISSING_DATA, false, 
                    "Insert Fail !, Product Code (productCode) must not null !", null));
            }
            /*====================================*/
            /*=========Check SubMenu isEmpty========*/
            if (!!product._subMenu) {
                if(await subMenuModel.findOne({name: product._subMenu}) == null){
                    let response = showRes.showResponse(STATUS.NOTFOUND, false, 
                        "Insert Fail !, SubMenu name can not find !", null);
                    return res.json(response)
                }
            }
            /*====================================*/
            /*=========Check Color isEmpty========*/
            if(!!product._colors){
                for(var i = 0; i <= Object.keys(product._colors).length - 1; i++){
                    if(await colorModel.findOne({name: product._colors[i]}) == null){
                        let response = showRes.showResponse(STATUS.NOTFOUND, false, 
                            "Insert Fail !, Color name can not find !", null);
                        return res.json(response)
                    }
                }
            }
            /*====================================*/
            /*=========Check Size isEmpty========*/
            if(!!product._sizes){
                for(var i = 0; i <= Object.keys(product._sizes).length - 1; i++){
                    if(await sizeModel.findOne({name: product._sizes[i]}) == null){
                        let response = showRes.showResponse(STATUS.NOTFOUND, false, 
                            "Insert Fail !, Size name can not find !", null);
                        return res.json(response)
                    }
                }
            }
            /*====================================*/
            
            await productModel.create(product, async (err, result) => {
                if (err) {
                    return res.json(showRes.showResponse(STATUS.ERROR, false, 
                        "Can not create Product !", null))
                } else {
                    const newProduct = await productModel.findOne({ productCode: req.body.productCode });
                    let image = {
                        Image: product._images.Image,
                        SubImage: product._images.SubImage,
                        _product: newProduct._id
                    }
                    imageModel.create(image, (err, result) => {
                        if (!err) {
                            return res.json(showRes.showResponse(STATUS.OK, true, 
                                "Insert product success !", newProduct))
                        }
                    }) //Create New Image Model
                }
            }) //Create New Product Model
            
        } else {
            let response = showRes.showResponse(STATUS.DUPLICATE, false, 
                "Insert fail, Product Code is Duplicate !", null);
            return res.json(response);
        }
    } catch (error) {
        next(error)
    }
};

const getAllProduct = async function (req, res, next) {
    try {
        var products = await productModel.find({ "isActive": true });
        for (let i = 0; i < products.length; i++) {
            products[i] = products[i].toJSON();
            products[i]._sizes = (await sizeModel.find({_id: { $in: products[i]._sizes }})).map((item) => item.name);
        }
        
        //products._sizes = (await sizeModel.find({_id: { $in: products._sizes }})).map((item) => item.name);
        res.json(showRes.showResponse(STATUS.OK, true, "Success !", products))
    } catch (error) {
        next(error)
    }
};

const deleteProductByCode = async (req, res, next) => {
    try {
        var query = { productCode: req.params.productCode }
        let product = await productModel.findOne(query)
        if (product != null) {
            await productModel.updateOne(query, { isActive: false });
            let response = {
                status: STATUS.OK,
                success: true,
                message: "Delete success !",
                data: await productModel.findOne(query)
            }
            return res.json(response)
        } else {
            let response = {
                status: STATUS.NOTFOUND,
                success: false,
                message: "Can not find product !",
                data: null
            }
            return res.json(response)
        }
    } catch (error) {
        next(error);
    }
};

const updateProductByCode = async (req, res, next) => {
    let query = { productCode: req.params.productCode }
    try {
        var product = await productModel.findOne(query)
        if (product != null) {
            if(req.body._subMenu != null){
                if(await subMenuModel.findOne({name: req.body._subMenu}) == null){
                    return res.json(showRes.showResponse(STATUS.NOTFOUND, false, "Can not find sub Menu !", null));
                }//if value _subMenu is InCorrect
            }// if have value _submenu in Body
            if(req.body._colors != null){
                if(await colorModel.findOne({name: req.body._colors}) == null){
                    return res.json(showRes.showResponse(STATUS.NOTFOUND, false, "Can not find Color name !", null));
                }//if value _colors is InCorrect
            }//if have value _colors in body
            if(req.body._sizes != null){
                if(await sizeModel.findOne({name: req.body._sizes}) == null){
                    return res.json(showRes.showResponse(STATUS.NOTFOUND, false, "Can not find Size name !", null));
                }//if value _sizes is InCorrect
            }//if have value _sizes in body
            await productModel.update(query, {
                productCode: product.productCode,
                name: req.body.name == null ? product.name : req.body.name,
                description: req.body.description == null ? product.description : req.body.description,
                isPromotion: req.body.isPromotion == null ? product.isPromotion : req.body.isPromotion,
                quantity: req.body.quantity == null ? product.quantity : req.body.quantity,
                startPrice: req.body.startPrice == null ? product.startPrice : req.body.startPrice,
                percentPromotion: req.body.isPromotion == false ? 0 : req.body.percentPromotion == null ? product.percentPromotion : req.body.percentPromotion,
                dateSubmitted: product.dateSubmitted,
                isActive: req.body.isActive == null ? product.isActive : req.body.isActive,
                _subMenu: req.body._subMenu == null ? product._subMenu : req.body._subMenu,
                _images:{
                    Image: req.body._images.Image == null ? product._images.Image : req.body._images.Image,
                    SubImage: req.body._images.SubImage == null ? product._images.SubImage : req.body._images.SubImage
                },
                _colors: req.body._colors == null ? product._colors : req.body._colors,
                _sizes: req.body._sizes == null ? product._sizes : req.body._sizes
            })
            let response = {
                status: STATUS.OK,
                success: true,
                message: "Update success !",
                data: await productModel.findOne(query)
            };
            return res.json(response)
        } else {
            let response = {
                status: STATUS.NOTFOUND,
                success: false,
                message: "Can not find Product !",
                data: null
            }
            return res.json(response)
        }
    } catch (error) {
        next(error)
    }
};

const getSizeByCode = async (req, res, next) => {
    try {
        var query = { productCode: req.params.productCode };
        var product = await productModel.findOne(query);
        if(product == null){
            return res.json(showRes.showResponse(STATUS.NOTFOUND, false, "Can not find product !", null));
        }else{
            let sizes = await sizeModel.find({_id: {$in : product._sizes}})
            return res.json(showRes.showResponse(STATUS.OK, true, "Success !", sizes.map((item) => item.name)));
        }
    } catch (error) {
        next(error);
    }
};

const getProductByCode = async (req, res, next) => {
    try {
        let query = { productCode: req.params.productCode };
        var product = (await productModel.findOne(query)).toJSON();
        if(!!product){
            let sizes = (await sizeModel.find({_id: {$in: product._sizes}})).map((item) => item.name);
            product._sizes = sizes;
            res.json(showRes.showResponse(STATUS.OK, true, "Success !", product))
        }else{
            res.json(showRes.showResponse(STATUS.NOTFOUND, false, "Can not find product !", null));
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createProduct,
    getAllProduct,
    deleteProductByCode,
    updateProductByCode,
    getSizeByCode,
    getProductByCode
}