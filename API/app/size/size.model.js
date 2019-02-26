var mongoose = require ("mongoose")

var sizeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    _products: [{ type: mongoose.Schema.Types.ObjectId, ref: "products", default: [] }],
    isActive: { type: Boolean, default: false }
});

var Size = mongoose.model("sizes", sizeSchema);
module.exports = Size;