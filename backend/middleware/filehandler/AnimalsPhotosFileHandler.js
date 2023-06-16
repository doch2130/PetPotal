const multer = require('multer');
const path = require('path');
const fs = require("fs");

const ImageFileHandler = () => {
    if(!fs.existsSync("./data/animals")) {
        fs.mkdirSync("./data/animals");
        return multer({
            storage: multer.diskStorage({
            destination(req, file, res) {
                res(null, `./data/animals/`);
            },
            filename(req, file, res) {
                console.log("file req:", req);
                const ext = path.extname(file.originalname);
                // res(null, `${req.headers.animalsIndexNumber}_${file.fieldname}_${Date.now()}${ext}`);
                res(null, `${req.body.animalsIndexNumber}_${file.fieldname}_${Date.now()}${ext}`);
            },
            }),
            // limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
      });
    } else {
        return multer({
            storage: multer.diskStorage({
            destination(req, file, res) {
                res(null, `./data/animals/`);
            },
            filename(req, file, res) {
                const ext = path.extname(file.originalname);
                // res(null, `${req.headers.animalsIndexNumber}_${file.fieldname}_${Date.now()}${ext}`);
                res(null, `${req.body.animalsIndexNumber}_${file.fieldname}_${Date.now()}${ext}`);
            },
            }),
            // limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
      });
    }    
};

module.exports = {
    ImageFileHandler
}