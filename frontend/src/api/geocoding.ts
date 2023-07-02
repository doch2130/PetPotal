import axios from 'axios';

// 사용 X
// 혹시 몰라서 일단 파일 유지

// const geocodingUrl = '/api/map-geocode/v2/geocode';
// const geocodingUrl = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode";
const geocodingUrl = "/map-geocode/v2/geocode";

const geocoding = async (address:string):Promise<number[]> => {
  try {
    // const result = await axios.get(`/api/navermapapi${geocodingUrl}?query=${address}`, {
    const result = await axios.get(`/apis/v1/geocoding${geocodingUrl}`, {
    // const result = await axios.get(`/api/v1/geocoding`, {
      params: {
        query: address
      },
      headers: {
        'X-NCP-APIGW-API-KEY-ID': `${process.env.REACT_APP_NCP_MAP_CLIENT_ID}`,
        'X-NCP-APIGW-API-KEY': `${process.env.REACT_APP_NCP_MAP_CLIENT_SECRET}`,
      },
    });

    console.log('geocoding ', result);

    if(result.data.address.length > 1) {
      return [result.data.addresses[0].x, result.data.addresses[0].y];
    } else if (result.data.addresses.length === 0) {
      return [-1, -1];
    }

    return [result.data.addresses[0].x, result.data.addresses[0].y];
  } catch (err) {
    console.log('주소 -> 좌표 변환요청 오류 ', err);
    return [-1, -1];
  };
}


export default geocoding;




