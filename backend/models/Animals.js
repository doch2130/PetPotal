const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");

const Animals = sequelize.define("Animals", {
        animalsIndexNumber: {
            type: DataTypes.BIGINT, 
            primaryKey: true, 
            autoIncrement: true,
        },
        animalsName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        animalsGender: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        animalsNeutered: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        animalsAge: {
            type: DataTypes.INTEGER
        },
        animalsWeight: {
            type: DataTypes.FLOAT
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
        },
        animalsInfoActivate: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
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