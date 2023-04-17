 exports.CheckToken = async (dbNumber, account, inputToken) => {
    const redis = require("redis");
    const redisConfig = require("../config/redisClient.json");
    
    const redisClient = redis.createClient(redisConfig[dbNumber]);
    await redisClient.connect();
    let standardToken = await redisClient.get(account);
    await redisClient.disconnect();

    if(standardToken == inputToken) {
        return true;
    }
    else {
        return false;
    }
}