const path = require('path');

const sizeModel = require("./size.model");
const productModel = require("../product/product.model");
const STATUS = require("../../contains/status.response");
const $S_MESSAGE = STATUS.MESSAGE;
const $lib = require("../../library/message");
const UTILS = require("../../library/utils");

const getAllSize = (request, response) => {
    sizeModel.find({isActive: true}, (err, sizes) => {
        if (err) {
            return $lib.errorFunc(response, err);
        }
        if (sizes) {
            return $lib.successFunc(response, sizes);
        } else {
            return $lib.notfoundFunc(response);
        }
    });
};

const getSizeById = (request, response) => {
    sizeModel.findById({_id: request.params._id}, (err, size) => {
        if (err) {
            return $lib.errorFunc(response, err);
        }
        if (size) {
            return $lib.successFunc(response, size);
        } else {
            return $lib.notfoundFunc(response);
        }
    });
};

const getSizeByName = (request, response) => {
    sizeModel.findOne({name: request.params.name}, (err, size) => {
        if (err) {
            return $lib.errorFunc(response, err);
        }
        if (size) {
            return $lib.successFunc(response, size);
        } else {
            return $lib.notfoundFunc(response);
        }
    });
};

const createSize = (request, response) => {
    try {
        const size = {
            name: request.body.name,
            _products: request.body._products,
            isActive: request.body.isActive
        }
        /*=========Check Product========*/
        Array.isArray(size._products) && 
            UTILS.UTIL.checkArrayObjectID(productModel, size._products, $S_MESSAGE.CANNOT_FIND_PRODUCT, response);

        sizeModel.create(size)
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
};

const updateSizeById = (request, response, next) => {
    try {
        const query = { _id: request.params._id };
        sizeModel.findById(query, (error, size) => {
            if (size) {
                const newSize = {
                    name: request.body.name,
                    _products: request.body._products,
                    isActive: request.body.isActive
                };

                /*=========Check Product========*/
                Array.isArray(size._products) && 
                UTILS.UTIL.checkArrayObjectID(colorModel, newSize._products, $S_MESSAGE.CANNOT_FIND_PRODUCT, response);

                sizeModel.update(query, newSize, (err, result) => {
                    if (!err) {
                        return $lib.successFunc(response, result, 'Update');
                    } else {
                        if (e.toString().includes("duplicate")) {
                            return $lib.errorFunc(response, e, 'duplicate');
                        }
                        if (e.toString().includes("required")) {
                            return $lib.errorFunc(response, e, 'required');
                        }
                        return $lib.errorFunc(response, e);
                    }
                });
            }
        });
    } catch (error) {
        return $lib.catchFunc(response, error);
    }
};

const updateSizeByName = (request, response, next) => {
    try {
        const query = { name: request.params.name };
        sizeModel.findOne(query, (error, size) => {
            if (size) {
                const newSize = {
                    name: request.body.name,
                    _products: request.body._products,
                    isActive: request.body.isActive
                };

                /*=========Check Product========*/
                Array.isArray(size._products) && 
                UTILS.UTIL.checkArrayObjectID(colorModel, newSize._products, $S_MESSAGE.CANNOT_FIND_PRODUCT, response);

                sizeModel.update(query, newSize, (err, result) => {
                    if (!err) {
                        return $lib.successFunc(response, result, 'update');
                    } else {
                        if (e.toString().includes("duplicate")) {
                            return $lib.errorFunc(response, e, 'duplicate');
                        }
                        if (e.toString().includes("required")) {
                            return $lib.errorFunc(response, e, 'required');
                        }
                        return $lib.errorFunc(response, e);
                    }
                });
            }
        });
    } catch (error) {
        return $lib.catchFunc(response, error);
    }
};

const deleteSizeById = (request, response, next) => {
    try {
        const query = {_id: request.params._id};
        sizeModel.findByIdAndUpdate(query, {isActive: false}, {new: true}, (err, size) => {
            if (err) {
                return $lib.errorFunc(response, err);
            } else {
                return $lib.successFunc(response, null, 'Delete');
            }
        });
    } catch (error) {
        return $lib.catchFunc(response, error);
    }
};

const deleteSizeByName = (request, response, next) => {
    try {
        const query = {name: request.params.name};
        sizeModel.findOneAndUpdate(query, {isActive: false}, {new: true}, (err, size) => {
            if (err) {
                return $lib.errorFunc(response, err);
            } else {
                return $lib.successFunc(response, null, 'Delete');
            }
        });
    } catch (error) {
        return $lib.catchFunc(response, error);
    }
};



module.exports = {
    getAllSize,
    getSizeById,
    getSizeByName,
    createSize,
    updateSizeById,
    updateSizeByName,
    deleteSizeById,
    deleteSizeByName
}