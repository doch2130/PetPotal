import MateBoard from "./MateBoard";
import Users from "./Users";
import Animals from "./Animals";

// MateBoard.belongsTo(Users, {
//     foreignKey: "usersIndexNumber",
//     as: "user"
// });

// MateBoard.hasMany(Animals, {
//     foreignKey: "animalsIndexNumber",
// });
// Animals.belongsTo(MateBoard);

// Users.hasMany(Animals);
// Animals.belongsTo(Users, {
//     foreignKey: "animalsUsersIndexNumber"
// });

// Users.hasMany(MateBoard);
// MateBoard.belongsTo(Users, {
//     foreignKey: "usersIndexNumber"
// })

// MateBoard.hasMany(Animals, {
//     foreignKey: "animalsIndexNumber"
// })

export { 
    Users, 
    Animals,
    MateBoard
};