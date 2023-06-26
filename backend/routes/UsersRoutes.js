const express = require('express');

const UsersController = require('../controller/UsersController');
const MulterFileHandler2 = require('../middleware/filehandler/MulterFileHandler2');

const router = express.Router();

const { signInState, noSignInState, } = require('../middleware/passport/SignInState'); // Session기반 로그인 상태관리의 경우 사용
const userProfileImageUpload = MulterFileHandler2.ImageFileHandler("profile");
const userProfileImageUploadController = userProfileImageUpload.single('usersProfile');

// router.post("signIn", noSignInState, UsersController.signIn);
router.post("/signIn", UsersController.signIn);
// router.post('/signOut', signInState, UsersController.signOut); // signInState는 Session 기반 로그인 상태 관리에서 사용
router.post('/signOut', UsersController.signOut);
router.post('/signUp', UsersController.insertUsers);
router.post('/duplicateAccount', UsersController.findByAccount);
router.post('/duplicateNickName', UsersController.findByNickName);
router.post('/duplicateEmail', UsersController.findByEmail);
router.post('/duplicatePhone', UsersController.findByPhone);
router.post('/mypageUsersInfo', UsersController.findUsersInfo);
router.post('/usersInfoModify', UsersController.updateUsers);
router.put("/updatePassword", UsersController.updatePassword);
router.get('/profile', UsersController.selectUsersProfileImage);
router.post('/updateProfile', userProfileImageUploadController, UsersController.updateProfileImage);
router.post("/resetPass", UsersController.requestDefaultPassword);
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
router.post("/jwtTest", UsersController.jwtTest);

module.exports = router;
