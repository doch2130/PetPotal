const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({
  path: './config/.env',
});

// const geocodingUrl = '/api/map-geocode/v2/geocode';
const geocodingUrl =
  'https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode';

module.exports.geocoding = async (query) => {
  const coord = await axios
    .get(`${geocodingUrl}`, {
      params: {
        query,
      },
      headers: {
        'X-NCP-APIGW-API-KEY-ID': `${process.env.REACT_APP_NCP_MAP_CLIENT_ID}`,
        'X-NCP-APIGW-API-KEY': `${process.env.REACT_APP_NCP_MAP_CLIENT_SECRET}`,
      },
    })
    .then((res) => {
      // TODO: check if response is ok
      // console.log(res.data);
      return res.data;
    })
    .then((data) => {
      if (data.addresses.length > 1) {
        console.log(`${query}에는 여러 주소가 있어요.`);
      } else if (data.addresses.length === 0) {
        console.log(`${query}에 해당되는 좌표가 없어요.`);
        return [-1, -1];
      }
      return [data.addresses[0].x, data.addresses[0].y];
    });

  return coord;
};
