const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Users = require("./Users");

const MateBoard = sequelize.define("MateBoard", {
        mateBoardIndexNumber: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        mateBoardTitle: {
            type: DataTypes.STRING
        },
        mateBoardContent1: {
            type: DataTypes.TEXT
        },
        mateBoardContent2: {
            type: DataTypes.TEXT
        },
        mateBoardCategory: {
            type: DataTypes.INTEGER
        },
        mateBoardRegistDate: {
            type: DataTypes.STRING
        },
        mateBoardModifyDate: {
            type: DataTypes.STRING
        }
    
    },
    {
        sequelize,
        tableName: "MateBoard",
        timestamps: false,
        modelName: "MateBoard"
    }
);

module.exports = MateBoard;