const mysql = require("../config/mysql");

const Users = (users) => {
    this.account = users.account;
    this.password = users.password;
    this.name = users.name;
    this.nickName = users.nickName;
    this.phone = users.phone;
    this.email = users.email;
    this.address1 = users.address1;
    this.address2 = users.address2;
    this.address3 = users.address3;
    this.lat = users.lat;
    this.lng = users.lng;
    this.role = users.role;
    this.snsAccount = users.snsAccount;
    this.snsPlatform = users.snsPlatform;
    this.joinDate = users.joinDate;
    this.modifiedDate = users.modifiedDate;
    this.lastLoginDate = users.lastLoginDate;
}

module.exports = Users;