var mongoose = require("mongoose");

var parentMenuSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    _subMenus: [{ type: mongoose.Schema.Types.ObjectId, ref: "subMenus", default: [] }],
    isActive: { type: Boolean, default: false },
});

var ParentMenu = mongoose.model("parentmenus", parentMenuSchema);
module.exports = ParentMenu;