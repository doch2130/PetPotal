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
        mateBoardPhotos: {
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
        },
        usersIndexNumber: {
            type: DataTypes.BIGINT
        },
        animalsIndexNumber: {
            type: DataTypes.BIGINT
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