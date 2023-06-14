const express = require("express");
const router = express.Router();

const AnimalsController = require("../controller/AnimalsController");
const MulterFileHandler = require("../middleware/filehandler/MulterFileHandler");

// single file handling
// const upload = MulterFileHandler.SingleFileHandler("animals");
// const uploadHandler01 = upload.single("animalsPhotos");

const uploadMulty = MulterFileHandler.MultiFileHandler("animals");
const uploadSingle = MulterFileHandler.SingleFileHandler("animals");
const multiFileUploadHandler = uploadMulty.array("animalsPhotos", 5);
const singleFileUploadHandler = uploadSingle.single("animalsPhotos");

router.get("/findByUser/:animalsUsersIndexNumber", AnimalsController.findByUsersIndexNumber);
router.post("/insertContent", multiFileUploadHandler, AnimalsController.insertAnimal);
router.put("/updateInfo", AnimalsController.updateInfo);
router.put("/deleteInfo", AnimalsController.deleteInfo);
router.post("/updateImage", singleFileUploadHandler, AnimalsController.updateImage);

module.exports = router;