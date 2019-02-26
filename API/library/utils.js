const STATUS = require("../contains/status.response");
const $lib = require("../library/message");
const $S_CODE = STATUS.STATUS;

const checkArrayObjectID = (model, arr, message, response) => {
    arr.forEach(e => {
        model.findById({ _id: e }, (err, res) => {
            if (err) {
                return response.status($S_CODE.NOTFOUND)
                    .json($lib.showResponse($S_CODE.NOTFOUND, false, message + e, null));
            }
        });
    });
};
const checkOneObjectID = (model, id, message, response) => {
    model.findById({ _id: id }, (err, res) => {
        if (err) {
            return response.status($S_CODE.NOTFOUND)
                .json($lib.showResponse($S_CODE.NOTFOUND, false, message + id, null));
        }
    });
};

module.exports.UTIL = {
    checkArrayObjectID,
    checkOneObjectID
}