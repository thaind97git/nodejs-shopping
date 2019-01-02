var mongoose = require("mongoose");

var roleSchema = new mongoose.Schema({
    roleNumber: { type: Number, required: true, unique: true },
    roleName: { type: String, required: true, unique:true },
    isActive: { type: Boolean, required: true },
    _users: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }]
});

var Role = mongoose.model("roles", roleSchema);
module.exports = Role;