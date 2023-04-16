const express = require("express");
const passport = require("passport");
const router = express.Router();

const AnimalsController = require("../controller/AnimalsController");

router.post("/insertAnimal", AnimalsController.insertAnimal);
router.get("/findByUsersIndexNumber/:animalsUsersIndexNumber", AnimalsController.findByUsersIndexNumber);

module.exports = router;