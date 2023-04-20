const express = require("express");
const multer = require('multer');

const router = express.Router();
const upload = multer();

const AnimalsController = require("../controller/AnimalsController");

router.post("/insertContent", upload.single("animalsPhotos"), AnimalsController.insertAnimal);
router.get("/findByUser/:animalsUsersIndexNumber", AnimalsController.findByUsersIndexNumber);

module.exports = router;