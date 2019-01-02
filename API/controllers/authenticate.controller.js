const userModel = require("../models/user.model");
const STATUS = require("../contains/status.response");
const showRes = require("../library/message");
const roleModel = require("../models/role.model");
const jwt = require('jsonwebtoken');
const key = 'jdn97';

const authenticate = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if(token){
        jwt.verify(token, key, (err, decoded) => {
            if(err){
                return res.json(showRes.showResponse(STATUS.ERROR, false, 'Authenticate error !', null));
            }else{
                req.decoded = decoded;
                return res.json(showRes.showResponse(STATUS.OK, true, 'Authenticate success !', decoded));
                //next();
            }
        })
    }else{
        return res.json(showRes.showResponse(STATUS.FORBIDDEN, false, 'No token provided !', null));
    }
}

const createAuthenticate = async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if(!password || !username){
        res.json(showRes.showToken(STATUS.NOTFOUND, false, 'Username or Password must not null !', null));
    }
    await userModel.findOne({username : username}, async function(err, user){
        
        if(!user){
            res.json(showRes.showToken(STATUS.NOTFOUND, false, 'Can not find user !', null));
        }else if(user){
            var isValidPassword = user.comparePassword(password);
            if(!isValidPassword){
                return res.json(showRes.showToken(STATUS.MISSING_DATA, false, 'Password wrong !', null));
            }
            var payload = { username: user.username, roleName: (await roleModel.findById({id: user._roles})).roleName, email: user.email };
            var jwtToken = jwt.sign(payload, key);
            return res.json(showRes.showToken(STATUS.OK, true, 'Authenticate success !', jwtToken));
        }
    })
}
module.exports = {
    authenticate,
    createAuthenticate
}