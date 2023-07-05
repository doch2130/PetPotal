const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize");
const Users = require("./Users");
const Animals = require("./Animals");

const MateBoard = sequelize.define("MateBoard", {
        mateBoardIndexNumber: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        mateBoardTitle: {
            type: DataTypes.STRING
        },
        mateBoardFee: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        mateBoardContent1: {
            type: DataTypes.TEXT
        },
        mateBoardContent2: {
            type: DataTypes.TEXT
        },
        mateBoardAddress1: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        mateBoardAddress2: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""            
        },
        mateBoardAddress3: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        mateBoardAddress4: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        },
        mateBoardLat: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        mateBoardLng: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 0
        },
        mateBoardPhotos: {
            type: DataTypes.TEXT
        },
        mateBoardCategory: {
            type: DataTypes.INTEGER
        },
        mateBoardRegistDate: {
            type: DataTypes.DATE(3)
        },
        mateBoardModifyDate: {
            type: DataTypes.DATE(3)
        },
        mateBoardStatus: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        usersIndexNumber: {
            type: DataTypes.BIGINT,
        },
        animalsIndexNumber: {
            type: DataTypes.BIGINT
        }
    },
    {
        sequelize,
        tableName: "MateBoard",
        timestamps: false,
        modelName: "MateBoard",
    }
);

MateBoard.belongsTo(Users, { 
    foreignKey: "usersIndexNumber", 
    targetKey: "usersIndexNumber", 
    as: "Users"
});

MateBoard.belongsTo(Animals, {
    foreignKey: "animalsIndexNumber",
    targetKey: "animalsIndexNumber",
    as: "Animals"
})

module.exports = MateBoard;