// const redis = require('redis');
const fs = require('fs');

const MateBoard = require('../models/MateBoard');
const CheckToken = require('../middleware/CheckToken');
const CurrentDate = require('../middleware/CurrentDate');

const Animals = require('../models/Animals');
const Users = require('../models/Users');

/**
 * 모든 글 목록을 조회하는 함수  
 * 게시글 등록 날짜 기준 최신순으로 9개씩 출력합니다.
 * @param {*} request 
 * @param {*} response
 */
exports.findAllMateBoardDesc = async(request, response) => {

  let pageNumber = parseInt(request.params.pageNumber);
  let offset = 0;

  if(pageNumber > 1) {
    offset = 10 * (pageNumber - 1);
  }

  await MateBoard.findAndCountAll({
    include: [
      {
        model: Users,
        as: "Users",
        attributes: [ "account" ]
      }
    ],
    where: {
      mateBoardStatus: 1,
    },
    offset: offset,
    limit: 9,
    order: [['mateBoardRegistDate', 'DESC']],
  }).then((res) => {
    // console.log("res:", res);
    if (res.count == 0) {
      response.status(304).send({
        responseCode: 304,
        data: null,
        message: "조회 결과가 존재하지 않습니다.",
      });
    } else {
      response.status(200).send({
        responseCode: 200,
        data: res
      });
    }
  });
};

/**
 * 모든 글 목록을 조회하는 함수  
 * 게시글 등록 날짜 기준 최신순으로 9개씩 출력합니다.
 * @param {*} request 
 * @param {*} response
 */
exports.findAllMateBoardAsc = async (request, response) => {

  let pageNumber = request.params.pageNumber;
  let offset = 0;

  if(pageNumber > 1) {
    offset = 10 * (pageNumber - 1);
  }

  await MateBoard.findAndCountAll({
    include: [
      {
        model: Users,
        as: "Users",
        attributes: [ "account" ]
      }
    ],
    where: {
      mateBoardStatus: 1,
    },
    offset: offset,
    limit: 9,
    order: [['mateBoardRegistDate', 'ASC']],
  }).then((res) => {
    if (res == null) {
      response.status(304).send({
        responseCode: 304,
        data: null,
        message: "조회 결과가 존재하지 않습니다.",
      });
    } else {
      response.status(200).send({
        responseCode: 200,
        data: response,
      });
    }
  });
};

/**
 * 사용자 색인번호를 매개변수로 글 목록을 조회하는 함수
 * @param {*} request 
 * @param {*} result 
 */
exports.findByUsersIndexNumber = async (request, result) => {
  let inputToken = request.headers.token;
  const checkTokenResult = await CheckToken.CheckToken(1, inputToken);

  if(checkTokenResult.result === true) {
    await MateBoard.findAll({
      // attributes: ["animalsUsersIndexNumber"],
      include: [
        {
          model: Users,
          as: "Users",
          attributes: [ "account" ]
        }
      ],
      where: {
        mateBoardStatus: 1,
        usersIndexNumber: request.params.usersIndexNumber,
      },
    }).then((response) => {
      if(response == null) {
        result.send({
          responseCode: 304,
          message: 'no result',
        });
      } else {
        result.send({
          responseCode: 200,
          data: response,
        });
      }
    });
  } else {
    result.send({
      responseCode: 400,
      message: 'Incorrect Key',
    });
  }
};

/**
 * 게시글 내부 에디터의 첨부파일을 위한 함수
 * @param {*} req 
 * @param {*} res 
 */
exports.textEditorImgFileUpload = (req, res) => {
  try {
    if (!fs.existsSync('./data')) {
      fs.mkdirSync('./data');
    }

    if (!fs.existsSync('./data/mateTextEditorImg')) {
      fs.mkdirSync('./data/mateTextEditorImg');
    }

    SingleFileHandler('mateTextEditorImg').single('imgFile')(
      req,
      res,
      (err) => {
        if (err) {
          console.log(err);
          res.status(400).send({ error: '파일 업로드 실패' });
        } else {
          const imgUrl = `http://localhost:3010/static/${req.file.filename}`;
          res.send({ imgUrl, fileName: req.file.filename });
        }
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: '텍스트 에디터 서버 오류' });
  }
};

/**
 * 게시글 상세 조회를 위한 메서드 (게시글의 색인번호를 매개변수로 활용)
 * @param {*} request 
 * @param {*} result 
 */
exports.findByIndexNumber = async (request, result) => {
  let inputToken = request.headers.token;
  const checkTokenResult = await CheckToken.CheckToken(1, inputToken);

  if(checkTokenResult.result === true) {
    await MateBoard.findOne({
      // attributes: ["animalsUsersIndexNumber"],
      include: [
        {
          model: Animals,
          as: "Animals",
          attributes: [
            "animalsName", "animalsGender", "animalsNeutered",
            "animalsAge", "animalsWeight",
            "animalsCategory1", "animalsCategory2"
          ]
        },
        {
          model: Users,
          as: "Users",
          attributes: [ "account" ]
        }
      ],
      where: {
        mateBoardIndexNumber: request.params.mateBoardIndexNumber,
      }
    }).then((response) => {
      if(response == null) {
        result.status(404).send({
          responseCode: 404,
          data: null,
          message: 'no result',
        });
      } else {
        result.status(200).send({
          responseCode: 200,
          data: response,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      result.status(500).send({
        responseCode: 500,
        data: false,
        message: err
      });
    })
  } else {
    result.send({
      responseCode: 400,
      message: 'Incorrect Key',
    });
  }
};

/**
 * 게시글 수정을 위한 메서드
 * @param {*} request 
 * @param {*} result 
 */
exports.updateMateBoard = async (request, result) => {
  let inputToken = request.headers.token;
  let checkTokenResult = await CheckToken.CheckToken(1, inputToken);
  let currentTimeStamp = CurrentDate.CurrentTimeStamp();

  if(checkTokenResult.result == true) {
    
    let matePhotosList = new Array(request.files.length);
    
    for (let i = 0; i < request.files.length; i++) {
      matePhotosList[i] = request.files[i].filename;
    }

    let createMateBoard;

    if(request.body.animalsIndexNumber === null || request.body.animalsIndexNumber === undefined) {      
      createMateBoard = await MateBoard.update(
        {
          mateBoardTitle: request.body.title,
          mateBoardFee: parseInt(request.body.amount),
          mateBoardContent1: request.body.detailContent,
          mateBoardContent2: request.body.cautionContent,
          mateBoardPhotos: matePhotosList.toString(),
          mateBoardCategory: parseInt(request.body.mateBoardCategory),
          mateBoardModifyDate: currentTimeStamp,
          usersIndexNumber: parseInt(request.body.usersIndexNumber)
        },
        {
          where: {
            mateBoardIndexNumber: parseInt(request.body.mateBoardIndexNumber)
          }
        }
      )
      .then(res => {
        if(res == null) {
          result.status(403).send({
            responseCode: 403,
            data: false,
            message: "게시글 수정 실패",
          });
        }
        else {
          result.status(200).send({
            responseCode: 200,
            data: true,
            message: "게시글 수정 완료"
          });
        }
      })
      .catch(err => {
        result.status(403).send({
          responseCode: 403,
          data: false,
          message: "게시글 수정 실패 데이터베이스 오류",
          error: err
        });
      })  
    } else {
      createMateBoard = await MateBoard.update(
        {
          mateBoardTitle: request.body.title,
          mateBoardFee: parseInt(request.body.amount),
          mateBoardContent1: request.body.detailContent,
          mateBoardContent2: request.body.cautionContent,
          mateBoardPhotos: matePhotosList.toString(),
          mateBoardCategory: parseInt(request.body.mateBoardCategory),
          mateBoardModifyDate: currentTimeStamp,
          usersIndexNumber: parseInt(request.body.usersIndexNumber),
          animalsIndexNumber: parseInt(request.body.animalsIndexNumber),
        },
        {
          where: {
            mateBoardIndexNumber: parseInt(request.body.mateBoardIndexNumber)
          }
        }
      )
      .then(res => {
        if(res == null) {
          result.status(403).send({
            responseCode: 403,
            data: false,
            message: "게시글 수정 실패",
          });
        }
        else {
          result.status(200).send({
            responseCode: 200,
            data: true,
            message: "게시글 수정 완료"
          });
        }
      })
      .catch(err => {
        result.status(403).send({
          responseCode: 403,
          data: false,
          message: "게시글 수정 실패 데이터베이스 오류",
          error: err
        });
      })
    }
  } else {
    result.send({
      responseCode: 400,
      message: 'Incorrect Key',
    });
  }
};

/**
 * 게시글 삭제를 위한 메서드
 * @param {*} request 
 * @param {*} result 
 */
exports.deleteMateBoard = async (request, result) => {
  let inputToken = request.headers.token;
  let checkTokenResult = await CheckToken.CheckToken(1, inputToken);
  let currentTimeStamp = CurrentDate.CurrentTimeStamp();

  if(checkTokenResult.result == true) {
    console.log(request.body);
    await MateBoard.update(
        {
          mateBoardModifyDate: currentTimeStamp,
          mateBoardStatus: parseInt(3)
        },
        {
          where: {
            mateBoardIndexNumber: parseInt(request.body.mateBoardIndexNumber)
          }
        }
      )
      .then(res => {
        console.log(res);
        if(res[0] !== 1) {
          result.status(403).send({
            responseCode: 403,
            data: false,
            message: "게시글 삭제 실패",
          });
        }
        else {
          result.status(200).send({
            responseCode: 200,
            data: true,
            message: "게시글 삭제 완료"
          });
        }
      })
      .catch(err => {
        result.status(403).send({
          responseCode: 403,
          data: false,
          message: "게시글 삭제 실패 데이터베이스 오류",
          error: err
        });
      })  
  }
  else {
    result.send({
      responseCode: 400,
      message: 'Incorrect Key',
    });
  }
};