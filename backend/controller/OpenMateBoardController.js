const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const MateBoard = require('../models/MateBoard');
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
  let limit = 9;
  let offset = 0;

  if(pageNumber > 1) {
    offset = limit * (pageNumber - 1);
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
    limit: limit,
    order: [['mateBoardRegistDate', 'DESC']],
  }).then((res) => {
    console.log("조회 결과가 존재하지 않습니다.");
    if (res.count == 0) {
      response.status(304).send({
        responseCode: 304,
        data: { count: 0, rows: [] },
        message: "조회 결과가 존재하지 않습니다.",
      });
    } else {
      console.log("조회 결과를 전송합니다.");
      response.status(200).send({
        responseCode: 200,
        data: res
      });
    }
  });
};

/**
 * 조건에 따라 게시글 목록을 불러오기 위한 함수
 */
exports.findByFilter = async(request, response) => {

  let pageNumber = parseInt(request.params.pageNumber);
  let limit = 9;
  let offset = 0;

  if(pageNumber > 1) {
    offset = limit * (pageNumber - 1);
  }

  if(request.query.mateBoardAddress1 === undefined) request.query.mateBoardAddress1 = "";
  if(request.query.mateBoardAddress2 === undefined) request.query.mateBoardAddress2 = "";

  if(request.query.mateBoardAddress1.length == 0) {
    console.log(`주소1이 비어있습니다.`);
    response.status(502).send({
      responseCode: 502,
      data: { 
        count: 0,
        rows: []
      },
      message: `주소1이 비어있습니다.`
    })
  }
  else if(
    request.query.mateBoardAddress1.length != 0 &&
    request.query.mateBoardAddress2.length == 0
  ) {
    await MateBoard.findAndCountAll({
      include: [
        {
          model: Users,
          as: "Users",
          attributes: [ "account" ]
        }
      ],
      where: {
        mateBoardAddress1: { 
          [Op.like]: `${request.query.mateBoardAddress1}%`
        },
        mateBoardStatus: 1
      },
      offset: offset,
      limit: limit,
      order: [['mateBoardRegistDate', 'DESC']],
    })
    .then((res) => {
      if(res.count == 0) {
        console.log(`주소1(${request.query.mateBoardAddress1}) 로 검색한 결과가 없습니다.`);
        response.status(404).send({
          responseCode: 404,
          data: { count: 0, rows: [] },
          message: `주소1(${request.query.mateBoardAddress1}) 로 검색한 결과가 없습니다.`
        });
      } else {
        console.log(`주소1(${request.query.mateBoardAddress1}) 로 검색한 결과를 출력합니다.`);
        response.status(200).send({
          responseCode: 200,
          data: res,
          message: `주소1(${request.query.mateBoardAddress1}) 로 검색한 결과를 출력합니다.`
        })
      }    
    })
    .catch((err) => {
      console.log(`주소1(${request.query.mateBoardAddress1}) 로 검색을 실패했습니다.`);
      console.error(err);
      response.status(502).send({
        responseCode: 502,
        data: false,
        message: `주소1(${request.query.mateBoardAddress1}) 로 검색을 실패했습니다.`
      })
    })
  }
  else if(request.query.mateBoardAddress1.length != 0 && request.query.mateBoardAddress2.length != 0) {
    await MateBoard.findAndCountAll({
      include: [
        {
          model: Users,
          as: "Users",
          attributes: [ "account" ]
        }
      ],
      where: {
        [Op.and]: [{
        mateBoardAddress1: { 
          [Op.like]: `${request.query.mateBoardAddress1}%`
        },
        mateBoardAddress2: { 
          [Op.like]: `${request.query.mateBoardAddress2}%`
        },
        mateBoardStatus: 1 }]
      },
      limit: limit,
      offset: offset,
      order: [['mateBoardRegistDate', 'DESC']],
    })
    .then((res) => {
      if(res.count == 0) {
        console.log(`주소1(${request.query.mateBoardAddress1}), 주소2(${request.query.mateBoardAddress2}) 로 검색한 결과가 없습니다.`);
        response.status(404).send({
          responseCode: 404,
          data: { count: 0, rows: [] },
          message: `주소1(${request.query.mateBoardAddress1}), 주소2(${request.query.mateBoardAddress2}) 로 검색한 결과가 없습니다.`
        });
      } else {
        console.log(`주소1(${request.query.mateBoardAddress1}), 주소2(${request.query.mateBoardAddress2}) 로 검색한 결과를 출력합니다.`);
        response.status(200).send({
          responseCode: 200,
          data: res,
          message: `주소1(${request.query.mateBoardAddress1}), 주소2(${request.query.mateBoardAddress2}) 로 검색한 결과를 출력합니다.`
        })
      }    
    })
    .catch((err) => {
      console.log(`주소1(${request.query.mateBoardAddress1}), 주소2(${request.query.mateBoardAddress2}) 로 검색을 실패했습니다.`);
      console.error(err);
      response.status(502).send({
        responseCode: 502,
        data: false,
        message: `주소1(${request.query.mateBoardAddress1}), 주소2(${request.query.mateBoardAddress2}) 로 검색을 실패했습니다.`
      })
    });
  }
}

/**
 * 게시글 상세 조회를 위한 메서드 (게시글의 색인번호를 매개변수로 활용)
 * @param {*} request 
 * @param {*} response
 */
exports.findByIndexNumber = async (request, response) => {
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
  }).then((res) => {
    if(res == null) {
      console.log(`해당 게시글이 존재하지 않습니다. 게시글 번호: ${request.params.mateBoardIndexNumber}`);
      response.status(404).send({
        responseCode: 404,
        data: null,
        message: 'no result',
      });
    } else {
      console.log(`해당 게시글을 전송합니다. 게시글 번호: ${request.params.mateBoardIndexNumber}`);
      response.status(200).send({
        responseCode: 200,
        data: res,
      });
    }
  })
  .catch((err) => {
    console.error(`글 조회 실패 데이터 불러오기 오류, 게시글 번호: ${request.params.mateBoardIndexNumber}`);
    console.error(err);
    response.status(500).send({
      responseCode: 500,
      data: false,
      message: err
    });
  })
};
