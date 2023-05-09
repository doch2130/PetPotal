const redis = require("redis");

exports.SaveData = async (redisConfig, data) => {
    const redisClient = redis.createClient(redisConfig);
    await redisClient.connect();
    await redisClient.set(data.account, data.token);
    await redisClient.expireAt(data.account, parseInt(+new Date() / 1000) + 86400);
    await redisClient.disconnect();
    console.log(`${data.account}'s token save in Redis`);
}
