const express = require("express");
const router = express.Router();

const Test01Controller = require("../controller/Test01Controller");

router.get("/findAll", Test01Controller.findAll);
router.get("/findById/:id", Test01Controller.findById);
router.get("/insertRow", Test01Controller.insertRow);
router.get("/insertRow02/:column01/:column02", Test01Controller.insertRow02);

module.exports = router;