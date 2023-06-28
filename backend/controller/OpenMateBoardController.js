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
 * 조건에 따라 게시글 목록을 불러오기 위한 함수
 */
exports.findByFilter = async(request, response) => {

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
      mateBoardStatus: 1
    },
    limit: limit,
    offset: offset
  })
  .then((res) => {
    if(res.count == 0) {
      response.status(204).send({
        responseCode: 204,
        data: null,
        message: "결과 데이터가 없습니다."
      });
    } else {
      response.status(200).send({
        responseCode: 200,
        data: res,
        message: "결과를 출력합니다."
      })
    }    
  })
  .catch((err) => {
    console.error("Mate 글 목록 조회(필터사용) 실패");
    console.error(err);
    response.status(502).send({
      responseCode: 502,
      data: false,
      message: "데이터를 불러오는데 실패했습니다."
    })
  })
}

/**
 * 게시글 상세 조회를 위한 메서드 (게시글의 색인번호를 매개변수로 활용)
 * @param {*} request 
 * @param {*} response
 */
exports.findByIndexNumber = async (request, reponse) => {
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
      response.status(404).send({
        responseCode: 404,
        data: null,
        message: 'no result',
      });
    } else {
      response.status(200).send({
        responseCode: 200,
        data: res,
      });
    }
  })
  .catch((err) => {
    console.error("글 조회 실패 데이터 불러오기 오류");
    console.error(err);
    response.status(500).send({
      responseCode: 500,
      data: false,
      message: err
    });
  })
};
