const colorModel = require("./color.model");
const productModel = require("../product/product.model");
const STATUS = require("../../contains/status.response");
const $S_CODE = STATUS.STATUS;
const $S_MESSAGE = STATUS.MESSAGE;
const $lib = require("../../library/message");


const getAllColor = (request, response) => {
    colorModel.find({isActive: true}, (err, res) => {
        if (res) {
            return response.status($S_CODE.OK).json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.SUCCESS, res));
        } else {
            return response.status($S_CODE.ERROR).json($lib.showResponse($S_CODE.ERROR, false, $S_MESSAGE.FAIL, null));
        }
    });
};

const getColorById = (request, response) => {
    const query = {_id: request.params._id};
    colorModel.findById(query, (err, color) => {
        if (color) {
            return response.status($S_CODE.OK).json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.SUCCESS, color));
        } else {
            return response.status($S_CODE.ERROR).json($lib.showResponse($S_CODE.ERROR, false, $S_MESSAGE.FAIL, null));
        }
    });
};

const getColorByName = (request, response) => {
    const query = {name: request.params.name};
    colorModel.findOne(query, (err, color) => {
        if (color) {
            return response.status($S_CODE.OK).json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.SUCCESS, color));
        } else {
            return response.status($S_CODE.ERROR).json($lib.showResponse($S_CODE.ERROR, false, $S_MESSAGE.FAIL, null));
        }
    });
};

const createColor = (request, response, next) => {
    try {
        const color = {
            name: request.body.name == null ? "" : request.body.name,
            _products: request.body._products == null ? [] : request.body._products,
            isActive: request.body.isActive
        }
        if (color._products.length !== 0) {
            color._products.forEach(e => {
                productModel.findById({ _id: e }, (err, result) => {
                    if (err) {
                        return response.status($S_CODE.NOTFOUND)
                            .json($lib.showResponse($S_CODE.NOTFOUND, false, $S_MESSAGE.CANNOT_FIND_PRODUCT + e, null));
                    }
                })
            });
        }
        colorModel.create(color)
            .then(rs => {
                return response.status($S_CODE.OK).json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.CREATE_SUCCESS, rs));
            })
            .catch(e => {
                if (e.toString().includes("duplicate")) {
                    return response.status($S_CODE.DUPLICATE)
                        .json($lib.showResponse($S_CODE.DUPLICATE, false, e, null));
                }
                if (e.toString().includes("required")) {
                    return response.status($S_CODE.MISSING_DATA)
                        .json($lib.showResponse($S_CODE.MISSING_DATA, false, e, null));
                }
                return response.status($S_CODE.ERROR)
                    .json($lib.showResponse($S_CODE.ERROR, false, `Error : ${e}`, null));
            })
    } catch (error) {
        return res.status($S_CODE.ERROR).json(showRes($S_CODE.ERROR, false, `Error Catch : ${error}`, null));
    }
};

const updateColorById = (request, response, next) => {
    try {
        const query = { _id: request.params._id };
        colorModel.findById(query, (error, color) => {
            if (color) {
                const newColor = {
                    name: request.body.name == null ? color.name : request.body.name,
                    _products: request.body._products == null ? color._products 
                        : Array.isArray(request.body._products) ? request.body._products : [],
                    isActive: request.body.isActive == null ? false : request.body.isActive
                };
                colorModel.findByIdAndUpdate(query, newColor, {new: true}, (err, colorUpdated) => {
                    if (colorUpdated) {
                        return response.status($S_CODE.OK)
                            .json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.UPDATE_SUCCESS, colorUpdated));
                    } else {
                        return response.status($S_CODE.ERROR)
                            .json($lib.showResponse($S_CODE.ERROR, false, `Error: ${err}`, colorUpdated));
                    }
                });
            } else {
                return response.status($S_CODE.NOTFOUND)
                    .json($lib.showResponse($S_CODE.NOTFOUND, false, $S_MESSAGE.CANNOT_FIND_COLOR + request.params._id, null));
            }
        });
    } catch (error) {
        return response.status($S_CODE.ERROR).json($lib.showResponse($S_CODE.ERROR, false, `Error Catch : ${error}`, null));
    }
};

const updateColorByName = (request, response, next) => {
    try {
        const query = { name: request.params.name };
        colorModel.findOne(query, (error, color) => {
            if (color) {
                const newColor = {
                    name: request.body.name == null ? color.name : request.body.name,
                    _products: request.body._products == null ? color._products 
                        : Array.isArray(request.body._products) ? request.body._products : [],
                    isActive: request.body.isActive == null ? false : request.body.isActive
                };
                colorModel.findOneAndUpdate(query, newColor, {new: true}, (err, colorUpdated) => {
                    if (colorUpdated) {
                        return response.status($S_CODE.OK)
                            .json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.UPDATE_SUCCESS, colorUpdated));
                    } else {
                        return response.status($S_CODE.ERROR)
                            .json($lib.showResponse($S_CODE.ERROR, false, `Error: ${err}`, colorUpdated));
                    }
                });
            } else {
                return response.status($S_CODE.NOTFOUND)
                    .json($lib.showResponse($S_CODE.NOTFOUND, false, $S_MESSAGE.CANNOT_FIND_COLOR + request.params.name, null));
            }
        });
    } catch (error) {
        return response.status($S_CODE.ERROR).json(showRes($S_CODE.ERROR, false, `Error Catch : ${error}`, null));
    }
};

const deleteColorById = (request, response, next) => {
    try {
        const query = {_id: request.params._id};
        colorModel.findByIdAndUpdate(query, {isActive: false}, {new: true}, (err, res) => {
            if (!err) {
                return response.status($S_CODE.OK)
                    .json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.DELETE_SUCCESS, res));
            } else {
                return response.status($S_CODE.ERROR)
                    .json($lib.showResponse($S_CODE.ERROR, false, `Error: ${err}`, null));
            }
        });
    } catch (error) {
        return response.status($S_CODE.ERROR)
            .json($lib.showResponse($S_CODE.ERROR, false, `Error Catch: ${error}`, null));
    }
};

const deleteColorByName = (request, response, next) => {
    try {
        const query = {name: request.params.name};
        colorModel.findOneAndUpdate(query, {isActive: false}, {new: true}, (err, res) => {
            if (!err) {
                return response.status($S_CODE.OK)
                    .json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.DELETE_SUCCESS, res));
            } else {
                return response.status($S_CODE.ERROR)
                    .json($lib.showResponse($S_CODE.ERROR, false, `Error: ${err}`, null));
            }
        });
    } catch (error) {
        return response.status($S_CODE.ERROR)
            .json($lib.showResponse($S_CODE.ERROR, false, `Error Catch: ${error}`, null));
    }
};

module.exports = {
    getAllColor,
    getColorById,
    getColorByName,
    createColor,
    updateColorById,
    updateColorByName,
    deleteColorById,
    deleteColorByName
}