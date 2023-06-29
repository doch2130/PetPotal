const multer = require('multer');
const path = require('path');
const fs = require("fs");

const BasicHandler = (dirName, req) => {
  // 기본형
  const ext = path.extname(req.file.originalname);
  const upload = multer({
    dest: `./data/${dirName}/${req.headers.account}/`,
  });
  return upload;
};

const SingleFileHandler = (dirName) => {
  if(!fs.existsSync(`./data/${dirName}`)) {
    fs.mkdirSync(`./data/${dirName}`);
    return multer({
      storage: multer.diskStorage({
        destination(req, file, res) {
          res(null, `./data/${dirName}/`);
        },
        filename(req, file, res) {
          const ext = path.extname(file.originalname);
          console.log('ext : ', ext);
          res(
            null,
            `${req.headers.account}_${file.fieldname}_${Date.now()}${ext}`
          );
        },
      }),
      // limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
    });
  }
  return multer({
    storage: multer.diskStorage({
      destination(req, file, res) {
        res(null, `./data/${dirName}/`);
      },
      filename(req, file, res) {
        const ext = path.extname(file.originalname);
        console.log('ext : ', ext);
        res(
          null,
          `${req.headers.account}_${file.fieldname}_${Date.now()}${ext}`
        );
      },
    }),
    // limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
  });
};

const MultiFileHandler = (dirName) => {
  if(!fs.existsSync(`./data/${dirName}`)) {
    fs.mkdirSync(`./data/${dirName}`);
    return multer({
      storage: multer.diskStorage({
        destination(req, file, res) {
          res(null, `./data/${dirName}/`);
        },
        async filename(req, file, res) {
          const checkTokenResult = await CheckToken.CheckToken(1, req.headers.token);
          const ext = path.extname(file.originalname);
          res(null, `${checkTokenResult.account}_${file.fieldname}_${Date.now()}${ext}`);
        },
      }),
      // limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
    });
  }
  return multer({
    storage: multer.diskStorage({
      destination(req, file, res) {
        res(null, `./data/${dirName}/`);
      },
      async filename(req, file, res) {
        const checkTokenResult = await CheckToken.CheckToken(1, req.headers.token);
        const ext = path.extname(file.originalname);
        res(
          null,
          `${checkTokenResult.account}_${file.fieldname}_${Date.now()}${ext}`
        );
      },
    }),
    // limits: { fileSize: 5 * 1024 * 1024 } // 5메가로 용량 제한
  });
};

/**
 * 사용되지 않는 파일을 삭제하기 위한 메서드입니다.(개발중)
 */
const DeleteUnused = () => {
  console.log("DeleteUnused start");
  console.log(fs.readFileSync(`./data/`));
}

module.exports = {
  BasicHandler,
  SingleFileHandler,
  MultiFileHandler,
  DeleteUnused
};
