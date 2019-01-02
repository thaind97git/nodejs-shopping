var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    _roles: { type: mongoose.Schema.Types.ObjectId, ref: "roles" },
    email: { type: String }, 
    isActive: { type: Boolean, required: true }
});

userSchema.methods.comparePassword = function(pass) {
    return bcrypt.compareSync(pass, this.password)
}

var Users = mongoose.model("users", userSchema);
module.exports = Users;