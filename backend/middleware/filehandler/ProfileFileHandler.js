const multer = require('multer');
const path = require('path');
const fs = require("fs");

const profileImageFileHandler = () => {
    if(!fs.existsSync("./data/profile")) {
        fs.mkdirSync("./data/profile");
        return multer({
            storage: multer.diskStorage({
            destination(req, file, res) {
                res(null, `./data/profile/`);
            },
            filename(req, file, res) {
                const ext = path.extname(file.originalname);
                res(null, `${req.headers.account}_${file.fieldname}_${Date.now()}${ext}`);
            },
            }),
            // limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
      });
    } else {
        return multer({
            storage: multer.diskStorage({
            destination(req, file, res) {
                res(null, `./data/profile/`);
            },
            filename(req, file, res) {
                const ext = path.extname(file.originalname);
                res(null, `${req.headers.account}_${file.fieldname}_${Date.now()}${ext}`);
            },
            }),
            // limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
      });
    }    
};

module.exports = {
    profileImageFileHandler
}