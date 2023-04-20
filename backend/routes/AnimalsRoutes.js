const express = require("express");
const passport = require("passport");
const router = express.Router();

const AnimalsController = require("../controller/AnimalsController");

router.post("/insertContent", AnimalsController.insertAnimal);
router.get("/findByUser/:animalsUsersIndexNumber", AnimalsController.findByUsersIndexNumber);

module.exports = router;