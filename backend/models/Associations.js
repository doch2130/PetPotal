import Users from "./Users";
import Animals from "./Animals";
import MateBoard from "./MateBoard";

Users.hasMany(Animals);
Animals.belongsTo(Users, {
    foreignKey: "animalsUsersIndexNumber"
});

Users.hasMany(MateBoard);
MateBoard.belongsTo(Users, {
    foreignKey: "usersIndexNumber"
})
MateBoard.hasMany(Animals, {
    foreignKey: "animalsIndexNumber"
})

export { 
    Users, Animals,
    MateBoard
};