const express = require('express');
const passport = require('passport');
const router = express.Router();

const UsersController = require('../controller/UsersController');

router.post('/signIn', (req, res, next) => {
  passport.authenticate('local', function (err, users) {
    if (users === false) {
      res.send({
        responseCode: 404,
        message: 'Login Failed...',
      });
    } else {
      // console.log(users);
      // console.log(users.token);
      res.cookie('token', users.token, {
        httpOnly: true,
        signed: true,
        // expires: new Date(Date.now() + 86400),
        maxAge: 1000 * 60 * 60 * 24 * 1,
      });
      req.user = req.body.account;
      console.log(req.user);
      res.send({
        responseCode: 200,
        message: 'Login Success',
        // data: users,
        data: users.data,
        token: users.token,
      });
    }
  })(req, res, next);
});
router.post('/signOut', UsersController.signOut);
router.post('/signUp', UsersController.insertUser);
router.post('/duplicateAccount', UsersController.findByAccount);
router.post('/duplicateNickName', UsersController.findByNickName);
router.post('/duplicateEmail', UsersController.findByEmail);
router.post('/duplicatePhone', UsersController.findByPhone);

router.post('/auth', UsersController.loginStatusCheck);

router.get('/sessionGet', (req, res, next) => {
  res.json({
    'req.session': req.session,
    'req.user': req.user,
    'req.passport': req._passport,
  });
});

module.exports = router;
