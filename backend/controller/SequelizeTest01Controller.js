const SequelizeTest01 = require("../models/SequelizeTest01");

exports.insertOne = (request, result) => {
    const insertOne = SequelizeTest01.create({
        column01: "S_test01-A",
        column02: "S_test01-B"
    }).then(r => {
        result.send(r);
    })
}

exports.insertOne2 = (request, result) => {
    console.log("input body:\n", request.body);
    const insertOne = SequelizeTest01.create({
        column01: request.body.column01,
        column02: request.body.column02
    }).then(r => {
        result.send(r);
    })
}

exports.findAll = (request, result) => {
    const findAll = SequelizeTest01.findAll({
        attributes: ["column01", "column02"]
    }).then((f) => {
        result.send(f);
    });
}

exports.findById = (request, result) => {
    console.log("parameter: ", request.params.id);
    const findOne = SequelizeTest01.findOne({
        // attributes: ["column01"],
        where: { column01: request.params.id }
    }).then((r) => {
        if(r == null) {
            result.send({
                responseCode: 304,
                data: "none"
            })
        }
        else {
            result.send({
                responseCode: 304,
                data: r
            });
        }
    })
}
