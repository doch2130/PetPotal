const express = require("express");
const router = express.Router();

const MateBoardController = require("../controller/MateBoardController");

router.post("/insertContent", MateBoardController.insertMateBoard);
router.get("/findAllContent/:pageNumber", MateBoardController.findAllMateBoard);
router.get("/findByUser/:usersIndexNumber", MateBoardController.findByUsersIndexNumber);

module.exports = router;