const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const Users = require("../../models/Users");

module.exports = () => {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretKey: "",
        issuer: "petpotal",
        audience: ""
    };

    passport.use(new JwtStrategy(opts, function(payloads, done) {
        // Users.findOne({id: jwt_payload.sub}, function(err, user) {
        //     if (err) {
        //         return done(err, false);
        //     }
        //     if (user) {
        //         return done(null, user);
        //     } else {
        //         return done(null, false);
        //         // or you could create a new account
        //     }
        // });
    }))
}