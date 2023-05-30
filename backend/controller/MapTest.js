const axios = require('axios');
const dotenv = require('dotenv');
const { json } = require('express');

dotenv.config({
  path: './config/.env',
});

// const geocodingUrl = '/api/map-geocode/v2/geocode';
const geocodingUrl =
  'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode';

module.exports.geocoding = async (request, response) => {  
  axios.get(`${geocodingUrl}?query=${request.params.query}`, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': `${process.env.REACT_APP_NCP_MAP_CLIENT_ID}`,
        'X-NCP-APIGW-API-KEY': `${process.env.REACT_APP_NCP_MAP_CLIENT_SECRET}`,
      },
  })
  .then(res => {
    // TODO: check if response is ok
    console.log("api 데이터 수신중");
    return res.data;
  })
  .then(data => {
    // console.log(data);
    // response.status(200).send({
    //   data: { 
    //     x: data.addresses[0].x,
    //     y: data.addresses[0].y,
    //   }
    // })
    if (data.addresses.length > 0) {
      console.log(`${request.params.query}에는 여러 주소가 있어요.`);
      response.status(200).send({
        data: data
      })
    } else if (data.addresses.length === 0) {
      console.log(`${request.params.query}에 해당되는 좌표가 없어요.`);
      response.status(200).send({
        data: 1
      })
    } else {
      console.log("success but something wrong");
      response.status(200).send({
        // data: data,
        length: data.addresses.length
      })
    }
  })
  .catch((error) => {
    console.log("api 요청 에러");
    // console.error(error);
    response.status(404).send({
      data: false
    })
  })

  // return coord;
};
