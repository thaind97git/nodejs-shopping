var mongoose = require("mongoose");

var colorSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    _products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }]
});

var Color = mongoose.model("colors", colorSchema );
module.exports = Color;