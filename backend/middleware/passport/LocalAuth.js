const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

const jwtKey = 'testing';
const Crypt = require("../Crypt");
const SaveData = require("../redis/SaveData");
let redisConfig = require('../../config/redisClient.json');
const Users = require('../../models/Users');

module.exports = () => {
  passport.use(new LocalStrategy({
        usernameField: 'account',
        passwordField: 'password',
        session: true,
      }, function verify(account, password, result) {
        Users.findOne({
          where: {
            account: account,
          },
        })
          .then(async (response) => {
            if (response == null) {
              return result(null, null);
            } else {
              const hashedPass = await Crypt.decrypt(response.dataValues.salt, password)
              if(response.dataValues.password === hashedPass) {
                const token = jwt.sign(
                  {
                    account: response.dataValues.account,
                    address1: response.dataValues.address1,
                    address2: response.dataValues.address2,
                    address3: response.dataValues.address3,
                  },
                  jwtKey,
                  { 
                    algorithm: 'HS256',
                    expiresIn: 60 * 60 * 24,
                  }
                );

                const data = {
                  account: account,
                  token: token
                }

                await SaveData.SaveData(redisConfig[1], data)
                .then(() => { 
                  console.log('LocalAuth success\nWelcome',response.dataValues.account)
                })
                .catch(() => {
                  console.error("failed saveData");
                })                
                return result(null, data);
                
              } else {
                console.error('basicAuth Failed...');
                return result(null, false);
              }
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
