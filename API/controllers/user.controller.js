const userModel = require("../models/user.model");
const roleModel = require('../models/role.model');
const STATUS = require("../contains/status.response");
const showRes = require("../library/message");
const key = 'jdn97';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const getAllAccount = async (req, res) => {
    let users = await userModel.find();
    return res.json(users)
};

const createUser = async (req, res, next) => {
    try {
        /*[ Username or password must not null ]*/
        if (!req.body.username || !req.body.password) {
            return res.json(showRes.showResponse(STATUS.MISSING_DATA, false, "Username or Password must not null !", null));
        }
        /*[ Find Role ]*/
        if (!!req.body._roles) {
            if (Number.isInteger(req.body._roles)) {
                let role = await roleModel.findOne({ roleNumber: req.body._roles });
                if (!role) {
                    return res.json(showRes.showResponse(STATUS.NOTFOUND, false, "Can not find role (roleNumber) !", null));
                }
            } else {
                return res.json(showRes.showResponse(STATUS.MISSING_DATA, false, "Type of role is incorrect !", null));
            }

        }
        /*[ Find user ]*/
        let oldUser = await userModel.findOne({ username: req.body.username });
        if (!!oldUser) {
            return res.json(showRes.showResponse(STATUS.DUPLICATE, false, "Username is exist !", null));
        }
        let user = {
            username: req.body.username,
            password: bcrypt.hashSync(req.body.password, 10),
            _roles: req.body._roles == null ? (await roleModel.findOne({ roleNumber: 1 })).toJSON()._id :
                (await roleModel.findOne({ roleNumber: req.body._roles })).toJSON()._id,
            email: req.body.email == null ? "" : req.body.email,
            isActive: (req.body.isActive == null || req.body.isActive == false) ? false : true
        } /*[ Get user from body ]*/


        let newUser = await userModel.create(user); /*[ Create New User ]*/
        await roleModel.findByIdAndUpdate({ _id: user._roles }, { $push: { _users: newUser._id } }); /*[ Update Role ]*/
        return res.json(showRes.showResponse(STATUS.OK, true, "Success !", newUser));

    } catch (error) {
        next(error)
    }
};

const checkLogin =  async (req, res, next) => {

    try {
        let query = { username: req.body.username };
        var password = req.body.password;
        if(typeof password !== typeof ""){
            res.json(showRes.showResponse(STATUS.MISSING_DATA, false, 'Password must be string !', null));
        }
        await userModel.findOne(query, async function (err, user) {
            if (!user) {
                res.json(showRes.showResponse(STATUS.NOTFOUND, false, 'Can not find user ' + req.body.username + ' !', null));
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
                        res.json(showRes.showResponse(STATUS.OK, true, 'Login success !', result));
                    } else {
                        res.json(showRes.showResponse(STATUS.MISSING_DATA, false, 'Password wrong !', null));
                    }
                } else {
                    res.json(showRes.showResponse(STATUS.MISSING_DATA, false, 'Password wrong !', null));
                }

            }
        })
    } catch (error) {
        res.json(showRes.showResponse(STATUS.ERROR, false, error, null));
    }
}

const updateUserByUsername = async (req, res, next) => {
    try {
        /*[ Username or password must not null ]*/
        // if (req.body.username == null) {
        //     return res.json(showRes.showResponse(STATUS.MISSING_DATA, false, "Username must not null !", null));
        // }
        /*[ Find Role ]*/
        if (req.body._roles != null) {
            if (Number.isInteger(req.body._roles)) {
                let role = await roleModel.findOne({ roleNumber: req.body._roles });
                if (!role) {
                    return res.json(showRes.showResponse(STATUS.NOTFOUND, false, "Can not find role (roleNumber) !", null));
                }
            } else {
                return res.json(showRes.showResponse(STATUS.MISSING_DATA, false, "Type of role is incorrect !", null));
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
            return res.json(showRes.showResponse(STATUS.OK, true, "Success !", await userModel.findOne(query)))
        } else {
            return res.json(showRes.showResponse(STATUS.NOTFOUND, false, "Can not find user " + req.params.username + " !", null));
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
            return res.json(showRes.showResponse(STATUS.OK, true, "Success !", await userModel.findOne(query)));
        } else {
            return res.json(showRes.showResponse(STATUS.NOTFOUND, false, "Can not find user " + req.params.username + " !", null));
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
        return res.json(showRes.showResponse(STATUS.ERROR, false, error, null))
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