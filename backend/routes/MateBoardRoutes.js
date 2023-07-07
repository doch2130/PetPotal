const express = require('express');
const router = express.Router();

const MateBoardController = require('../controller/MateBoardController');
const MulterFileHandler = require('../middleware/filehandler/MulterFileHandler');

const insertContentUpload = MulterFileHandler.MultiFileHandler('mateBoardImg');
const uploadInsertContentHandler = insertContentUpload.array('mateBoardPhotos');

router.post('/insertContent', uploadInsertContentHandler, MateBoardController.insertMateBoard);
router.post('/textEditorImgFileUpload', MateBoardController.textEditorImgFileUpload);
// router.get('/findAllContentDesc/:pageNumber', MateBoardController.findAllMateBoardDesc);
// router.get('/findAllContent/:sort/:pageNumber', MateBoardController.findAllMateBoardDesc);
router.get('/findAllContent/:sort/:pageNumber', MateBoardController.findAllMateBoard);
router.get('/findByUser/:usersAccount', MateBoardController.findByUsersAccount);
router.get("/findByUser2/:usersAccount", MateBoardController.findByUsersAccount2);
router.get("/findByIndex/:mateBoardIndexNumber", MateBoardController.findByIndexNumber);
router.put('/updateContent', uploadInsertContentHandler, MateBoardController.updateMateBoard);
router.put("/deleteContent", MateBoardController.deleteMateBoard);
router.post('/interestContent', MateBoardController.interestMateBoard);
router.get('/findByUserInterest', MateBoardController.findByUsersInterest);

module.exports = router;
