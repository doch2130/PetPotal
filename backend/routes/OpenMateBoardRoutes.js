const express = require('express');
const router = express.Router();

const OpenMateBoardController = require('../controller/OpenMateBoardController');

// router.get('/findAllContentDesc/:pageNumber', OpenMateBoardController.findAllMateBoardDesc);
// router.get('/findAllContentAsc/:pageNumber', OpenMateBoardController.findAllMateBoardAsc);
// router.get("/findByFilter/:pageNumber", OpenMateBoardController.findByFilter);

router.get('/findAllContent/:sort/:pageNumber', OpenMateBoardController.findAllMateBoard);
router.get("/findByIndex/:mateBoardIndexNumber", OpenMateBoardController.findByIndexNumber);

module.exports = router;
