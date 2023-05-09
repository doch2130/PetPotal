const express = require('express');
const passport = require('passport');
const router = express.Router();

const UsersController = require('../controller/UsersController');
const { signInState, noSignInState } = require("../middleware/passport/SignInState");

router.post('/signIn', noSignInState, (req, res, next) => {
  passport.authenticate('local', function (err, users) {
    if (users === false) {
      res.send({
        responseCode: 404,
        message: 'Login Failed...',
      });
    } else {
      return req.login(users, (err) => {
        if(err) {
          console.error("signIn Request Failed:\n", err);
          return res.status(403).send({
            responseCode: 403,
            message: "Login Failure"
          })
        }
        else {
          res.cookie('token', users, {
            httpOnly: true,
            signed: true,
            // expires: new Date(Date.now() + 86400),
            maxAge: 1000 * 60 * 60 * 24 * 1,
          });
          return res.status(200).send({
            responseCode: 200,
            message: 'Login Success',
            data: users
          });
        }
      })
    }
  })(req, res, next);
});
router.post('/signOut', signInState, UsersController.signOut);
router.post('/signUp', UsersController.insertUser);
router.post('/duplicateAccount', UsersController.findByAccount);
router.post('/duplicateNickName', UsersController.findByNickName);
router.post('/duplicateEmail', UsersController.findByEmail);
router.post('/duplicatePhone', UsersController.findByPhone);

router.post('/auth', UsersController.loginStatusCheck);

router.get('/sessionGet', (req, res) => {
  return res.send({
    'req.session': req.session,
    'req.passport': req._passport,
  });
});

module.exports = router;
