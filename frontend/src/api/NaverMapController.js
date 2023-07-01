import axios from 'axios';

// const geocodingUrl = '/api/map-geocode/v2/geocode';
const geocodingUrl = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode";

const geocoding = async (address) => {
  axios.get(`${geocodingUrl}?query=${address}`, {
    headers: {
      'X-NCP-APIGW-API-KEY-ID': `${process.env.REACT_APP_NCP_MAP_CLIENT_ID}`,
      'X-NCP-APIGW-API-KEY': `${process.env.REACT_APP_NCP_MAP_CLIENT_SECRET}`,
      'Access-Control-Allow-Origin': `${process.env.REACT_APP_BACK}`,
    },
  })
  .then((res) => {
    return res.data;
  })
  .then((data) => {
    if (data.addresses.length > 1) {
      // console.log(`${request.query}에는 여러 주소가 있어요.`);
      return [data.addresses[0].x, data.addresses[0].y];
    } else if (data.addresses.length === 0) {
      // console.log(`${request.query.address}에 해당되는 좌표가 없어요.`);
      return [ -1, -1];
    }

    // console.log('data ', data);
    return [data.addresses[0].x, data.addresses[0].y];
  })
  .catch((error) => {
    console.log('주소 -> 좌표 변환요청 오류');
    return [ -1, -1];
  });
}

export default geocoding;
