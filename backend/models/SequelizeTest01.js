/** 
 * reference
 * https://soohyun6879.tistory.com/163
 * https://3dmpengines.tistory.com/1990
*/

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const SequelizeTest01 = sequelize.define("test01", 
    {
        id: {
            type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true
        },
        column01: {
            type: DataTypes.STRING
        },
        column02: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        tableName: "test01",
        timestamps: false,
        modelName: "SequelizeTest01"
    }
);

module.exports = SequelizeTest01;

// console.info(Test01 === sequelize.models.Test01);