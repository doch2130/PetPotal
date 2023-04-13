const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const crypto = require("crypto");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mysql = require("../config/mysql");

module.exports = () => {
    passport.serializeUser((users, done) => {
        done(null, users)
    });

    passport.deserializeUser((users, done) => {
        done(null, users);
    });

    passport.use(new LocalStrategy({
        usernameField: "account",
        passwordField: "password",
        session: true
    },function verify(account, password, result) {
        mysql.query("SELECT * FROM Users u WHERE u.account = ?", [ account ], (err, row) => {
            if(err) { return result(err); }
    
            if(row.length == 0) {
                return result(null, "Invalid Account");
            }
            else {
                crypto.pbkdf2(password, row[0].salt, 310000, 32, "sha256", (err, hashedPassword) => {
                    if(err) { return result(err); }
                    // if(!crypto.timingSafeEqual(row[0].password, hashedPassword.toString("base64"))) {
                    //     return result(null, "Invalid password");
                    // }
                    // return result(null, row);
                    if(row[0].password === hashedPassword.toString("base64")) {
                        console.log("basicAuth success\nWelcome", row[0].account);
                        return result(null, row);
                    }                    
                });
            }
        });
    }));
}