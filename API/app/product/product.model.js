var mongoose = require("mongoose");

let Sizes = ['X', 'S'];
var productSchema = new mongoose.Schema({
    productCode: { type: String, required: true, unique: true, trim: true },
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    isPromotion: { type: Boolean, default: false },
    quantity: { type: Number, default: 0 },
    startPrice: { type: Number, default: 0 },
    percentPromotion: { type: Number, default: 0 },
    dateSubmitted: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false },
    _subMenu: { type: mongoose.Schema.Types.ObjectId, ref: "submenus", default: null },
    _images: {
        Image: { type: String, default: "" },
        SubImage: [{ type: String, default: [] }]
    },
    _colors: [{ type: mongoose.Schema.Types.ObjectId, ref: "colors", default: [] }],
    _sizes: [{ type: String, validate: [value => Sizes.includes(value), "This size does not exist !"]}]
});
var Refer = function () {
    return {
        getAllSize: function () {
            return Sizes;
        },
        createNewSize: function(size) {
            if (size === typeof String) {
                return Sizes.push(size);
            }
        },
        deleteSize: function (size) {
            if (size === typeof String) {
                return Sizes = Sizes.filter(s => s !== size);
            }
        }
    }
}
var Product = mongoose.model("products", productSchema);
module.exports = Product