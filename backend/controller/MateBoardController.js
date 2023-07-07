const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

const { SingleFileHandler, MultiFileHandler } = require('../middleware/filehandler/MulterFileHandler');

const MateBoard = require('../models/MateBoard');
const Animals = require('../models/Animals');
const Users = require('../models/Users');
const InterestPost = require('../models/InterestPost');

const CheckToken = require('../middleware/CheckToken');
const CurrentDate = require('../middleware/CurrentDate');

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
 * @param {Datetime} mateBoardRegistDate 게시글 최초 작성일
 * @param {Datetime} mateBoardModifyDate 게시글 최종 수정일
 * @param {BigInt} usersIndexNumber 작성자의 인덱스 번호
 * @param {BigInt} animalsIndexNumber 게시글과 연관된 반려동물의 인덱스 번호 
 * @param {*} result 메서드 결과를 전달하는 콜백함수
 */
exports.insertMateBoard = async (request, result) => {
  let inputToken = request.headers.token;
  let checkTokenResult = await CheckToken.CheckToken(1, inputToken);
  let currentTimeStamp = CurrentDate.CurrentTimeStamp();
  let currentTimeStampDate = new Date(currentTimeStamp);
  currentTimeStampDate.setHours(currentTimeStampDate.getHours() + 9);

  if(checkTokenResult.result == true) {
    request.body = JSON.parse(request.body.data);
    
    const usersIndexNumber = await Users.findOne({
      attributes: [ "usersIndexNumber" ],
      where: {
          account: checkTokenResult.account
      }
    });
    
    let matePhotosList = new Array(request.files.length);
    
    for (let i = 0; i < request.files.length; i++) {
      matePhotosList[i] = request.files[i].filename;
    }

    let createMateBoard;

    if(request.body.animalsIndexNumber === null || request.body.animalsIndexNumber === undefined) {
      createMateBoard = await MateBoard.create({
        mateBoardTitle: request.body.title,
        mateBoardFee: parseInt(request.body.amount),
        mateBoardContent1: request.body.detailContent,
        mateBoardContent2: request.body.cautionContent,
        mateBoardAddress1: request.body.mateBoardAddress1,
        mateBoardAddress2: request.body.mateBoardAddress2,
        mateBoardAddress3: request.body.mateBoardAddress3,
        mateBoardAddress4: request.body.mateBoardAddress4,
        mateBoardLat: request.body.mateBoardLat,
        mateBoardLng: request.body.mateBoardLng,
        mateBoardPhotos: matePhotosList.toString(),
        mateBoardCategory: parseInt(request.body.mateBoardCategory),
        mateBoardRegistDate: currentTimeStampDate,
        mateBoardModifyDate: currentTimeStampDate,
        usersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber)
      })
      .then(res => {
        if(res == null) {
          console.log("게시글(구직) 등록 실패");
          result.status(403).send({
            responseCode: 403,
            data: false,
            message: "게시글(구직) 등록 실패",
          });
        }
        else {
          console.log("게시글(구인) 등록 완료");
          result.status(200).send({
            responseCode: 200,
            data: true,
            message: "게시글(구직) 등록 완료"
          });
        }
      })
      .catch(err => {
        console.log("게시글(구직) 등록 실패");
        console.error(err);
        result.status(403).send({
          responseCode: 403,
          data: false,
          message: "게시글(구직) 등록 실패 데이터베이스 오류",
          error: err
        });
      })  
    } else {
      createMateBoard = await MateBoard.create({
        mateBoardTitle: request.body.title,
        mateBoardFee: parseInt(request.body.amount),
        mateBoardContent1: request.body.detailContent,
        mateBoardContent2: request.body.cautionContent,
        mateBoardLat: request.body.mateBoardLat,
        mateBoardLng: request.body.mateBoardLng,
        mateBoardAddress1: request.body.mateBoardAddress1,
        mateBoardAddress2: request.body.mateBoardAddress2,
        mateBoardAddress3: request.body.mateBoardAddress3,
        mateBoardAddress4: request.body.mateBoardAddress4,
        mateBoardPhotos: matePhotosList.toString(),
        mateBoardCategory: parseInt(request.body.mateBoardCategory),
        mateBoardRegistDate: currentTimeStampDate,
        mateBoardModifyDate: currentTimeStampDate,
        usersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber),
        animalsIndexNumber: parseInt(request.body.animalsIndexNumber),
      })
      .then(res => {
        if(res == null) {
          console.log("게시글(구인) 등록 실패");
          result.status(403).send({
            responseCode: 403,
            data: false,
            message: "게시글(구인) 등록 실패",
          });
        }
        else {
          console.log("게시글(구인) 등록 완료");
          result.status(200).send({
            responseCode: 200,
            data: true,
            message: "게시글 등록 완료"
          });
        }
      })
      .catch(err => {
        console.info("게시글(구인) 등록 실패 데이터베이스 오류");
        console.error(err);
        result.status(403).send({
          responseCode: 403,
          data: false,
          message: "게시글 등록 실패 데이터베이스 오류",
        });
      })
    }
  } else {
    console.log("인증키가 유효하지 않습니다.");
    result.status(500).send({
      responseCode: 500,
      message: 'Incorrect Key',
    });
  }
};

/**
 * 모든 글 목록을 조회하는 함수  
 * 게시글 등록 날짜 기준 최신순으로 10개씩 출력합니다.
 * @param {*} request 
 * @param {*} result 
 */
// exports.findAllMateBoardDesc = async (request, result) => {
exports.findAllMateBoard = async (request, result) => {
  let inputToken = request.headers.token;
  const checkTokenResult = await CheckToken.CheckToken(1, inputToken);

  if(checkTokenResult.result === true) {
    const { pageNumber, sort } = request.params;
    const { searchRegion, searchKind, searchType, searchAmount } = request.query;
    const searchKindReplace = searchKind.replace('강아지', 1).replace('고양이', 2).replace('기타', 3).split(',');

    const limit = 9;
    let offset = 0;

    if(pageNumber > 1) {
      offset = limit * (pageNumber - 1);
    }

    let tempSearchRegion = searchRegion.split(',');

    let whereMateBoardAddress = [];
    let tempWhereMateBoardAddress = {};
    if(searchRegion !== '') {
      tempSearchRegion.forEach((el) => {
        const tempSi = el.split(' ')[0];
        const tempGu = el.split(' ')[1];
        // [Op.and]: [{a: 5}, {b: 6}] // (a = 5) AND (b = 6)
        if(tempGu === '전체') {
          tempWhereMateBoardAddress = { mateBoardAddress1: tempSi };
        } else {
          tempWhereMateBoardAddress = { [Op.and]: [{mateBoardAddress1: tempSi}, {mateBoardAddress2: tempGu}] };
        }
        whereMateBoardAddress.push(tempWhereMateBoardAddress);
      })
    }
    // console.log('whereMateBoardAddress ', whereMateBoardAddress);

    // 지역만 필터 하는 결과는 일단 됬음
    // const testResult = await MateBoard.findAndCountAll({
    //   include: [
    //     {
    //       model: Users,
    //       as: "Users",
    //       attributes: [ "account" ]
    //     },
    //   ],
    //   // where: tempMateBoardAddress1,
    //   where: {[Op.or]: whereMateBoardAddress},
    //   offset: offset,
    //   limit: limit,
    //   order: [['mateBoardRegistDate', `${sort}`]],
    // });

    // 구함, 지원 조건문
    let whereMateBoard = { mateBoardStatus: 1 };
    whereMateBoard.mateBoardFee = { [Op.gte]: Number(searchAmount) };

    if (searchType === '1') {
      whereMateBoard.mateboardCategory = 1;
    } else if (searchType === '2') {
      whereMateBoard.mateboardCategory = 2;
    } else {
      whereMateBoard.mateboardCategory = {
        [Op.in]: [1, 2]
      };
    }

    // 조건문 마지막 정리
    let lastWhereMateBoard = {};
    if(whereMateBoardAddress.length === 0) {
      lastWhereMateBoard = whereMateBoard;
    } else {
      lastWhereMateBoard = {
        [Op.and]: [
          {[Op.or]: whereMateBoardAddress},
          whereMateBoard
        ]
      };
    }

    const usersIndexNumber = await Users.findOne({
      attributes: [ "usersIndexNumber" ],
      where: {
          account: checkTokenResult.account
      }
    });

    // 동물 종류 카테고리 (분기)
    if (searchKindReplace[0] === '' || searchKindReplace[0] === '전체') {
      // 동물 종류 선택 안하는 경우 (전체 검색)
      await MateBoard.findAndCountAll({
        include: [
          {
            model: Users,
            as: "Users",
            attributes: [ "account" ]
          },
          {
            model: InterestPost,
            as: 'InterestPost',
            required: false,
            attributes: ['interestPostStatus'],
            where: {
              usersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber),
            },
          }
        ],
        where: lastWhereMateBoard,
        offset: offset,
        limit: limit,
        order: [['mateBoardRegistDate', `${sort}`]],
      }).then((response) => {
        if (response.count == 0) {
          console.log("게시글 검색 결과가 존재하지 않습니다.")
          result.status(304).send({
            responseCode: 304,
            data: { count: 0, rows: [] },
            message: 'no result',
          });
        } else {
          console.log("게시글 검색 결과를 반환합니다.")
          result.status(200).send({
            responseCode: 200,
            data: response,
          });
        }
      });
    } else {
      // 동물 종류 선택 하는 경우 - include Animals 추가
      let whereAnimals = { animalsInfoActivate: 1 };

      whereAnimals = { animalsCategory1: [] };
      searchKindReplace.forEach((el) => {
        whereAnimals.animalsCategory1.push(Number(el));
      });

      await MateBoard.findAndCountAll({
        include: [
          {
            model: Users,
            as: "Users",
            attributes: [ "account" ]
          },
          {
            model: Animals,
            as: "Animals",
            where: whereAnimals,
          },
          {
            model: InterestPost,
            as: 'InterestPost',
            required: false,
            attributes: ['interestPostStatus'],
            where: {
              usersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber),
            },
          }
        ],
        where: lastWhereMateBoard,
        offset: offset,
        limit: limit,
        order: [['mateBoardRegistDate', `${sort}`]],
      }).then((response) => {
        if (response.count == 0) {
          console.log("게시글 검색 결과가 존재하지 않습니다.")
          result.status(304).send({
            responseCode: 304,
            data: { count: 0, rows: [] },
            message: 'no result',
          });
        } else {
          console.log("게시글 검색 결과를 반환합니다.")
          result.status(200).send({
            responseCode: 200,
            data: response,
          });
        }
      });
    }
  } else {
    console.log("인증키가 유효하지 않습니다.");
    result.status(500).send({
      responseCode: 500,
      message: 'Incorrect Key',
    });
  }
};

/**
 * 사용자 계정을 매개변수로 글 목록을 조회하는 함수
 * @param {*} request 
 * @param {*} result 
 */
exports.findByUsersAccount = async (request, result) => {
  const inputToken = request.headers.token;
  const checkTokenResult = await CheckToken.CheckToken(1, inputToken);

  if(checkTokenResult.result === true) {
    await MateBoard.findAndCountAll({
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
        "$Users.account$": request.params.usersAccount,
      },
      order: [['mateBoardRegistDate', 'DESC']],
    }).then((response) => {
      if(response == null) {
        console.log("사용자 계정과 일치하는 게시글 검색 결과가 존재하지 않습니다.");
        result.status(403).send({         
          responseCode: 403,
          data: { count: 0, rows: [] },
          message: 'no result',
        });
      } else {
        console.log("사용자 계정과 일치하는 게시글 검색 결과를 전송합니다.");
        result.status(200).send({
          responseCode: 200,
          data: response,
        });
      }
    })
    .catch((err) => {
      console.log("사용자 계정과 일치하는 게시글 조회 실패");
      console.error(err);
      result.status(500).send({
        responseCode: 500,
        data: { count: 0, rows: [] },
        message: "사용자 계정과 일치하는 게시글 조회 실패"
      })
    })
  } else {
    result.send({
      responseCode: 400,
      message: 'Incorrect Key',
    });
  }
};


/**
 * 사용자 계정을 매개변수로 글 목록(구직)을 조회하는 함수
 * @param {*} request 
 * @param {*} result 
 */
exports.findByUsersAccount2 = async (request, result) => {
  const inputToken = request.headers.token;
  const checkTokenResult = await CheckToken.CheckToken(1, inputToken);

  let pageNumber = request.params.pageNumber;
  const limit = 9;
  let offset = 0;

  if(pageNumber > 1) {
    offset = limit * (pageNumber - 1);
  }

  if(checkTokenResult.result === true) {
    await MateBoard.findAndCountAll({
      // attributes: ["animalsUsersIndexNumber"],
      include: [
        {
          model: Users,
          as: "Users",
          attributes: [ "account" ]
        }
      ],
      where: {
        mateBoardCategory: 2,
        mateBoardStatus: 1,
        "$Users.account$": request.params.usersAccount,
      },
      // offset: offset,
      // limit: limit,
      order: [['mateBoardRegistDate', 'DESC']],
    }).then((response) => {
      if(response == null) {
        console.log("사용자 계정과 일치하는 게시글 검색 결과가 존재하지 않습니다.");
        result.status(403).send({         
          responseCode: 403,
          data: { count: 0, rows: [] },
          message: 'no result',
        });
      } else {
        console.log("사용자 계정과 일치하는 게시글 검색 결과를 전송합니다.");
        result.status(200).send({
          responseCode: 200,
          data: response,
        });
      }
    })
    .catch((err) => {
      console.log("사용자 계정과 일치하는 게시글 조회 실패");
      console.error(err);
      result.status(500).send({
        responseCode: 500,
        data: { count: 0, rows: [] },
        message: "사용자 계정과 일치하는 게시글 조회 실패"
      })
    })
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
        console.log("해당 게시글이 존재하지 않습니다.");
        result.status(404).send({
          responseCode: 404,
          data: null,
          message: 'no result',
        });
      } else {
        // console.log("1:", response.dataValues);
        response.dataValues.mateBoardLat = parseFloat(response.dataValues.mateBoardLat);
        response.dataValues.mateBoardLng = parseFloat(response.dataValues.mateBoardLng);
        console.log("2:", response.dataValues);
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
    result.status(500).send({
      responseCode: 500,
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
  let currentTimeStampDate = new Date(currentTimeStamp);
  currentTimeStampDate.setHours(currentTimeStampDate.getHours() + 9);

  // console.log('request.body ', request.body);
  request.body = JSON.parse(request.body.data);

  if(checkTokenResult.result == true) {
    const usersIndexNumber = await Users.findOne({
      attributes: [ "usersIndexNumber" ],
      where: {
          account: checkTokenResult.account
      }
    });
    
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
          mateBoardAddress1: request.body.mateBoardAddress1,
          mateBoardAddress2: request.body.mateBoardAddress2,
          mateBoardAddress3: request.body.mateBoardAddress3,
          mateBoardAddress4: request.body.mateBoardAddress4,
          mateBoardLat: request.body.mateBoardLat,
          mateBoardLng: request.body.mateBoardLng,
          mateBoardPhotos: matePhotosList.toString(),
          mateBoardCategory: parseInt(request.body.mateBoardCategory),
          mateBoardModifyDate: currentTimeStampDate,
          usersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber)

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
          mateBoardLat: request.body.mateBoardLat,
          mateBoardLng: request.body.mateBoardLng,
          mateBoardAddress1: request.body.mateBoardAddress1,
          mateBoardAddress2: request.body.mateBoardAddress2,
          mateBoardAddress3: request.body.mateBoardAddress3,
          mateBoardAddress4: request.body.mateBoardAddress4,
          mateBoardPhotos: matePhotosList.toString(),
          mateBoardCategory: parseInt(request.body.mateBoardCategory),
          mateBoardModifyDate: currentTimeStampDate,
          usersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber),
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
          mateBoardModifyDate: new Date(currentTimeStamp),
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


// 메이트 게시판 관심, 좋아요 기능 메서드
exports.interestMateBoard = async (req, res) => {
  const inputToken = req.headers.token;
  const checkTokenResult = await CheckToken.CheckToken(1, inputToken);
  const currentTimeStamp = CurrentDate.CurrentTimeStamp();
  let currentTimeStampDate = new Date(currentTimeStamp);
  currentTimeStampDate.setHours(currentTimeStampDate.getHours() + 9);

  if(checkTokenResult.result == true) {
    const usersIndexNumber = await Users.findOne({
      attributes: [ "usersIndexNumber" ],
      where: {
          account: checkTokenResult.account
      }
    });

    if(req.body.type === 'add') {
      try {
        const result = await InterestPost.create({
          interestPostStatus: 1,
          interestPostRegistDate: currentTimeStampDate,
          mateBoardIndexNumber: req.body.mateBoardIndexNumber,
          usersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber),
        });
        // console.log('result add ', result);
        res.status(200).send({
          responseCode: 200,
          message: 'Mate Board Post Interest Add',
        });
      } catch (err) {
        res.status(400).send({
          responseCode: 400,
          message: 'Incorrect request',
        });
      };

    } else if(req.body.type === 'delete') {
      try {
        const result = await InterestPost.destroy({
          where: {
            mateBoardIndexNumber: req.body.mateBoardIndexNumber,
            usersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber),
          }
        });
        // console.log('result delete ', result);
        res.status(200).send({
          responseCode: 200,
          message: 'Mate Board Post Interest Delete',
        });
      } catch (err) {
        res.status(400).send({
          responseCode: 400,
          message: 'Incorrect request',
        });
      };
    } else {
      res.send({
        responseCode: 400,
        message: 'Incorrect request',
      });
    }
  } else {
    res.send({
      responseCode: 400,
      message: 'Incorrect Key',
    });
  }
};

// 메이트 나의 좋아요 게시글 조회
exports.findByUsersInterest = async (req, res) => {
  const inputToken = req.headers.token;
  const checkTokenResult = await CheckToken.CheckToken(1, inputToken);

  if(checkTokenResult.result == true) {
    const usersIndexNumber = await Users.findOne({
      attributes: [ "usersIndexNumber" ],
      where: {
          account: checkTokenResult.account
      }
    });
    await MateBoard.findAndCountAll({
      include: [
        {
          model: InterestPost,
          as: 'InterestPost',
          attributes: ['interestPostStatus'],
          where: {
            usersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber),
          },
        }
      ],
      where: {
        mateBoardStatus: 1,
      },
    }).then((result) => {
      if(result.count === 0) {
        res.status(200).send({
          responseCode: 200,
          message: '',
          data: { count: 0, rows: [] },
        });
      } else {
        res.status(200).send({
          responseCode: 200,
          message: '',
          data: result,
        });
      }
    }).catch((err) => {
      console.log('err ', err);
      res.status(400).send({
        responseCode: 400,
        message: 'Incorrect Request',
      });
    });
  } else {
    res.status(400).send({
      responseCode: 400,
      message: 'Incorrect Key',
    });
  }
};
