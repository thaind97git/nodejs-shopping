const express = require("express");
var router = express.Router()
const redisController = require("./redis.controller");


router.get('/redis/insert', redisController.insertData)
router.get('/redis/insertRedis', redisController.insertDataToRedis)
router.get('/redis/count', redisController.getCount)
router.get('/redis/getDB', redisController.getDataFromDB)
router.get('/redis/getRedis', redisController.getDataFromRedis)

module.exports = router;
