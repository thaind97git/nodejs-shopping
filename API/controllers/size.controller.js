const sizeModel = require("../models/size.model");
const STATUS = require("../contains/status.response");
const showRes = require("../library/message");

const createSize = async (req, res, next) => {

    try {
        var query = { name: req.body.name };
        if (req.body.name == null) {
            return res.json(showRes.showResponse(STATUS.MISSING_DATA, false, "Size name (name) must not null !", null));
        }
        var findSize = await sizeModel.findOne(query);
        if (!!findSize) {
            return res.json(showRes.showResponse(STATUS.DUPLICATE, false, "Size name (name) is duplicate !", null));
        } else {
            let size = {
                name: req.body.name,
                _product: req.body._product == null ? [] : req.body._product
            }
            let newSize = await sizeModel.create(size);
            return res.json(showRes.showResponse(STATUS.OK, false, "Create new size success !",  newSize));
        }
    } catch (error) {
        next(error);
    }
};



module.exports = {
    createSize
}