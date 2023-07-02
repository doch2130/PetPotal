// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     createProxyMiddleware(
//       ['/api', '/socket.io', '/navermapapi'],
//       {
//       target: `${process.env.REACT_APP_BACK_AXIOS}`, // server 주소를 넣어주면 된다.
//       changeOrigin: true,
//       ws: true,
//       router: {
//         '/socket.io': `${process.env.REACT_APP_BACK_SOCKET}`,
//         '/api/navermapapi': 'https://naveropenapi.apigw.ntruss.com',
//       }
//     })
//   );
// };



// module.exports = function (app) {
//   app.use(
//     '/navermapapi',
//     createProxyMiddleware({
//       target: 'https://naveropenapi.apigw.ntruss.com',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/navermapapi': '/map-geocode/v2/geocode', // 경로 리라이트 설정
//       },
//       headers: {
//         'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NCP_MAP_CLIENT_ID,
//         'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NCP_MAP_CLIENT_SECRET,
//       },
//     })
//   );
// };


// module.exports = function (app) {
//   app.use(
//     '/navermapapi',
//     createProxyMiddleware({
//       target: 'https://naveropenapi.apigw.ntruss.com',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/navermapapi': '/map-geocode/v2/geocode', // 경로 리라이트 설정
//       },
//       headers: {
//         'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NCP_MAP_CLIENT_ID,
//         'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NCP_MAP_CLIENT_SECRET,
//       },
//     })
//   );
// };

// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = (app) => {
//   app.use(
//     createProxyMiddleware("/apis/v1/geocoding", {
//       target: "https://naveropenapi.apigw.ntruss.com",
//       changeOrigin: true,
//     }),
//   );
// };

// module.exports = (app) => {
//   app.use(
//     createProxyMiddleware("/api/v1/geocoding", {
//       target: "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
//       changeOrigin: true,
//     }),
//   );
// };