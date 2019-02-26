var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String, 
        required: true 
    },
    _roles: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "roles" ,
        required: true
    },
    email: { 
        type: String,
        default: ""
    },
    isActive: { 
        type: Boolean,
        default: false 
    }
});

userSchema.methods.comparePassword = function (pass) {
    return bcrypt.compareSync(pass, this.password)
}

var Users = mongoose.model("users", userSchema);
module.exports = Users;