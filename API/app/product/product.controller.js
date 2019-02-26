const appRoot = '../../app/';
const productModel = require(`./product.model`);
const subMenuModel = require(`${appRoot}menu/sub.menu.model`);
const imageModel = require(`${appRoot}image/image.model`);
const colorModel = require(`${appRoot}color/color.model`);
const sizeModel = require(`${appRoot}size/size.model`);
const STATUS = require(`../../contains/status.response`);
const $S_CODE = STATUS.STATUS;
const $S_MESSAGE = STATUS.MESSAGE;
const UTILS = require("../../library/utils");
const $lib = require("../../library/message");


const createProduct = async function (request, response, next) {
    try {
        let product = {
            productCode: request.body.productCode,
            name: request.body.name,
            description: request.body.description,
            isPromotion: request.body.isPromotion,
            quantity: request.body.quantity,
            startPrice: request.body.startPrice,
            percentPromotion: request.body.percentPromotion,
            dateSubmitted: request.body.dateSubmitted,
            isActive: request.body.isActive,
            _subMenu: !request.body._subMenu ? null : request.body._subMenu,
            _images:{
                Image: request.body._images == null ? "" :  request.body._images.Image,
                SubImage: request.body._images == null ? [] :  request.body._images.SubImage
            },
            _colors: request.body._colors == null ? "" : request.body._colors,
            _sizes: request.body._sizes == null ? "" : request.body._sizes
        }
        /*=========Check Sub menu========*/
        Boolean(!!product._subMenu) && 
            UTILS.UTIL.checkOneObjectID(subMenuModel, product._subMenu, $S_MESSAGE.CANNOT_FIND_SUBMENU, response);
        /*=========Check Color========*/
        Array.isArray(product._colors) && 
            UTILS.UTIL.checkArrayObjectID(colorModel, product._colors, $S_MESSAGE.CANNOT_FIND_COLOR, response);
        /*=========Check Size========*/
        Array.isArray(product._sizes) && 
            UTILS.UTIL.checkArrayObjectID(sizeModel, product._sizes, $S_MESSAGE.CANNOT_FIND_SIZE, response);

        productModel.create(product)
            .then(rsP => { //SUCCESS
                const image = {
                    Image: rsP._images.Image,
                    SubImage: product._images.SubImage,
                    _product: rsP._id
                };
                imageModel.create(image)
                    .then(rsI => {
                        return response.status($S_CODE.OK)
                            .json($lib.showResponse(
                            $S_CODE.OK, 
                            true, 
                            $S_MESSAGE.SUCCESS, 
                            rsP));
                    })
                    .catch(eI => {
                         // Nếu không tạo được schema hình ảnh => Sẽ xóa product vừa mới tạo
                        productModel.deleteOne({productCode: product.productCode}, (err) => {
                            if (!err) {
                                return response.status($S_CODE.ERROR)
                                    .json($lib.showResponse(
                                    $S_CODE.ERROR, 
                                    true, 
                                    $S_MESSAGE.CREATE_FAIL, 
                                    null));
                            }
                        })
                    });
                
            })
            .catch(eP => {
                if (eP.toString().includes("duplicate")) {
                    return response.status($S_CODE.DUPLICATE)
                        .json($lib.showResponse(
                        $S_CODE.DUPLICATE, 
                        false, 
                        eP, 
                        null));
                }
                if (eP.toString().includes("required")) {
                    return response.status($S_CODE.MISSING_DATA)
                        .json($lib.showResponse(
                        $S_CODE.MISSING_DATA, 
                        false, 
                        eP, 
                        null));
                }
                return response.status($S_CODE.ERROR)
                        .json($lib.showResponse(
                        $S_CODE.ERROR, 
                        false, 
                        `Error: ${eP}`, 
                        null));
            });
    } catch (error) {
        return response.status($S_CODE.ERROR)
            .json($lib.showResponse(
            $S_CODE.ERROR, 
            false, 
            `Error Catch: ${error}`, 
            null));
    }
};

const getAllProduct = async function (req, res, next) {
    try {
        var products = await productModel.find();
        for (let i = 0; i < products.length; i++) {
            products[i] = products[i].toJSON();
            products[i]._sizes = (await sizeModel.find({_id: { $in: products[i]._sizes }})).map((item) => item.name);
        }
        
        //products._sizes = (await sizeModel.find({_id: { $in: products._sizes }})).map((item) => item.name);
        return res.status($S_CODE.OK)
            .json($lib.showResponse(
            $S_CODE.OK, 
            true, 
            $S_MESSAGE.SUCCESS, 
            products));
    } catch (error) {
        return res.status($S_CODE.ERROR)
            .json($lib.showResponse(
            $S_CODE.ERROR, 
            false, 
            `Error Catch: ${error}`, 
            null));
    }
};

const deleteProductByCode = async (req, res, next) => {
    try {
        let query = { productCode: req.params.productCode }
        await productModel.findOne(query, async (err, product) => {
            if (err) {
                return res.status($S_CODE.NOTFOUND)
                    .json($lib.showResponse(
                    $S_CODE.NOTFOUND, 
                    false, 
                    $S_MESSAGE.CANNOT_FIND_PRODUCT, 
                    null));
            }
            await productModel.updateOne(query, { isActive: false }, async (err, raw) => {
                if (err) {
                    return res.status($S_CODE.ERROR)
                    .json($lib.showResponse(
                    $S_CODE.ERROR, 
                    false, 
                    $S_MESSAGE.CANNOT_UPDATE,
                    product));
                }
                return res.status($S_CODE.OK)
                    .json($lib.showResponse(
                    $S_CODE.OK, 
                    false, 
                    $S_MESSAGE.UPDATE_SUCCESS,
                    product));
            });
            
        })
    } catch (error) {
        return res.status($S_CODE.ERROR)
            .json($lib.showResponse(
            $S_CODE.ERROR, 
            false, 
            `Error Catch: ${error}`, 
            null));
    }
};

const updateProductByCode = async (req, res, next) => {
    let query = { productCode: req.params.productCode }
    try {
        var product = await productModel.findOne(query)
        if (product != null) {
            if(req.body._subMenu != null){
                if(await subMenuModel.findOne({name: req.body._subMenu}) == null){
                    return res.json($lib.showResponse(STATUS.NOTFOUND, false, "Can not find sub Menu !", null));
                }//if value _subMenu is InCorrect
            }// if have value _submenu in Body
            if(req.body._colors != null){
                if(await colorModel.findOne({name: req.body._colors}) == null){
                    return res.json($lib.showResponse(STATUS.NOTFOUND, false, "Can not find Color name !", null));
                }//if value _colors is InCorrect
            }//if have value _colors in body
            if(req.body._sizes != null){
                if(await sizeModel.findOne({name: req.body._sizes}) == null){
                    return res.json($lib.showResponse(STATUS.NOTFOUND, false, "Can not find Size name !", null));
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
        const query = { productCode: req.params.productCode };
        await productModel.findOne(query, async (err, size) => {
            if (err) {
                return res.json($lib.showResponse(STATUS.NOTFOUND, false, "Can not find size !", null));
            }
            let sizes = await sizeModel.find({_id: {$in : size._sizes}})
            res.status(STATUS.OK);
            res.json($lib.showResponse(STATUS.OK, true, "Success !", sizes.map((item) => item.name)));
        });
    } catch (error) {
        next(error);
    }
};

const getProductByCode = async (req, res, next) => {
    try {
        let query = { productCode: req.params.productCode };
        await productModel.findOne(query, async (err, product) => {
            if (err) {
                return res.json($lib.showResponse(STATUS.NOTFOUND, false, "Can not find product !", null));
            }
            product = product.toJSON();
            let sizes = (await sizeModel.find({_id: {$in: product._sizes}})).map((item) => item.name);
            product._sizes = sizes;
            res.status(STATUS.OK);
            res.json($lib.showResponse(STATUS.OK, true, "Success !", product))
        });
    } catch (error) {
        next(error);
    }
}

const getProductById = async (req, res, next) => {
    try {
        let query = { _id: req.params._id };
        await productModel.findOne(query, async (err, product) => {
            if(err) {
                return res.json($lib.showResponse(STATUS.NOTFOUND, false, "Can not find product !", null));
            }
            product = product.toJSON();
            let sizes = (await sizeModel.find({_id: {$in: product._sizes}})).map((item) => item.name);
            product._sizes = sizes;
            res.json($lib.showResponse(STATUS.OK, true, "Success !", product));
        });
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
    getProductByCode,
    getProductById
}