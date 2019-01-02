var mongoose = require ("mongoose")

var sizeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    _product: [{ type: mongoose.Schema.Types.ObjectId, ref: "products" }]
});

var Size = mongoose.model("sizes", sizeSchema);
module.exports = Size;