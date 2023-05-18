const express = require('express');
const passport = require('passport');

const app = express();
const router = express.Router();
const UsersController = require('../controller/UsersController');
const ProfileFileHandler = require('../middleware/filehandler/ProfileFileHandler');
const userProfileImageUpload = ProfileFileHandler.profileImageFileHandler();
const userProfileImageUploadController =
  userProfileImageUpload.single('usersProfile');
const { signInState, noSignInState, } = require('../middleware/passport/SignInState');

router.post('/signIn', noSignInState, (req, res, next) => {
  passport.authenticate('local', function (err, users) {
    if (users === false) {
      res.status(403).send({
        responseCode: 403,
        message: 'Login Failed...',
        // error: err
      });
    } else {
      return req.login(users, (err) => {
        if (err) {
          console.error('signIn Request Failed:\n', err);
          return res.status(403).send({
            responseCode: 403,
            message: 'Login Failure',
          });
        } else {
          UsersController.signInTimeUpdate(req.body.account);
          res.cookie('token', users, {
            httpOnly: true,
            signed: true,
            // expires: new Date(Date.now() + 86400),
            maxAge: 1000 * 60 * 60 * 24 * 1,
          });
          return res.status(200).send({
            responseCode: 200,
            message: 'Login Success',
            data: users,
          });
        }
      });
    }
  })(req, res, next);
});
router.post('/signOut', signInState, UsersController.signOut);
router.post('/signUp', UsersController.insertUsers);
router.post('/duplicateAccount', UsersController.findByAccount);
router.post('/duplicateNickName', UsersController.findByNickName);
router.post('/duplicateEmail', UsersController.findByEmail);
router.post('/duplicatePhone', UsersController.findByPhone);
router.post('/mypageUsersInfo', UsersController.findUsersInfo);
router.post('/usersInfoModify', UsersController.updateUsers);
router.get('/profile', UsersController.selectUsersProfileImage);
router.post('/updateProfile', userProfileImageUploadController, UsersController.updateProfileImage);
router.post('/terminate', UsersController.dormancyUsers);

router.post('/auth', UsersController.loginStatusCheck);

router.get('/sessionGet', (req, res) => {
  return res.send({
    "req.port": req.socket.localPort,
    'req.session': req.session,
    'req.passport': req._passport,
  });
});
router.post("/defaultPass", UsersController.defaultPassword);

// mypage user info load test
// router.post('/mypage/userInfoLoad', UsersController.test2);

module.exports = router;
