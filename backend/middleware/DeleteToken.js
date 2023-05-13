const jwt = require("jsonwebtoken");
const redis = require("redis");
const redisConfig = require("../config/redisClient.json");

exports.DeleteToken = async (dbNumber, inputToken) => {   
    let account = jwt.decode(inputToken).account;

    const redisClient = redis.createClient(redisConfig[dbNumber]);
    await redisClient.connect();
    let standardToken = await redisClient.del(account);
    await redisClient.disconnect();

    if(standardToken == true) {
        return true;
    } else {
        return false;
    }

}