var mongoose = require("mongoose");

var parentMenuSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    _subMenus: [{ type: mongoose.Schema.Types.ObjectId, ref: "subMenus", required: false }],
    isActive: { type: Boolean, required: true },
});

var ParentMenu = mongoose.model("parentmenus", parentMenuSchema);
module.exports = ParentMenu;