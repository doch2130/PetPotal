const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Users = sequelize.define('Users',
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
    address4: {
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.INTEGER
    },
    profileImageFileName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    profileImageLink: {
      type: DataTypes.TEXT,
      allowNull: true
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
    },
    usersStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'Users',
    freezeTableName: true,
    timestamps: false,
    modelName: 'Users'
  }
);

module.exports = Users;
