const multer = require('multer');
const path = require('path');
const fs = require("fs");

const CheckToken = require("../CheckToken");

if(!fs.existsSync(`./data`)) {
    fs.mkdirSync(`./data`);
}

const ImageFileHandler = (dirName) => {
    if(!fs.existsSync(`./data/${dirName}`)) {
        fs.mkdirSync(`./data/${dirName}`);
        return multer({
            storage: multer.diskStorage({
                destination(req, file, res) {
                    res(null, `./data/${dirName}`);
                },
                async filename(req, file, res) {
                    // console.log("filename() req:", req.headers.token);
                    // console.log("filename() file:", file);
                    const ext = path.extname(file.originalname);
                    const checkTokenResult = await CheckToken.CheckToken(1, req.headers.token);
                    // console.log(checkTokenResult);

                    // res(null, `${req.body.account}_${file.fieldname}_${Date.now()}${ext}`);
                    res(null, `${checkTokenResult.account}_${file.fieldname}_${Date.now()}${ext}`);

                },
            }),
            limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
      });
    } else {
        return multer({
            storage: multer.diskStorage({
            destination(req, file, res) {
                res(null, `./data/${dirName}`);
            },
            async filename(req, file, res) {
                // console.log("filename() req:", req.headers.token);
                // console.log("filename() file:", file);
                const ext = path.extname(file.originalname);
                const checkTokenResult = await CheckToken.CheckToken(1, req.headers.token);
                // console.log(checkTokenResult);

                // res(null, `${req.body.account}_${file.fieldname}_${Date.now()}${ext}`);
                res(null, `${checkTokenResult.account}_${file.fieldname}_${Date.now()}${ext}`);
            },
            }),
            limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
      });
    }    
};

module.exports = {
    ImageFileHandler
}