/**
 * reference
 * 1. https://www.passportjs.org/tutorials/password/signup/
 * etc. https://goodmemory.tistory.com/90
 * etc. https://velog.io/@kdo0129/Passport로-로그인-구현하기
 * etc. https://www.zerocho.com/category/NodeJS/post/57b7101ecfbef617003bf457
 */

const express = require('express');
const passport = require('passport');
const router = express.Router();

const UsersController = require('../controller/UsersController');

router.post('/signIn', (req, res, next) => {
  passport.authenticate('local', function (err, users, info, status) {
    if (users === false) {
      res.send({
        responseCode: 404,
        message: 'Login Failed...',
      });
    } else {
      res.cookie('token', users, {
        httpOnly: true,
        // expires: new Date(Date.now() + 86400),
        maxAge: 1000 * 60 * 60 * 24 * 1,
      });
      res.cookie('account', req.body.account, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 1,
      });
      res.send({
        account: req.body.account,
        responseCode: 200,
        message: 'Login Success',
      });
    }
  })(req, res, next);
});
router.post('/signUp', UsersController.insertUser);

router.post('/duplicateAccount', UsersController.findByAccount);
router.post('/duplicateNickName', UsersController.findByNickName);
router.post('/duplicateEmail', UsersController.findByEmail);
router.post('/duplicatePhone', UsersController.findByPhone);

module.exports = router;
