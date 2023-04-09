// reference https://1-day-1-coding.tistory.com/51

const mysql = require("../config/mysql");

const Test01 = (Test01) => {
    this.column01 = Test01.column01;
    this.column02 = Test01.column02;
};

Test01.findAll = (result) => {
    mysql.query("SELECT * FROM test01", (err, res) => {
        if(err) {
            console.error("error: ", err);
            result(null, err);
        }
        else {
            console.log("Test01: ", res);
            result(null, res);
        } 
    });
};

Test01.findById = (id, result) => {
    mysql.query("SELECT * FROM test01 WHERE id = ?", id, (err, res) => {
        if(err) {
            console.error("Test01 findById failed: ", err);
            result(null, err);
        } 
        else {
            console.log("Test01 findById result: ", res);
            result(null, res);
        }
    })
}

Test01.insertRow = (result) => {
    mysql.query("INSERT INTO test01(column01, column02) VALUES(?, ?)", ["test02", "test02B"], (err, res, fields) => {
        if(err) {
            console.error("Test01 insertRow failed: ", err);
            result(null, err);
        } 
        else { 
            console.log("Test01 insertRow result: ", res);
            result(null, res);
        }
    });   
}

Test01.insertRow02 = (newTest01, result) => {
    console.log("insertRow02: \n", newTest01);
    console.log("column01: ", newTest01.column01 + " column02: ", newTest01.column02);
    mysql.query("INSERT INTO test01(column01, column02) VALUES(?, ?)", [newTest01.column01, newTest01.column02], (err, res) => {
        if(err) {
            console.error("insertRow02 model failed: \n", err);
            result(err, null);
        }
        else {
            console.log("Test01 model insertRow02 result: ", res);
            result(null, res);
        }
    })
}

module.exports = Test01;