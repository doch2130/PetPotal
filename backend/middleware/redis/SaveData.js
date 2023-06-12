const redis = require("redis");

/**
 * 로그인을 성공했을때 생성된 token을 redis에 저장하기 위한 함수
 * @param {*} redisConfig 
 * @param {*} data 
 */
exports.SaveData = async (redisConfig, data) => {
    const redisClient = redis.createClient(redisConfig);
    await redisClient.connect();
    await redisClient.set(data.account, data.token);
    await redisClient.expireAt(data.account, parseInt(+new Date() / 1000) + 86400);
    await redisClient.disconnect();
    console.log(`${data.account}'s token save in Redis`);
}
