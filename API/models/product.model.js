var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    productCode: { type: String, required: true, unique: true },
    name: { type: String },
    description: { type: String },
    isPromotion: { type: Boolean },
    quantity: { type: Number },
    startPrice: { type: Number },
    percentPromotion: { type: Number },
    dateSubmitted: { type: Date, default: Date.now },
    isActive: { type: Boolean, required: true },
    _subMenu: { type: mongoose.Schema.Types.ObjectId, ref: "submenus" },
    _images: {
        Image: { type: String },
        SubImage: [{ type: String }]
    },
    _colors: [{ type: mongoose.Schema.Types.ObjectId, ref: "colors" }],
    _sizes: [{ type: mongoose.Schema.Types.ObjectId, ref: "sizes" }]
});

var Product = mongoose.model("products", productSchema);
module.exports = Product;