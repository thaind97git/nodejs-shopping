const redisModel = require("./redis.model");
const request = require("request")
const url = 'https://jsonplaceholder.typicode.com/photos';
var redis = require("redis"),
    client = redis.createClient();

const insertData = (req, res) => {
    request({
        url: url,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            redisModel.insertMany(body, (err, rs) => {
                if (err) {
                    return res.json({ msg: 'save error' })
                }
                return res.json({ msg: 'save success' })
            })
        }
    })
}

const getCount = (req, res) => {
    redisModel.count({}, (err, count) => {
        if (err) {
            return res.json({ msg: 'Error: ' + err })
        }
        return res.json({ count: count })
    })
}

const getDataFromDB = (req, res) => {
    const startTime = (new Date()).getTime();
    redisModel.find({}, (err, rs) => {
        const currentTime = new Date().getTime();
        if (err) {
            return res.json({ msg: 'Error: ' + err })
        }
        const time = currentTime - startTime;
        return res.json({ time_request_database: time + ' milliseconds' })
    })
}

const insertDataToRedis = (req, res) => {
    redisModel.find({}, (err, rs) => {
        if (err) {
            return res.json({ msg: 'Error: ' + err })
        }
        client.hmset('data1', rs)
        client.hgetall('data1', (er, obj) => {
            if (er) {
                return res.json({ msg: 'Error hgetall: ' + er })
            }
            return res.json({ data1: obj })
        })
    })
}

const getDataFromRedis = (req, res) => {
    const startTime = (new Date()).getTime();
    client.hgetall('data1', (er, obj) => {
        const currentTime = new Date().getTime();
        if (er) {
            return res.json({ msg: 'Error hgetall: ' + er })
        }
        const time = currentTime - startTime;
        return res.json({ time_request_redis: time + ' milliseconds' })
    })
}

module.exports = {
    insertData,
    getCount,
    getDataFromDB,
    insertDataToRedis,
    getDataFromRedis
};