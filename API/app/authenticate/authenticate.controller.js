const userModel = require("../user/user.model");
const roleModel = require("../role/role.model");
const STATUS = require("../../contains/status.response");
const $S_CODE = STATUS.STATUS;
const $S_MESSAGE = STATUS.MESSAGE;
const $lib = require("../../library/message");
const jwt = require('jsonwebtoken');
const key = 'jdn97';

const authenticate = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.status($S_CODE.ERROR)
                    .json($lib.showResponse(
                    $S_CODE.ERROR,
                    false,
                    $S_MESSAGE.AUTHENTICATE_FAIL,
                    null));
            } else {
                req.decoded = decoded;
                return res.status($S_CODE.OK).json($lib.showResponse(
                    $S_CODE.OK, 
                    true,
                    $S_MESSAGE.AUTHENTICATE_SUCCESS,
                    decoded));
            }
        })
    } else {
        return res.status($S_CODE.FORBIDDEN)
            .json($lib.showResponse(
            $S_CODE.FORBIDDEN,
            false,
            $S_MESSAGE.NOTOKEN_PROVIDED,
            null));
    }
};

const createAuthenticate = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!password || !username) {
            return res.status($S_CODE.MISSING_DATA)
                .json($lib.showToken(
                $S_CODE.MISSING_DATA,
                false,
                $S_MESSAGE.MISSING_DATA,
                null));
        }
        userModel.findOne({ username: username }, async (err, user) => {
            if (!user) {
                return res.status($S_CODE.NOTFOUND)
                    .json($lib.showToken(
                    $S_CODE.NOTFOUND,
                    false,
                    `${$S_MESSAGE.CANNOT_FIND_USER}${username}`,
                    null));
            } else {
                const isValidPassword = user.comparePassword(password);
                if (!isValidPassword) {
                    return res.status($S_CODE.MISSING_DATA)
                        .json($lib.showToken(
                        $S_CODE.MISSING_DATA,
                        false,
                        $S_MESSAGE.PASSWORD_WRONG,
                        null));
                }
                let roleName = null;
                await roleModel.findById({_id: user._roles}, (e, role) => {
                    if (role) {
                        roleName = role.roleName;
                    }
                });
                const payload = { 
                    id: user._id, 
                    roleName: roleName, 
                    email: user.email 
                };
                const jwtToken = jwt.sign(payload, key);
                return res.status($S_CODE.OK)
                    .json($lib.showToken(
                    $S_CODE.OK,
                    true,
                    $S_MESSAGE.AUTHENTICATE_SUCCESS,
                    jwtToken));
            }
        })
    } catch (error) {
        return res.status($S_CODE.ERROR)
            .json($lib.showResponse(
            $S_CODE.ERROR,
            false,
            error,
            null));
    }
}
module.exports = {
    authenticate,
    createAuthenticate
}