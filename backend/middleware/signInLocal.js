// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const crypto = require("crypto");
// const Users = require("../models/Users");

// module.exports = () => {
//     passport.serializeUser((users, done) => {
//         done(null, users)
//     });

//     passport.deserializeUser((users, done) => {
//         done(null, users);
//     });

//     passport.use(new LocalStrategy({
//         usernameField: "account",
//         passwordField: "password",
//         session: true
//     }, (account, password, done) => {
//         Users.selectByAccount(account, (err, users) => {
//             if(err) { 
//                 return done(err); 
//             }
//             else if(!users) { 
//                 return done(null, "Incorrect Account"); 
//             }
//             else {
//                 return done(null, users);
//             }
//         });
//     }
//     ))
// }