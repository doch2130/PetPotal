const passport = require('passport');
const redis = require('redis');
const jwt = require('jsonwebtoken');

exports.CheckToken = async (dbNumber, inputToken) => {
  const redisConfig = require('../config/redisClient.json');

  if (inputToken != undefined || inputToken != null) {
    const account = await jwt.decode(inputToken).account;

    const redisClient = redis.createClient(redisConfig[dbNumber]);
    await redisClient.connect();
    let standardToken = await redisClient.get(account);
    await redisClient.disconnect();

    if (standardToken == inputToken) {
      // console.log("redisToken:\n", standardToken);
      // console.log("inputToken:\n", inputToken);
      // console.log("token이 일치합니다.");
      return { account: account, result: true}
    } else {
      // console.log("redisToken:\n", standardToken);
      // console.log("inputToken:\n", inputToken);
      // console.error("token이 일치하지 않습니다.");
      return { account: account, result: false};
    }
  } else {
    return { account: account, result: false};
  }
};

exports.CheckTokenLoginStatus = async (dbNumber, inputToken) => {
  const redis = require('redis');
  const redisConfig = require('../config/redisClient.json');

  // console.log('inputToken : ', inputToken);
  const decodeData = jwt.decode(inputToken.token);
  // console.log('decodeData : ', decodeData);

  const redisClient = redis.createClient(redisConfig[dbNumber]);
  await redisClient.connect();
  const standardToken = await redisClient.get(decodeData.account);
  await redisClient.disconnect();

  // console.log('standardToken ', standardToken);

  if (standardToken == inputToken.token) {
    return { status: true, decodeData };
  } else {
    return { status: false };
  }
};

// exports.CheckTokenLoginStatus = async (dbNumber, inputToken) => {
//   console.log('inputToken:', inputToken);
//   // console.log("token:", token);
//   passport.authenticate('jwt', (err, response, next) => {
//     if (err) {
//       return next(err);
//     } else {
//       return next(response);
//     }
//   });
// };
