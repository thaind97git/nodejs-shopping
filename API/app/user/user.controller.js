const userModel = require("./user.model");
const roleModel = require('../role/role.model');
const STATUS = require("../../contains/status.response");
const $S_CODE = STATUS.STATUS;
const $S_MESSAGE = STATUS.MESSAGE;
const $lib = require("../../library/message");
const key = 'jdn97';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const getAllAccount = async (req, res) => {
    userModel.find((err, list) => {
        if (!err) {
            res.status($S_CODE.OK).json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.SUCCESS, list));
        }
    });
};

const createUser = async (req, res, next) => {
    try {
        const user = {
            username: req.body.username,
            password: req.password,
            _roles: req.body._roles,
            email: req.body.email,
            isActive: req.isActive
        }
        if (user.password !== null || user.password.trim().length !== 0) {
            user.password = bcrypt.hashSync(req.body.password, 10);
        }
        if (user._roles != null) {
            roleModel.findById({_id: user._roles}, (error, role) => {
                if (error) {
                    res.status($S_CODE.NOTFOUND).json($lib.showResponse($S_CODE.NOTFOUND, false, "Can not find role !", null));
                }
            })
        }
        await userModel.create(user)
            .then(async (rs) => {
                await roleModel.findByIdAndUpdate({ _id: user._roles }, { $push: { _users: rs._id } });
                res.status($S_CODE.OK).json($lib.showResponse($S_CODE.OK, true, $S_MESSAGE.SUCCESS, rs));
            })
            .catch(e => {
                if (e.toString().includes("duplicate")) {
                    res.status($S_CODE.DUPLICATE).json($lib.showResponse($S_CODE.DUPLICATE, false, e, null));    
                }
                if (e.toString().includes("required")) {
                    res.status($S_CODE.MISSING_DATA).json($lib.showResponse($S_CODE.MISSING_DATA, false, e, null));
                }
                res.status(STATUS.ERROR).json($lib.showResponse($S_CODE.ERROR, false, e, null))
            });
    } catch (error) {
        res.status($S_CODE.ERROR).json($lib.showResponse($S_CODE.ERROR, false, error, null));
    }
};

const checkLogin =  async (req, res, next) => {
    try {
        let query = { username: req.body.username };
        var password = req.body.password;
        if(typeof password !== typeof ""){
            res.json($lib.showResponse($S_CODE.MISSING_DATA, false, 'Password must be string !', null));
        }
        await userModel.findOne(query, async function (err, user) {
            if (err) {
                res.json($lib.showResponse($S_CODE.NOTFOUND, false, 'Can not find user ' + req.body.username + ' !', null));
            } else if (user) {
                if (!!password) {
                    if (bcrypt.compareSync(password, user.password)) {
                        let roleName = (await roleModel.findOne({ _id: user._roles })).roleName;
                        let payload = { username: user.username, roleName: roleName, email: user.email };
                        var jwtToken = jwt.sign(payload, key);
                        let result = {
                            _id: user._id,
                            username: user.username,
                            role: roleName,
                            token: jwtToken
                        }
                        res.json($lib.showResponse($S_CODE.OK, true, 'Login success !', result));
                    } else {
                        res.json($lib.showResponse($S_CODE.MISSING_DATA, false, 'Password wrong !', null));
                    }
                } else {
                    res.json($lib.showResponse($S_CODE.MISSING_DATA, false, 'Password wrong !', null));
                }

            }
        })
    } catch (error) {
        res.json($lib.showResponse($S_CODE.ERROR, false, error, null));
    }
}

const updateUserByUsername = async (req, res, next) => {
    try {
        /*[ Username or password must not null ]*/
        // if (req.body.username == null) {
        //     return res.json($lib.showResponse(STATUS.MISSING_DATA, false, "Username must not null !", null));
        // }
        /*[ Find Role ]*/
        if (req.body._roles != null) {
            if (Number.isInteger(req.body._roles)) {
                let role = await roleModel.findOne({ roleNumber: req.body._roles });
                if (!role) {
                    return res.json($lib.showResponse(STATUS.NOTFOUND, false, "Can not find role (roleNumber) !", null));
                }
            } else {
                return res.json($lib.showResponse(STATUS.MISSING_DATA, false, "Type of role is incorrect !", null));
            }
        }
        var query = { username: req.params.username };
        let oldUser = await userModel.findOne(query);
        if (!!oldUser) {
            await userModel.findOneAndUpdate(query, {
                username: req.params.username,
                password: req.body.password != null ? req.body.password : oldUser.password,
                _roles: req.body._roles == null ? oldUser._roles : (await roleModel.findOne({ roleNumber: req.body._roles })).toJSON()._id,
                email: req.body.email != null ? req.body.email : oldUser.email,
                isActive: req.body.isActive == null ? oldUser.isActive : req.body.isActive == false ? false : true
            }, { multi: false })
            return res.json($lib.showResponse(STATUS.OK, true, "Success !", await userModel.findOne(query)))
        } else {
            return res.json($lib.showResponse(STATUS.NOTFOUND, false, "Can not find user " + req.params.username + " !", null));
        }
    } catch (error) {
        next(error)
    }
};

const deleteUserByUsername = async (req, res, next) => {
    try {
        var query = { username: req.params.username }
        let oldUser = await userModel.findOne(query)
        if (!!oldUser) {
            await userModel.findOneAndUpdate(query, {
                isActive: false
            }, { multi: false })
            return res.json($lib.showResponse(STATUS.OK, true, "Success !", await userModel.findOne(query)));
        } else {
            return res.json($lib.showResponse(STATUS.NOTFOUND, false, "Can not find user " + req.params.username + " !", null));
        }
    } catch (error) {
        next(error)
    }
};

const updateRoleByUsername = async (req, res, next) => {
    try {
        var query = { username: query.params.username };
        var oldUser = await userModel.findOne(query);
        if (oldUser) {
            await userModel.findOneAndUpdate(query, {
                role: req.body.role == 1 ? 1 : 2
            }, { multi: false })
            return res.json({
                status: STATUS.OK,
                success: true,
                message: "Update role success !",
                data: await userModel.findOne(query)
            })
        } else {
            return res.json({
                status: STATUS.NOTFOUND,
                success: false,
                message: "Can not find user " + req.params.username + " !",
                data: null
            })
        }
    } catch (error) {
        return res.json($lib.showResponse(STATUS.ERROR, false, error, null))
    }
}


module.exports = {
    getAllAccount,
    createUser,
    updateUserByUsername,
    deleteUserByUsername,
    updateRoleByUsername,
    checkLogin
};