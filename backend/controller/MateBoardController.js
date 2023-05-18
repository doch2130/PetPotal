// const redis = require('redis');
const fs = require('fs');

const MateBoard = require('../models/MateBoard');
const CheckToken = require('../middleware/CheckToken');
const CurrentDate = require('../middleware/CurrentDate');

const {
  SingleFileHandler,
  MultiFileHandler,
} = require('../middleware/filehandler/MulterFileHandler');

/**
 * 게시글 작성 메서드
 * @description Mate 서비스 게시판의 글 작성 메서드
 * @param {*} request result를 제외한 아래 항목을 request.body로 받는다.
 * @param {String} mateBoardTitle 게시글 제목
 * @param {int} mateBoardFee 비용
 * @param {String} mateBoardContent1 본문
 * @param {String} mateBoardContent2 주의사항
 * @param {String} mateBoardPhotos 첨부 사진의 저장된 파일 이름
 * @param {int} mateBoardCategory 구인/구직 여부 구인=1, 구직=2
 * @param {String} mateBoardRegistDate 게시글 최초 작성일
 * (형태: yyyy-M-ddTHH:mm:s.ms)
 * @param {String} mateBoardModifyDate 게시글 최종 수정일
 * (형태: yyyy-M-ddTHH:mm:s.ms)
 * @param {BigInt} usersIndexNumber 작성자의 인덱스 번호
 * @param {BigInt} animalsIndexNumber 게시글과 연관된 반려동물의 인덱스 번호 
 * @param {*} result 메서드 결과를 전달하는 콜백함수
 */
exports.insertMateBoard = async (request, result) => {
  let inputToken = request.headers.token;
  let checkTokenResult = await CheckToken.CheckToken(1, inputToken);
  let currentTimeStamp = CurrentDate.CurrentTimeStamp();

  if(checkTokenResult.result == true) {
    let matePhotosList = new Array(request.files.length);
    for (let i = 0; i < request.files.length; i++) {
      matePhotosList[i] = request.files[i].filename;
    }
   
    await MateBoard.create({
      mateBoardTitle: request.body.mateBoardTitle,
      mateBoardFee: parseInt(request.body.mateBoardFee),
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
            responseCode: 403,
            data: false,
            message: 'no result',
          });
        } else {
          result.send({
            responseCode: 200,
            data: true,
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

  if(checkTokenResult.result === true) {
    let pageNumber = request.params.pageNumber;
    let offset = 0;

    if(pageNumber > 1) {
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

  if(checkTokenResult.result === true) {
    await MateBoard.findAll({
      // attributes: ["animalsUsersIndexNumber"],
      where: {
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
