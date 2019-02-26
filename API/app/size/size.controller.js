const sizeModel = require("./size.model");
const productModel = require("../product/product.model");
const STATUS = require("../../contains/status.response");
const $S_CODE = STATUS.STATUS;
const $S_MESSAGE = STATUS.MESSAGE;
const $lib = require("../../library/message");
const UTILS = require("../../library/utils");

const getAllSize = (request, response) => {
    sizeModel.find({isActive: true}, (err, res) => {
        if (res) {
            return response.status($S_CODE.OK)
                .json($lib.showResponse(
                    $S_CODE.OK, 
                    true, 
                    $S_MESSAGE.SUCCESS, 
                    res));
        } else {
            return response.status($S_CODE.ERROR)
                .json($lib.showResponse(
                    $S_CODE.ERROR, 
                    false, 
                    $S_MESSAGE.FAIL, 
                    null));
        }
    });
};

const getSizeById = (request, response) => {
    sizeModel.findById({_id: request.params._id}, (err, res) => {
        if (res) {
            return response.status($S_CODE.OK)
                .json($lib.showResponse(
                    $S_CODE.OK, 
                    true, 
                    $S_MESSAGE.SUCCESS, 
                    res));
        } else {
            return response.status($S_CODE.ERROR)
                .json($lib.showResponse(
                    $S_CODE.ERROR, 
                    false, 
                    $S_MESSAGE.FAIL, 
                    null));
        }
    });
};

const getSizeByName = (request, response) => {
    sizeModel.findOne({name: request.params.name}, (err, res) => {
        if (res) {
            return response.status($S_CODE.OK).
                json($lib.showResponse(
                    $S_CODE.OK, 
                    true, 
                    $S_MESSAGE.SUCCESS, 
                    res));
        } else {
            return response.status($S_CODE.ERROR)
                .json($lib.showResponse(
                    $S_CODE.ERROR, 
                    false, 
                    $S_MESSAGE.FAIL, 
                    null));
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
            UTILS.UTIL.checkArrayObjectID(colorModel, size._products, $S_MESSAGE.CANNOT_FIND_PRODUCT, response);

        sizeModel.create(size)
            .then(rs => {
                return response.status($S_CODE.OK)
                    .json($lib.showResponse(
                        $S_CODE.OK, 
                        true, 
                        $S_MESSAGE.CREATE_SUCCESS, 
                        rs));
            })
            .catch(e => {
                if (e.toString().includes("duplicate")) {
                    return response.status($S_CODE.DUPLICATE)
                        .json($lib.showResponse(
                            $S_CODE.DUPLICATE, 
                            false, 
                            e, 
                            null));
                }
                if (e.toString().includes("required")) {
                    return response.status($S_CODE.MISSING_DATA)
                        .json($lib.showResponse(
                            $S_CODE.MISSING_DATA, 
                            false, 
                            e, 
                            null));
                }
                return response.status($S_CODE.ERROR)
                    .json($lib.showResponse(
                        $S_CODE.ERROR, 
                        false, 
                        `Error: ${e}`, 
                        null));
            })
    } catch (error) {
        return response.status($S_CODE.ERROR)
            .json($lib.showResponse(
                $S_CODE.ERROR, 
                false, 
                `Error Catch: ${error}`, 
                null));
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
                        return response.status($S_CODE.OK)
                            .json($lib.showResponse(
                                $S_CODE.OK, 
                                true, 
                                $S_MESSAGE.UPDATE_SUCCESS, 
                                newSize));
                    } else {
                        if (e.toString().includes("duplicate")) {
                            return response.status($S_CODE.DUPLICATE)
                                .json($lib.showResponse(
                                    $S_CODE.DUPLICATE, 
                                    false, 
                                    e, 
                                    null));
                        }
                        if (e.toString().includes("required")) {
                            return response.status($S_CODE.MISSING_DATA)
                                .json($lib.showResponse(
                                    $S_CODE.MISSING_DATA, 
                                    false, 
                                    e, 
                                    null));
                        }
                        return response.status($S_CODE.ERROR)
                            .json($lib.showResponse(
                                $S_CODE.ERROR, 
                                false, 
                                `Error: ${e}`, 
                                null));
                    }
                });
            }
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
                        return response.status($S_CODE.OK)
                            .json($lib.showResponse(
                                $S_CODE.OK, 
                                true, 
                                $S_MESSAGE.UPDATE_SUCCESS, 
                                newSize));
                    } else {
                        if (e.toString().includes("duplicate")) {
                            return response.status($S_CODE.DUPLICATE)
                                .json($lib.showResponse(
                                    $S_CODE.DUPLICATE, 
                                    false, 
                                    e, 
                                    null));
                        }
                        if (e.toString().includes("required")) {
                            return response.status($S_CODE.MISSING_DATA)
                                .json($lib.showResponse(
                                    $S_CODE.MISSING_DATA, 
                                    false, 
                                    e, 
                                    null));
                        }
                        return response.status($S_CODE.ERROR)
                            .json($lib.showResponse(
                                $S_CODE.ERROR, 
                                false, 
                                `Error: ${e}`, 
                                null));
                    }
                });
            }
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

const deleteSizeById = (request, response, next) => {
    try {
        const query = {_id: request.params._id};
        sizeModel.findByIdAndUpdate(query, {isActive: false}, {new: true}, (err, res) => {
            if (!err) {
                return response.status($S_CODE.OK)
                    .json($lib.showResponse(
                        $S_CODE.OK, 
                        true, 
                        $S_MESSAGE.DELETE_SUCCESS, 
                        res));
            } else {
                return response.status($S_CODE.ERROR)
                    .json($lib.showResponse(
                        $S_CODE.ERROR, 
                        false, 
                        $S_MESSAGE.DELETE_FAIL + err, null));
            }
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

const deleteSizeByName = (request, response, next) => {
    try {
        const query = {name: request.params.name};
        sizeModel.findOneAndUpdate(query, {isActive: false}, {new: true}, (err, res) => {
            if (!err) {
                return response.status($S_CODE.OK)
                    .json($lib.showResponse(
                        $S_CODE.OK, 
                        true, 
                        $S_MESSAGE.DELETE_SUCCESS, 
                        res));
            } else {
                return response.status($S_CODE.ERROR)
                    .json($lib.showResponse(
                        $S_CODE.ERROR, 
                        false, 
                        $S_MESSAGE.DELETE_FAIL + err, 
                        null));
            }
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