const Users = require('../models/Users');
const passport = require('passport');
const fs = require('fs');

const Crypt = require('../middleware/Crypt');
const CurrentDate = require('../middleware/CurrentDate');
const CheckToken = require('../middleware/CheckToken');
const DeleteToken = require('../middleware/DeleteToken');

/**
 * @desc 로그인 수행시간 반영
 * @param {String} account - 로그인을 수행할 계정
 */
exports.signInTimeUpdate = (account) => {
  const lastLoginDate = CurrentDate.CurrentTimeStamp();
  Users.update(
    { lastLoginDate: lastLoginDate },
    { where: { account: account } }
  )
    .then(() => {
      // console.log("signInTimeUpdate Complete");
    })
    .catch((error) => {
      console.error('signInTimeUpdate Fail\n', error);
    });
};

/**
 * @desc 로그아웃을 수행하는 메서드 세션을 폐기하고, 사용자의 cookie를 제거한다.
 * @param {*} request - request.headers.token Request Header에 token 삽입
 * @param {*} response
 */
exports.signOut = (request, response) => {
  request.logout(async (err) => {
    if (err) {
      console.log('err ', err);
      return response.send({
        responseCode: 400,
        data: false,
        message: err,
      });
    } else {
      const existToken = request.headers.token;
      // console.log("existToken:", existToken);
      const checkTokenResult = await CheckToken.CheckToken(1, existToken);
      if (checkTokenResult) {
        await DeleteToken.DeleteToken(1, existToken);
        request.session.destroy(() => {
          response.clearCookie('token');
          response.clearCookie('petpotal');
          response.status(200).send({
            responseCode: 200,
            message: 'Success SignOut',
          });
        });
      } else {
        request.session.destroy(() => {
          response.clearCookie('token');
          response.clearCookie('petpotal');
          response.status(403).send({
            responseCode: 403,
            message: 'Already SignOut or Invalid Key',
            error: err,
          });
        });
      }
    }
  });
};

/**
 * 회원가입을 수행하는 메서드
 * @param {*} request - Request Body에 데이터 삽입 프론트에서 x-www-url-form-urlencoded 형식으로 요청(var urlencoded = new URLSearchParams();)
 * @param {*} response
 */
exports.insertUsers = async (request, response) => {
  let hashed = await Crypt.encrypt(request.body.password);
  let salt = hashed.salt;
  let hashedPass = hashed.hashedpw;

  const currentTimeStamp = CurrentDate.CurrentTimeStamp();

  const insertUser = await Users.create({
    account: request.body.account,
    password: hashedPass,
    salt: salt,
    name: request.body.name,
    nickName: request.body.nickName,
    phone: request.body.phone,
    email: request.body.email,
    address1: request.body.address1,
    address2: request.body.address2,
    address3: request.body.address3,
    address4: request.body.address4,
    joinDate: currentTimeStamp,
    modifiedDate: currentTimeStamp,
  });

  if (insertUser == null) {
    response.send({
      responseCode: 200,
      message: '회원가입 실패',
    });
  } else {
    response.send({
      responseCode: 200,
      message: '회원가입 완료',
    });
  }
};

/**
 * 아이디 중복을 검사하는 메서드 중복일경우 false, 중복이 아닌경우 true 반환
 * @param {*} request
 * @param {*} response
 * @returns { boolean }
 */
exports.findByAccount = (request, response) => {
  Users.findOne({
    attributes: ['account'],
    where: { account: request.body.account },
  }).then((res) => {
    if (res == null) {
      // account가 중복이 아닌경우
      response.send({
        responseCode: 200,
        data: true,
      });
    } else {
      response.send({
        responseCode: 304,
        data: false,
      });
    }
  });
};

/**
 * 닉네임 중복을 검사하는 메서드 중복일경우 false, 중복이 아닌경우 true 반환
 * @param {*} request
 * @param {*} response
 * @returns { boolean }
 */
exports.findByNickName = (request, response) => {
  Users.findOne({
    attributes: ['nickName'],
    where: { nickName: request.body.nickName },
  }).then((res) => {
    if (res == null) {
      response.send({
        responseCode: 200,
        data: true,
      });
    } else {
      response.send({
        responseCode: 304,
        data: false,
      });
    }
  });
};

/**
 * 이메일 중복을 검사하는 메서드 중복일경우 false, 중복이 아닌경우 true 반환
 * @param {*} request
 * @param {*} response
 * @returns { boolean }
 */
exports.findByEmail = (request, response) => {
  Users.findOne({
    attributes: ['email'],
    where: { email: request.body.email },
  }).then((res) => {
    if (res == null) {
      response.status(200).send({
        responseCode: 200,
        data: true,
      });
    } else {
      response.status(200).send({
        responseCode: 304,
        data: false,
      });
    }
  });
};

/**
 * 전화번호 중복을 검사하는 메서드 중복일경우 false, 중복이 아닌경우 true 반환
 * @param {*} request
 * @param {*} response
 * @returns { boolean }
 */
exports.findByPhone = (request, response) => {
  Users.findOne({
    attributes: ['phone'],
    where: { phone: request.body.phone },
  }).then((res) => {
    if (res == null) {
      response.status(200).send({
        responseCode: 200,
        data: true,
      });
    } else {
      response.status(304).send({
        responseCode: 304,
        data: false,
      });
    }
  });
};

/**
 * 아이디를 통해 해당 사용자의 정보를 조회하는 메서드
 * [아이디, 이름, 닉네임, 전화번호, 이메일, 주소] 정보를 조회
 * @param {String} request
 * @param {*} response
 */
exports.findUsersInfo = async (request, response) => {
  const checkTokenResult = await CheckToken.CheckToken(
    1,
    request.headers.token
  );

  if (checkTokenResult) {
    Users.findOne({
      attributes: [
        'account',
        'name',
        'nickName',
        'phone',
        'email',
        'address1',
        'address2',
        'address3',
        'address4',
      ],
      where: { account: request.body.account },
    })
      .then((res) => {
        response.status(200).send({
          responseCode: 200,
          message: 'Success',
          data: res,
        });
      })
      .catch((err) => {
        response.status(400).send({
          responseCode: 400,
          message: 'Failed',
          data: err,
        });
      });
  } else {
    response.status(500).send({
      responseCode: 500,
      message: 'Invalid Key',
      data: false,
    });
  }
};

/**
 * 회원정보를 변경하는 메서드
 * @param {*} request
 * @param {*} response
 */
exports.updateUsers = async (request, response) => {
  const checkTokenResult = await CheckToken.CheckToken(
    1,
    request.headers.token
  );
  const currentTimeStamp = CurrentDate.CurrentTimeStamp();
  let newHashed, newSalt, newHashedPass;

  if (checkTokenResult == true) {
    if (
      (request.body.changePassword === undefined ||
        request.body.changePassword == '') &&
      (request.body.password != undefined || request.body.password != '')
    ) {
      Users.findOne({
        attributes: ['salt'],
        where: { account: request.body.account },
      })
        .then(async (res) => {
          // console.log(res.dataValues.salt);
          const hashedPass = await Crypt.decrypt(
            res.dataValues.salt,
            request.body.password
          );
          Users.update(
            {
              name: request.body.name,
              nickName: request.body.nickName,
              address1: request.body.address1,
              address2: request.body.address2,
              address3: request.body.address3,
              address4: request.body.addresss4,
              modifiedDate: currentTimeStamp,
            },
            {
              where: {
                account: request.body.account,
                password: hashedPass,
              },
            }
          )
            .then(() => {
              response.status(200).send({
                responseCode: 200,
                message: 'Modified Complete(not change pass)',
                data: true,
              });
            })
            .catch((err) => {
              response.status(500).send({
                responseCode: 500,
                message: 'Modified Fail',
                data: false,
                error: err,
              });
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (
      request.body.changePassword === null &&
      request.body.password != null
    ) {
      newHashed = await Crypt.encrypt(request.body.changePassword);
      newSalt = newHashed.salt;
      newHashedPass = newHashed.hashedpw;
      Users.update(
        {
          password: newHashedPass,
          salt: newSalt,
          name: request.body.name,
          nickName: request.body.nickName,
          address1: request.body.address1,
          address2: request.body.address2,
          address3: request.body.address3,
          address4: request.body.addresss4,
          modifiedDate: currentTimeStamp,
        },
        {
          where: {
            account: request.body.account,
          },
        }
      )
        .then((res) => {
          response.status(200).send({
            responseCode: 200,
            message: 'Modified Complete(apply new pass)',
            data: true,
          });
        })
        .catch((err) => {
          response.status(500).send({
            responseCode: 500,
            message: 'Modified Fail',
            data: false,
          });
        });
    }
  } else {
    response.status(403).send({
      responseCode: 403,
      message: 'Invalid Key',
      data: false,
    });
  }
};

exports.selectUsersProfileImage = async (request, response) => {
  // console.log(request.query);
  await Users.findOne({
    attributes: ['profileImageFileName'],
    where: { account: request.query.account },
  })
    .then((res) => {
      response.status(200).send({
        responseCode: 200,
        message: 'profileImage Loading complete',
        data: `http://${request.host}:3010${request.originalUrl}/${res.dataValues.profileImageFileName}`,
      });
    })
    .catch((err) => {
      response.status(403).send({
        responseCode: 403,
        message: 'profileImage Loading failed...',
        data: false,
      });
    });
};

/**
 * 회원의 프로필이미지를 업데이트 합니다.
 * frontend에서 request를 요청할 때
 * body의 키는 usersProfile
 * @param {*} request.headers.account 요청 헤더의 필수 키 account
 * @param {*} request.files 요청 바디의 필수 키 usersProfile
 * @param {*} response
 */
exports.updateProfileImage = async (request, response) => {
  // console.log(request.file);
  const checkTokenResult = await CheckToken.CheckToken(
    1,
    request.headers.token
  );
  const uploaderAccount = request.headers.account;
  const previousProfileFileName = await Users.findOne({
    attributes: ['profileImageFileName'],
    where: { account: uploaderAccount },
  });
  // console.log(previousProfileFileName.dataValues.profileImageFileName);

  if (checkTokenResult) {
    if (
      previousProfileFileName.dataValues.profileImageFileName === undefined ||
      previousProfileFileName.dataValues.profileImageFileName == '' ||
      previousProfileFileName.dataValues.profileImageFileName == null ||
      previousProfileFileName.dataValues.profileImageFileName == 'null'
    ) {
      await Users.update(
        {
          profileImageFileName: request.file.filename,
        },
        {
          where: {
            account: uploaderAccount,
          },
        }
      )
        .then((res) => {
          response.status(200).send({
            responseCode: 200,
            message: 'profile update success',
            data: true,
          });
        })
        .catch((err) => {
          response.status(403).send({
            responseCode: 403,
            message: 'profile update failure',
            data: false,
          });
        });
    } else {
      await fs.rmSync(
        `./data/profile/${previousProfileFileName.dataValues.profileImageFileName}`
      );
      await Users.update(
        {
          profileImageFileName: request.file.filename,
        },
        {
          where: {
            account: uploaderAccount,
          },
        }
      )
        .then((res) => {
          response.status(200).send({
            responseCode: 200,
            message: 'profile update success',
            data: true,
          });
        })
        .catch((err) => {
          response.status(403).send({
            responseCode: 403,
            message: 'profile update failure',
            data: false,
          });
        });
    }
  } else {
    response.status(500).send({
      responseCode: 500,
      message: 'Invalid Key',
      data: false,
    });
  }
};

/**
 * 회원탈퇴를 신청하는 메서드
 * @param {*} request
 * @param {*} response
 */
exports.dormancyUsers = async (request, response) => {
  const currentTimeStamp = CurrentDate.CurrentTimeStamp();
  const checkTokenResult = await CheckToken.CheckToken(
    1,
    request.headers.token
  );

  // console.log(request.body.account);

  if (checkTokenResult == true) {
    Users.update(
      {
        modifiedDate: currentTimeStamp,
        usersStatus: parseInt(3),
      },
      {
        where: {
          account: request.body.account,
        },
      }
    )
      .then(() => {
        response.status(200).send({
          responseCode: 200,
          data: true,
        });
      })
      .catch(() => {
        response.status(502).send({
          responseCode: 502,
          data: false,
        });
      });
  } else {
    response.status(400).send({
      responseCode: 400,
      data: false,
      message: 'Invalid Key',
    });
  }
};

/*
회원가입 메서드 no sequelize
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
*/

// 새로고침 또는 주소 직접 입력 시 로그인 유지 체크 함수
exports.loginStatusCheck = async (req, res) => {
  try {
    const { token } = req.signedCookies;
    // console.log('token : ', token);

    if (!token) {
      res.status(200).send({
        data: {
          account: '',
          responseCode: 401,
          message: 'Not Have Cookie',
        },
        token: '',
      });
      return;
    }
    // console.log('req:\n', req.session);

    // const checkTokenResult = await CheckToken.CheckTokenLoginStatus(1, req.user.toekn, token);
    const checkTokenResult = await CheckToken.CheckTokenLoginStatus(1, token);
    // console.log('checkTokenResult : ', checkTokenResult);

    if (checkTokenResult.status === true) {
      const result = await Users.findOne({
        attributes: ['address1', 'address2', 'address3', 'address4'],
        where: { account: checkTokenResult.decodeData.account },
      });

      res.status(200).send({
        data: {
          account: checkTokenResult.decodeData.account,
          address1: result.address1,
          address2: result.address2,
          address3: result.address3,
          address4: result.address4,
          responseCode: 200,
          message: 'Login Success',
        },
        token,
      });
    } else {
      res.status(200).send({
        data: {
          account: '',
          responseCode: 401,
          message: 'Login Failed...',
        },
        token: '',
      });
    }
  } catch (err) {
    // console.log('loginStatusCheck Error : ', err);
    res.status(500).send({
      data: {
        account: '',
        responseCode: 500,
        message: 'Server Error',
      },
      token: '',
    });
  }
};
