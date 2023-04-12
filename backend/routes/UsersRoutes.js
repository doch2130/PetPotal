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

const UsersController = require("../controller/UsersController");

router.post("/signIn", (req, res, next) => { 
    passport.authenticate("local", function(err, users, info, status) {
        // console.log(users[0]);
        res.send(users[0]);
    }) (req, res, next)
});
router.post("/signUp", UsersController.insertUser)

router.post("/duplicateAccount", UsersController.findByAccount);
router.post("/duplicateEmail", UsersController.findByEmail);
router.post("/duplicatePhone", UsersController.findByPhone);

module.exports = router;