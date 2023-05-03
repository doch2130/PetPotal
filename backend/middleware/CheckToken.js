const jwt = require('jsonwebtoken');

exports.CheckToken = async (dbNumber, inputToken) => {
  const redis = require('redis');
  const redisConfig = require('../config/redisClient.json');

  let account = jwt.decode(inputToken).account;

  const redisClient = redis.createClient(redisConfig[dbNumber]);
  await redisClient.connect();
  let standardToken = await redisClient.get(account);
  await redisClient.disconnect();

  if (standardToken == inputToken) {
    // console.log("redisToken:\n", standardToken);
    // console.log("inputToken:\n", inputToken);
    // console.log("token이 일치합니다.");
    return true;
  } else {
    // console.log("redisToken:\n", standardToken);
    // console.log("inputToken:\n", inputToken);
    // console.error("token이 일치하지 않습니다.");
    return false;
  }
};

exports.CheckTokenLoginStatus = async (dbNumber, inputToken) => {
  const redis = require('redis');
  const redisConfig = require('../config/redisClient.json');

  // let account = jwt.decode(inputToken).account;

  const decodeData = jwt.decode(inputToken);

  const redisClient = redis.createClient(redisConfig[dbNumber]);
  await redisClient.connect();
  let standardToken = await redisClient.get(decodeData.account);
  await redisClient.disconnect();

  if (standardToken == inputToken) {
    // console.log("redisToken:\n", standardToken);
    // console.log("inputToken:\n", inputToken);
    // console.log("token이 일치합니다.");
    // return { status: true, account };
    return { status: true, decodeData };
  } else {
    // console.log("redisToken:\n", standardToken);
    // console.log("inputToken:\n", inputToken);
    // console.error("token이 일치하지 않습니다.");
    return { status: false };
  }
};
