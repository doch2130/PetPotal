const fs = require('fs');
const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");

const Users = require('../models/Users');

const Crypt = require('../middleware/Crypt');
const CurrentDate = require('../middleware/CurrentDate');
const CheckToken = require('../middleware/CheckToken');
const DeleteToken = require('../middleware/DeleteToken');
const RandomString = require('../middleware/RandomString');

const dotenv = require('dotenv');

dotenv.config({
  path: './config/.env',
});

/**
 * 로그인 시간을 최신화 하는 함수
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
 * 로그아웃을 수행하는 메서드 세션을 폐기하고  
 * 로그아웃한 사용자의 cookie를 제거한다.
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
  const saltRounds = parseInt(process.env.USER_SALT);
  const hashedPass = bcrypt.hashSync(request.body.password, saltRounds);
  // let hashed = await Crypt.encrypt(request.body.password);
  // let salt = hashed.salt;
  // let hashedPass = hashed.hashedpw;

  const currentTimeStamp = CurrentDate.CurrentTimeStamp();
  Users.findOne({
    attributes: ['account'],
    where: { account: request.body.account },
  })
  .then(res => {
    if(res === null) {
      Users.create({
        account: request.body.account,
        password: hashedPass,
        salt: "",
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
      })
      .then(res => {
        response.status(200).send({
          responseCode: 200,
          data: true,
          message: "회원가입 완료"
        });
      })
      .catch(err => {
        response.status(403).send({
          responseCode: 403,
          data: false,
          message: "회원가입 실패"
        })
      })
    }
    else {
      response.status(403).send({
        responseCode: 403,
        data: false,
        message: "이미 사용중인 아이디입니다."
      })
    }
  })
  .catch(err => {
    response.status(403).send({
      responseCode: 403,
      data: false,
      message: "회원가입 실패"
    })
  })
};

/**
 * 아이디 중복을 검사하는 메서드 중복일경우 false 중복이 아닌경우 true 반환
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
  await CheckToken.CheckToken(1, request.headers.token)
  .then((res) => {
    if((res.result == true) && (res.account == request.body.account)) {
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
    }
    else {
      response.status(500).send({
        responseCode: 500,
        message: 'API키가 일치하지 않거나 요청자가 정확하지 않습니다.',
        data: false,
      });
    }
  })
  .catch((err) => {
    response.status(403).send({
      responseCode: 403,
      message: 'Invalid Key',
      data: false,
    });
  })
};
/**
 * 회원정보를 변경하는 메서드
 * @param {*} request
 * @param {*} response
 */
exports.updateUsers = async (request, response) => {
  // console.log('request.body ', request.body);
  const checkTokenResult = await CheckToken.CheckToken(1, request.headers.token);
  const currentTimeStamp = CurrentDate.CurrentTimeStamp();
  let newHashed, newHashedPass;
  const salt = parseInt(process.env.USER_SALT);

  if (checkTokenResult.result == true) {
    if (
      (request.body.changePassword === undefined || request.body.changePassword == '')
      &&
      (request.body.password != undefined || request.body.password != '')
    ) {
      Users.findOne({
        attributes: ["password"],
        where: { account: request.body.account },
      })
        .then(async (res) => {
          // console.log(res);
          // console.log(request.body);
          const comparePassResult = bcrypt.compareSync(request.body.password, res.dataValues.password);
          if(comparePassResult === true) {
            Users.update(
              {
                name: request.body.name,
                nickName: request.body.nickName,
                address1: request.body.address1,
                address2: request.body.address2,
                address3: request.body.address3,
                address4: request.body.address4,
                modifiedDate: currentTimeStamp,
              },
              {
                where: {
                  account: request.body.account
                },
              }
            )
            .then((res) => {
              // console.log('res ', res);
              if(res[0] == 1) {
                response.status(200).send({
                  responseCode: 200,
                  message: 'Modified Complete(not change pass)',
                  data: true,
                });
              }
              else {
                response.status(403).send({
                  responseCode: 403,
                  message: 'Modified Failed(not change pass)',
                  data: false,
                });
              }              
            })
            .catch((err) => {
              response.status(500).send({
                responseCode: 500,
                message: 'Modified Fail',
                data: false,
                error: err,
              });
            });
          }
          else {
            response.status(403).send({
              responseCode: 403,
              message: 'Modified Fail(not change pass) Password Invalid',
              data: false,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else if (
      request.body.changePassword !== null &&
      request.body.password != null
    ) {
      newHashedPass = bcrypt.hashSync(request.body.changePassword, salt);
      Users.update(
        {
          password: newHashedPass,
          name: request.body.name,
          nickName: request.body.nickName,
          address1: request.body.address1,
          address2: request.body.address2,
          address3: request.body.address3,
          address4: request.body.address4,
          modifiedDate: currentTimeStamp,
        },
        {
          where: {
            account: request.body.account,
          },
        }
      )
      .then((res) => {
        if(res[0] === 1) {
          response.status(200).send({
            responseCode: 200,
            message: 'Modified Complete(apply new pass)',
            data: true,
          });
        }
        else {
          response.status(403).send({
            responseCode: 403,
            message: 'Modified Failed(apply new pass)',
            data: false,
          });
        }        
      })
      .catch((err) => {
        response.status(500).send({
          responseCode: 500,
          message: "Modified Fail(Database update issue)",
          data: false,
          error: err
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

/**
 * account에 해당하는 사용자의 프로필이미지를 반환하는 함수
 * @param {String} account 사용자 계정 
 * @param {*} response 
 */
exports.selectUsersProfileImage = async (request, response) => {
  // console.log(request.query);
  // console.log(request);
  await Users.findOne({
    attributes: ['profileImageFileName'],
    where: { account: request.query.account },
  })
    .then((res) => {
      response.status(200).send({
        responseCode: 200,
        message: 'profileImage Loading complete',
        data: `http://${request.hostname}:${request.socket.localPort}${request._parsedOriginalUrl.pathname}/${res.dataValues.profileImageFileName}`,
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
  console.log(request.body);
  const checkTokenResult = await CheckToken.CheckToken(1, request.headers.token
  );
  const uploaderAccount = request.body.account;
  const previousProfileFileName = await Users.findOne({
    attributes: ['profileImageFileName'],
    where: { account: uploaderAccount },
  });
  // console.log(previousProfileFileName.dataValues.profileImageFileName);

  if (checkTokenResult) {
    if(
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
      ).then((res) => {
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
      // console.log("existsSync:", await fs.existsSync(`./data/profile/${previousProfileFileName.dataValues.profileImageFileName}`)); // return true or false
      const fileExistCheck = await fs.existsSync(`./data/profile/${previousProfileFileName.dataValues.profileImageFileName}`);
      if(fileExistCheck == true) { await fs.rmSync(`./data/profile/${previousProfileFileName.dataValues.profileImageFileName}`); }
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
        if(res[0] == 1) {
          response.status(200).send({
            responseCode: 200,
            message: 'profile update success',
            data: true,
          });
        } else {
          response.status(403).send({
            responseCode: 403,
            message: 'profile update fail',
            data: false,
          });
        }
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

/**
 * 사용자의 계정 비밀번호를 임의로 변경하여 사용자의 메일로 보내기 위한 함수
 * @param {*} request 
 * @param {*} response 
 */
exports.requestDefaultPassword = async(request, response) => {
  const tempPassword = RandomString.RandomString(6);
  console.log("temp Password:", tempPassword);

  const transporter = nodeMailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.NODE_MAILER_ACCOUNT,
      pass: process.env.NODE_MAILER_PASS,
    }
  });

  await Users.findOne({
    attributes: ["account"],
    where: { email: request.body.receiveMailAddress },
  })
  .then((res) => {
    if(res !== null) {
      const saltRounds = parseInt(process.env.USER_SALT);
      const newHashed = bcrypt.hashSync(tempPassword, saltRounds);
      console.log("temp Hashed:", newHashed);
      Users.update(
        { 
          password: newHashed
        },
        {
          where: { account: res.dataValues.account}
        }
      )
      .then((res2) => {
        if(res2[0] === 1) {
          // console.log(res.dataValues.account);
          const transport = {
            to: request.body.receiveMailAddress,
            // to: "gruzam0615@gmail.com",
            subject: "펫포탈 임시 비밀번호 입니다.",
            html: 
            `
            <h3>안녕하세요 펫포탈입니다.</h3>
            <h3>${res.dataValues.account} 님의 임시 비밀번호 입니다.</h3>
            <p>임시 비밀번호: <b>${tempPassword}</b></p>
            <p>임시 비밀번호를 이용한 로그인 후 비밀번호 변경을 권장합니다.</p>
            `
          }
          transporter.sendMail(transport, (error, info) => {
            if(error) {
              response.status(403).send({
                responseCode: 403,
                data: false,
                message: "임시 비밀번호 메일 전송 실패"
              })
            }
            else {
              response.status(200).send({
                responseCode: 200,
                data: true,
                message: "임시 비밀번호 메일 전송 완료"
              })
            }
          })
        }
      })
      .catch((err) => {
        response.status(403).send({
          responseCode: 403,
          data: false,
          message: "임시 비밀번호 업데이트 오류(임시 비밀번호 메일 전송이 불가능합니다.)",
          error: err
        })
      })      
    }
    else {
      response.status(403).send({
        responseCode: 403,
        data: false,
        message: "존재하지 않는 회원입니다."
      })
    }
  })
  .catch((err) => {
    response.status(403).send({
      responseCode: 403,
      data: false,
      message: "회원정보(이메일 기반) 조회에 실패했습니다.",
      error: err
    })
  })

};

/**
 * 비밀번호 초기화 메서드  
 * 초기화된 비밀번호는 1234
 * @desc 비밀번호 초기화 메서드(개발용)
 * @param {*} request 
 * @param {*} response 
 */
exports.defaultPassword = async(request, response) => {
  const usersAccount = request.body.account;
  console.log(`Reset ${usersAccount}'s password`);
  // const newHashed = await Crypt.encrypt("1234");
  const saltRounds = parseInt(process.env.USER_SALT);
  const newHashed = bcrypt.hashSync("1234", saltRounds);
  await Users.update(
    { 
      password: newHashed
    },
    {
      where: { account: usersAccount}
    }
  ).then((res) => {
    response.status(200).send({
      responseCode: 200,
      data: true,
      message: "success"
    })
  }).catch((err) => {
    response.status(403).send({
      responseCode: 403,
      data: false,
      message: "failure"
    })
  })
}

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
