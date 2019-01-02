var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
    Image: { type: String },
    SubImage: [ {type: String} ],
    _product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true }
});

var Image = mongoose.model("images", imageSchema);
module.exports = Image;