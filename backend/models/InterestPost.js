const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Users = require('./Users');
const MateBoard = require('./MateBoard');

const InterestPost = sequelize.define('InterestPost',
  {
    interestPostIndexNumber: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    interestPostStatus: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    interestPostRegistDate: {
      type: DataTypes.DATE(3)
    },
    usersIndexNumber: {
      type: DataTypes.BIGINT,
    },
    mateBoardIndexNumber: {
      type: DataTypes.BIGINT,
    },
  },
  {
    sequelize,
    tableName: 'InterestPost',
    freezeTableName: true,
    timestamps: false,
    modelName: 'InterestPost'
  },
);

InterestPost.belongsTo(Users, { 
  foreignKey: "usersIndexNumber", 
  targetKey: "usersIndexNumber", 
  as: "Users"
});

module.exports = InterestPost;

