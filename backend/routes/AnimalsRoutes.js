const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const multer = require('multer');

const AnimalsController = require("../controller/AnimalsController");
const MulterFileHandler = require("../middleware/MulterFileHandler");

// const upload = multer();
// const upload = multer({ dest: "./data/" })
// const upload = multer({
//     storage: multer.diskStorage({
//         destination(req, file, res) {
//             res(null, `./data/animals/`)
//         },
//         filename(req, file, res) {
//             const ext = path.extname(file.originalname);
//             res(null, `${req.headers.account}_${file.fieldname}_${Date.now()}${ext}`);
//         }
//     })
// });
const upload = MulterFileHandler.HandlerMethod02("animals");

const uploadHandler01 = upload.single("animalsPhotos");



router.post("/insertContent", uploadHandler01, AnimalsController.insertAnimal);
router.get("/findByUser/:animalsUsersIndexNumber", AnimalsController.findByUsersIndexNumber);

module.exports = router;