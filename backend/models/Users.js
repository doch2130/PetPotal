const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Users = sequelize.define("Users", 
    {
        usersIndexNumber: {
            type: DataTypes.BIGINT, 
            primaryKey: true, 
            autoIncrement: true
        },
        account: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        salt: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        nickName: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        address1: {
            type: DataTypes.STRING
        },
        address2: {
            type: DataTypes.STRING
        },
        address3: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.FLOAT
        },
        lng: {
            type: DataTypes.FLOAT
        },
        role: {
            type: DataTypes.INTEGER
        },
        snsAccount: {
            type: DataTypes.STRING
        },
        snsPlatform: {
            type: DataTypes.STRING
        },
        joinDate: {
            type: DataTypes.STRING
        },
        modifiedDate: {
            type: DataTypes.STRING
        },
        lastLoginDate: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        tableName: "Users",
        timestamps: false,
        modelName: "Users"
    }
);

module.exports = Users;