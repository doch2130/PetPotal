 exports.CheckToken = async (dbNumber, account, inputToken) => {
    const redis = require("redis");
    const redisConfig = require("../config/redisClient.json");
    
    const redisClient = redis.createClient(redisConfig[dbNumber]);
    await redisClient.connect();
    let standardToken = await redisClient.get(account);
    await redisClient.disconnect();

    if(standardToken == inputToken) {
        // console.log("redisToken:\n", standardToken);
        // console.log("inputToken:\n", inputToken);
        // console.log("token이 일치합니다.");
        return true;
    }
    else {
        // console.log("redisToken:\n", standardToken);
        // console.log("inputToken:\n", inputToken);
        // console.error("token이 일치하지 않습니다.");
        return false;
    }
}