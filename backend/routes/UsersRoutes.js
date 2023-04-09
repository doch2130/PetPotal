/**
 * reference 
 * 1. https://www.passportjs.org/tutorials/password/signup/
 * etc. https://goodmemory.tistory.com/90
 * etc. https://velog.io/@kdo0129/Passport로-로그인-구현하기
 * etc. https://www.zerocho.com/category/NodeJS/post/57b7101ecfbef617003bf457
 */

const express = require("express");
const passport = require("passport");
const router = express.Router();
const crypto = require("crypto");
const mysql = require("../config/mysql");

router.post("/signIn", (req, res, next) => { 
    passport.authenticate("local", function(err, users, info, status) {
        // console.log(users[0]);
        res.send(users[0]);
    }) (req, res, next)
});


router.post("/signUp", (req, res, next) => {
    console.log(req.body);
    let salt = crypto.randomBytes(16).toString("base64");
    crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", (err, hashedPassword) => {
        let convertedPw = hashedPassword.toString("base64");
        if(err) { return next(err); }
        mysql.query("INSERT INTO Users " +
        "(account, password, salt, name, nickName, phone, email, address1, address2, address3, " +
        "joinDate, modifiedDate) " +
        "VALUES(?, ?, ?, ?, ?, " +
        "?, ?, ?, ?, ?, " +
        "?, ?)",
        [
            req.body.account,
            convertedPw,
            salt,
            req.body.name,
            req.body.nickName,
            req.body.phone,
            req.body.email,
            req.body.address1,
            req.body.address2,
            req.body.address3,
            req.body.joinDate,
            req.body.modifiedDate,
        ], (err) => {
            if(err) { return next(err); }
            else { 
                return res.send("ok"); 
            }
            // req.login(function (err) {
            //     if (err) { return next(err); }
            //     res.redirect('/');
            // });
        });
    });
});

module.exports = router;