const redis = require('redis');
const fs = require('fs');

const MateBoard = require('../models/MateBoard');
const CheckToken = require('../middleware/CheckToken');
const CurrentDate = require('../middleware/CurrentDate');

const {
  SingleFileHandler,
  MultiFileHandler,
} = require('../middleware/MulterFileHandler');

/**
 * Mate 게시글 작성 메서드
 * @param {*} request
 * @param {*} result
 */
exports.insertMateBoard = async (request, result) => {
  let inputToken = request.headers.token;
  let checkTokenResult = await CheckToken.CheckToken(1, inputToken);
  let currentTimeStamp = CurrentDate.CurrentTimeStamp();

  if (checkTokenResult == true) {
    let matePhotosList = new Array(request.files.length);
    for (let i = 0; i < request.files.length; i++) {
      matePhotosList[i] = request.files[i].filename;
    }

    const boardData = JSON.parse(request.body.data);
    console.log('boardData : ', boardData);
    // 카테고리 필드 => writeType '구함' / '지원'
    // 금액 필드 => 추가 필요
    // userIndexNumber, animalsIndexNumber 가져오는 방법 확인 필요

    // userIndexNumber
    // 토큰으로 검사해서 user정보를 가져오는지??

    // animalsIndexNumber
    // 지원 일 때 동물 정보 없음
    // 구함 일 때 (내 정보에서 가져오는 것이 아닌 신규 동물 정보인 경우에 대한 처리 방안)

    // 사진 저장은 잘되지만, DB데이터 저장 시 데이터 정리가 안되서 안되는 중

    await MateBoard.create({
      mateBoardTitle: request.body.title,
      mateBoardContent1: request.body.mateBoardContent1,
      mateBoardContent2: request.body.mateBoardContent2,
      mateBoardPhotos: matePhotosList.toString(),
      mateBoardCategory: parseInt(request.body.mateBoardCategory),
      mateBoardRegistDate: currentTimeStamp,
      mateBoardModifyDate: currentTimeStamp,
      usersIndexNumber: parseInt(request.body.usersIndexNumber),
      animalsIndexNumber: parseInt(request.body.animalsIndexNumber),
    })
      .then((response) => {
        if (response == null) {
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
      })
      .catch((error) => {
        if (error != null) {
          result.send({
            responseCode: 400,
            message: 'Something wrong...',
            error: error,
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

exports.findAllMateBoard = async (request, result) => {
  let inputToken = request.headers.token;
  const checkTokenResult = await CheckToken.CheckToken(1, inputToken);

  if (checkTokenResult === true) {
    let pageNumber = request.params.pageNumber;
    let offset = 0;

    if (pageNumber > 1) {
      offset = 10 * (pageNumber - 1);
    }

    await MateBoard.findAll({
      // await MateBoard.findAndCountAll({ // .findAndCountAll() 사용시 결과값으로 rows 개수를 결과에 포함하여 출력한다.
      // attributes: ["animalsUsersIndexNumber"],
      // where: {
      //     usersIndexNumber: request.params.usersIndexNumber
      // }
      offset: offset,
      limit: 10,
      order: [['mateBoardRegistDate', 'DESC']],
    }).then((response) => {
      if (response == null) {
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

exports.findByUsersIndexNumber = async (request, result) => {
  let inputToken = request.headers.token;
  const checkTokenResult = await CheckToken.CheckToken(1, inputToken);

  if (checkTokenResult === true) {
    await MateBoard.findAll({
      // attributes: ["animalsUsersIndexNumber"],
      where: {
        usersIndexNumber: request.params.usersIndexNumber,
      },
    }).then((response) => {
      if (response == null) {
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

exports.test = (req, res) => {
  try {
    if (!fs.existsSync('./data')) {
      fs.mkdirSync('./data');
    }
    if (!fs.existsSync('./data/mateBoardImg')) {
      fs.mkdirSync('./data/mateBoardImg');
    }

    MultiFileHandler('mateBoardImg').array('viewImgFile')(req, res, (err) => {
      if (err) {
        console.log('err : ', err);
        res.status(400).send({ error: '파일 업로드 실패' });
      } else {
        // console.log(req.files);
        res.send(true);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: '메이트 파일 업로드 오류' });
  }
};
