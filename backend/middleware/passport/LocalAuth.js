const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const SaveData = require("../redis/SaveData");
let redisConfig = require('../../config/redisClient.json');

dotenv.config({
  path: './config/.env',
});

const Users = require('../../models/Users');

module.exports = () => {
  passport.use(new LocalStrategy({
        usernameField: 'account',
        passwordField: 'password',
        session: false,
      }, function verify(account, password, result) {
        Users.findOne({
          where: {
            account: account,
            usersStatus: parseInt(1)
          },
        })
        .then(async (response) => {
          if (response == null) {
            return result(null, null);
          } else {
            const comparePassResult = bcrypt.compareSync(password, response.dataValues.password);
            if(comparePassResult == true) {
              const token = jwt.sign(
                {
                  account: response.dataValues.account,
                },
                process.env.JWT_SECRET,
                { 
                  algorithm: 'HS256',
                  expiresIn: 60 * 60 * 24 * 1,
                }
              );
              const data = {
                account: account,
                address1: response.dataValues.address1,
                address2: response.dataValues.address2,
                address3: response.dataValues.address3,
                address4: response.dataValues.address4,
                token: token
              }

              await SaveData.SaveData(redisConfig[1], data)
              .then(() => { 
                console.log('LocalAuth success Welcome',response.dataValues.account)
              })
              .catch(() => {
                console.error("failed saveData");
              })                
              return result(null, data);
            }
            else {
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
