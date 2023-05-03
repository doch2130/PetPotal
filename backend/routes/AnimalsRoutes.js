const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");
const multer = require('multer');

const AnimalsController = require("../controller/AnimalsController");
const MulterFileHandler = require("../middleware/MulterFileHandler");

// single file handling
// const upload = MulterFileHandler.SingleFileHandler("animals");
// const uploadHandler01 = upload.single("animalsPhotos");

const upload = MulterFileHandler.MultiFileHandler("animals");
const uploadHandler = upload.array("animalsPhotos", 5);

router.post("/insertContent", uploadHandler, AnimalsController.insertAnimal);
router.get("/findByUser/:animalsUsersIndexNumber", AnimalsController.findByUsersIndexNumber);

module.exports = router;