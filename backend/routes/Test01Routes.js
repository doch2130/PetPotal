const express = require('express');
const router = express.Router();

const Test01Controller = require('../controller/Test01Controller');
const SequelizeTest01Controller = require('../controller/SequelizeTest01Controller');
const MapTest = require('../controller/NaverMapController');

router.get('/findAll', Test01Controller.findAll);
router.get('/findById/:id', Test01Controller.findById);
router.get('/insertRow', Test01Controller.insertRow);
router.get('/insertRow02/:column01/:column02', Test01Controller.insertRow02);

router.get('/sequelizerInsertOne', SequelizeTest01Controller.insertOne);
router.post('/sequelizerInsertOne2', SequelizeTest01Controller.insertOne2);
router.get('/sequelizeFindAll', SequelizeTest01Controller.findAll);
router.get('/sequelizeFindById/:id', SequelizeTest01Controller.findById);

router.get('/mkSalt/:pw', Test01Controller.cryptTest);

// router.get('/geocoding/:query', MapTest.geocoding);

module.exports = router;
