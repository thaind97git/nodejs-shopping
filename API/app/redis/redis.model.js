var mongoose = require("mongoose");
var redisSchema = new mongoose.Schema({
    albumId: {
        type: Number
    },
    id: { 
        type: Number
    },
    title: { 
        type: String, 
    },
    url: { 
        type: String,
    },
    thumbnailUrl: { 
        type: String,
    }
});

var Redis = mongoose.model("redis", redisSchema);
module.exports = Redis;