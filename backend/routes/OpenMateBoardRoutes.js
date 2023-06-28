const express = require('express');
const router = express.Router();

const OpenMateBoardController = require('../controller/OpenMateBoardController');

router.get('/findAllContentDesc/:pageNumber', OpenMateBoardController.findAllMateBoardDesc);
// router.get('/findAllContentAsc/:pageNumber', OpenMateBoardController.findAllMateBoardAsc);

module.exports = router;
