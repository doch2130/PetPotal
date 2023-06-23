const passport = require("passport");
const Local = require("./LocalAuth");
const JWT = require("./JwtAuth");
const Users = require("../../models/Users");

module.exports = () => {    
    passport.serializeUser((users, done) => {
        // console.log("SerializeUser users");
        return done(null, users.account);
    });

    passport.deserializeUser((users, done) => {
        // console.log("DeserializeUser uses:", users);
        Users.findOne({ where: { account: users }})
        .then((res) => {
            if(!res) {
                // console.error("DeserializeUser Error:\n", err);
                return done(null, false);
            } else {
                return done(null, res);
            }
        })
        .catch((err) => {
            // console.error("DeserializeUser Error:\n", err);
            return done(null, false);
        })
    });
}

Local();
JWT();