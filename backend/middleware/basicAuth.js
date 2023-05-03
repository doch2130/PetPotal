const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const redis = require('redis');

const jwtKey = 'testing';
let redisConfig = require('../config/redisClient.json');
const Users = require('../models/Users');

passport.serializeUser((users, done) => {
  console.log('serializeUser');
  return done(null, users);
});

passport.deserializeUser((users, done) => {
  return done(null, users);
});

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'account',
        passwordField: 'password',
        session: true,
      },
      function verify(account, password, result) {
        Users.findOne({
          where: {
            account: account,
          },
        })
          .then((response) => {
            if (response == null) {
              return result(null, 'Invalid acount');
            } else {
              crypto.pbkdf2(
                password,
                response.dataValues.salt,
                310000,
                32,
                'sha256',
                async (err, hashedPassword) => {
                  if (err) {
                    console.log('crypto err:\n', err);
                    return result(null, err);
                  }
                  // if(!crypto.timingSafeEqual(row[0].password, hashedPassword.toString("base64"))) {
                  //     return result(null, "Invalid password");
                  // }
                  // return result(null, row);
                  if (
                    response.dataValues.password ===
                    hashedPassword.toString('base64')
                  ) {
                    const token = jwt.sign(
                      {
                        account: response.dataValues.account,
                        address1: response.dataValues.address1,
                        address2: response.dataValues.address2,
                        address3: response.dataValues.address3,
                      },
                      jwtKey,
                      { algorithm: 'HS256' }
                    );
                    // 로그인 토큰은 redis db 1에 저장
                    // redis config url format
                    // redis[s]://[[username][:password]@][host][:port][/db-number]
                    const redisClient = redis.createClient(redisConfig[1]);
                    await redisClient.connect();
                    await redisClient.set(account, token);
                    await redisClient.expireAt(
                      account,
                      parseInt(+new Date() / 1000) + 86400
                    );
                    await redisClient.disconnect();

                    console.log(
                      'basicAuth success\nWelcome',
                      response.dataValues.account
                    );
                    console.log(`${account}'s token save in Redis`);
                    let data = {
                      account: response.dataValues.account,
                      address1: response.dataValues.address1,
                      address2: response.dataValues.address2,
                      address3: response.dataValues.address3,
                    };
                    // return result(null, data);
                    return result(null, { data, token });
                  } else {
                    console.error('basicAuth Failed...');
                    return result(null, null);
                  }
                }
              );
            }
          })
          .catch((err) => {
            console.log('findOne catch');
            return result(null, err);
          });
      }
    )
  );
};
