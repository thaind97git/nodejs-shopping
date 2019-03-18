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
                        return $lib.successFunc(res, rsI, 'Create');
                    })
                    .catch(eI => {
                         // Nếu không tạo được schema hình ảnh => Sẽ xóa product vừa mới tạo
                        productModel.deleteOne({productCode: product.productCode}, (err) => {
                            if (!err) {
                                return $lib.failFunc(res, null, 'Create');
                            }
                        })
                    });
                
            })
            .catch(eP => {
                if (eP.toString().includes('duplicate')) {
                    return $lib.errorFunc(res, eP, 'duplicate');
                }
                if (eP.toString().includes('required')) {
                    return $lib.errorFunc(res, eP, 'required');
                }
                return $lib.errorFunc(res, eP);
            });
    } catch (error) {
        return $lib.catchFunc(res, error);
    }
};

const getAllProduct = async function (req, res, next) {
    try {
        await productModel.find().populate('_sizes', 'name').exec((err, products) => {
            if (err) {
                return $lib.errorFunc(res, err);
            }
            if (products) {
                return $lib.successFunc(res, products);
            } else {
                return $lib.notfoundFunc(res);
            }
        });
    } catch (error) {
        return $lib.catchFunc(res, error);
    }
};

const deleteProductByCode = async (req, res, next) => {
    try {
        let query = { productCode: req.params.productCode }
        await productModel.findOne(query, async (err, product) => {
            if (err) {
                return $lib.errorFunc(res, err);
            }
            await productModel.updateOne(query, { isActive: false }, async (err, raw) => {
                if (err) {
                    return $lib.errorFunc(res, err);
                }
                return $lib.successFunc(res, null, 'Update');
            });
        })
    } catch (error) {
        return $lib.catchFunc(res, error);
    }
};

const updateProductByCode = async (req, res, next) => {
    try {
        const query = { productCode: req.params.productCode };
        const productQuery = {
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
        await productModel.findOne(query, (err, product) => {
            if (err) {
                return $lib.errorFunc(res, err)
            }
            if (!product) {
                return $lib.notfoundFunc(res, 'Product ' + req.params.productCode);
            } else {
                /*=========Check Sub menu========*/
                Boolean(!!productQuery._subMenu) && 
                    UTILS.UTIL.checkOneObjectID(subMenuModel, product._subMenu, $S_MESSAGE.CANNOT_FIND_SUBMENU, response);
                /*=========Check Color========*/
                Array.isArray(productQuery._colors) && 
                    UTILS.UTIL.checkArrayObjectID(colorModel, product._colors, $S_MESSAGE.CANNOT_FIND_COLOR, response);
                /*=========Check Size========*/
                Array.isArray(productQuery._sizes) && 
                    UTILS.UTIL.checkArrayObjectID(sizeModel, product._sizes, $S_MESSAGE.CANNOT_FIND_SIZE, response);

                productModel.updateOne({isActive: false }, null, (err, raw) => {
                    if (err) {
                        return $lib.failFunc(res, null, 'Update');
                    }
                    productModel.findOne(query, (err, newP) => {
                        if (newP) {
                            return $lib.successFunc(res, newP);
                        }
                    });
                });
            }
        });
    } catch (error) {
        return $lib.catchFunc(res, error);
    }
};

const getSizeByCode = async (req, res, next) => {
    try {
        const query = { productCode: req.params.productCode };
        await productModel.findOne(query, async (err, product) => {
            if (err) {
                return $lib.errorFunc(res, err);
            }
            if (product) {
                let sizes = await sizeModel.find({_id: {$in : product._sizes}})
                return $lib.successFunc(res, sizes.map((item) => item.name));
            } else {
                $lib.notfoundFunc(res, 'product');
            }
        })
    } catch (error) {
        return $lib.catchFunc(res, error);
    }
};

const getProductByCode = (req, res, next) => {
    try {
        const query = { productCode: req.params.productCode };
        productModel.findOne(query).populate('_sizes', 'name').exec((err, product) => {
            if (err) {
                return $lib.errorFunc(res, err);
            }
            if (product) {
                return $lib.successFunc(res, product);
            } else {
                return $lib.notfoundFunc(res, 'product ' + req.params.productCode);
            }
        });
    } catch (error) {
        return $lib.catchFunc(res, error);
    }
}

const getProductById = async (req, res, next) => {
    try {
        const query = { productCode: req.params._id };
        productModel.findOne(query).populate('_sizes', 'name').exec((err, product) => {
            if (err) {
                return $lib.errorFunc(res, err);
            }
            if (product) {
                return $lib.successFunc(res, product);
            } else {
                return $lib.notfoundFunc(res, 'product ' + req.params.productCode);
            }
        });
    } catch (error) {
        return $lib.catchFunc(res, error);
    }
}

const getAllSize = (req, res) => {
    try {
        return $lib.successFunc(res, productModel.Refer().getAllSize());
    } catch (error) {
        return $lib.catchFunc(res, error);
    }
    
}


module.exports = {
    createProduct,
    getAllProduct,
    deleteProductByCode,
    updateProductByCode,
    getSizeByCode,
    getProductByCode,
    getProductById,
    getAllSize
}