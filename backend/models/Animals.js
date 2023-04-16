const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Users = require("./Users");

const Animals = sequelize.define("Animals", {
        animalsIndexNumber: {
            type: DataTypes.BIGINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        animalsName: {
            type: DataTypes.STRING
        },
        animalsGender: {
            type: DataTypes.INTEGER
        },
        animalsAge: {
            type: DataTypes.INTEGER
        },
        animalsCategory1: {
            type: DataTypes.INTEGER
        },
        animalsCategory2: {
            type: DataTypes.STRING
        },
        animalsPhotos: {
            type: DataTypes.TEXT
        },
        animalsRegistDate: {
            type: DataTypes.STRING
        },
        animalsModifyDate: {
            type: DataTypes.STRING
        },
        animalsUsersIndexNumber: {
            type: DataTypes.BIGINT
        }
    },
    {
        sequelize,
        tableName: "Animals",
        timestamps: false,
        modelName: "Animals"
    }
);

module.exports = Animals;