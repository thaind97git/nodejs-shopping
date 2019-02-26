var mongoose = require("mongoose");

var subMenuSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    _product: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    _parentMenu: { type: mongoose.Schema.Types.ObjectId, ref: "parentmenus", required: true },
    isActive: { type: Boolean, required: true }
})

var subMenu = mongoose.model("subMenus", subMenuSchema);
module.exports = subMenu;