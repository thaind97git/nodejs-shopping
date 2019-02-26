var mongoose = require("mongoose");

var colorSchema = new mongoose.Schema({
    name: { type: String, required: true , unique: true },
    _products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }],
    isActive: { type: Boolean, default: false }
});

var Color = mongoose.model("colors", colorSchema );
module.exports = Color;