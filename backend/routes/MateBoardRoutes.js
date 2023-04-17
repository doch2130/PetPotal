const express = require("express");
const router = express.Router();

const MateBoardController = require("../controller/MateBoardController");

router.post("/insertMateBoard", MateBoardController.insertMateBoard);
router.get("/findByUsersIndexNumber/:usersIndexNumber", MateBoardController.findByUsersIndexNumber);

module.exports = router;