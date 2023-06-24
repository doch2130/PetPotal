const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Users = require("../../models/Users");

const dotenv = require('dotenv');

dotenv.config({
  path: './config/.env',
});

module.exports = () => {
    let opts = {
        jwtFromRequest: ExtractJwt.fromHeader("token"),
        secretOrKey: process.env.JWT_SECRET,
        // issuer: "petpotal",
        // audience: "",
        session: false
    };

    passport.use(new JwtStrategy(opts, function(jwt_payloads, done) {
        console.log("jwt_payloads:", jwt_payloads);
        console.log("jwt_account:", jwt_payloads.account);
        console.log(opts);
        Users.findOne({
            where: {
                account: jwt_payloads.account
            }
        }) 
        .then((user) => { 
            console.log("then user:", user);           
            if(user) {
                console.log("done user:", user);
                return done(null, user);
            } else {
                console.error("error user:", user);
                return done(null, false);          
            }
        })
        .catch((error) => {
            if(error) {
                return done(error, false);
            }
        })
    }));
}