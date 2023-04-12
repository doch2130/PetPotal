const Users = require("../models/Users");
const Crypt = require("../middleware/Crypt");
const CurrentDate = require("../middleware/CurrentDate");

exports.insertUser = async(request, result) => {
    let hashed = await Crypt.encrypt(request.body.password);
    let salt = hashed.salt;
    let hashedPass = hashed.hashedpw;

    let currentTimeStamp = CurrentDate.CurrentTimeStamp();
    
    const insertUser = await Users.create({
        account: request.body.account,
        password: hashedPass,
        salt: salt,
        name: request.body.name,
        nickName: request.body.nickName,
        phone: request.body.phone,
        email: request.body.email,
        address1: request.body.address1,
        address2: request.body.address2,
        address3: request.body.address3,
        joinDate: currentTimeStamp,
        modifiedDate: currentTimeStamp
    });

    if(insertUser == null) {
        result.send({
            responseCode: 200,
            message: "회원가입 실패"
        })
    }
    else {
        result.send({
            responseCode: 200,
            message: "회원가입 완료"
        });
    }    
}

exports.findByAccount = (request, result) => {
    Users.findOne({
        attributes: ["account"],
        where: { account: request.body.account }
    }).then((response) => {
        if(response == null) {
            result.send({
                responseCode: 200,
                data: true
            })
        }
        else {
            result.send({
                responseCode: 304,
                data: false
            })
        }
    })
}

exports.findByEmail = (request, result) => {
    Users.findOne({
        attributes: ["email"],
        where: { account: request.body.email }
    }).then((response) => {
        if(response == null) {
            result.send({
                responseCode: 200,
                data: true
            })
        }
        else {
            result.send({
                responseCode: 304,
                data: false
            })
        }
    })
}

exports.findByPhone = (request, result) => {
    Users.findOne({
        attributes: ["phone"],
        where: { account: request.body.phone }
    }).then((response) => {
        if(response == null) {
            result.send({
                responseCode: 200,
                data: true
            })
        }
        else {
            result.send({
                responseCode: 304,
                data: false
            })
        }
    })
}

/*
회원가입 메서드 no sequelize
let salt = crypto.randomBytes(16).toString("base64");
    crypto.pbkdf2(req.body.password, salt, 310000, 32, "sha256", (err, hashedPassword) => {
        let convertedPw = hashedPassword.toString("base64");
        if(err) { return next(err); }
        mysql.query("INSERT INTO Users " +
        "(account, password, salt, name, nickName, phone, email, address1, address2, address3, " +
        "joinDate, modifiedDate) " +
        "VALUES(?, ?, ?, ?, ?, " +
        "?, ?, ?, ?, ?, " +
        "?, ?)",
        [
            req.body.account,
            convertedPw,
            salt,
            req.body.name,
            req.body.nickName,
            req.body.phone,
            req.body.email,
            req.body.address1,
            req.body.address2,
            req.body.address3,
            req.body.joinDate,
            req.body.modifiedDate,
        ], (err) => {
            if(err) { return next(err); }
            else { 
                return res.send("ok"); 
            }
            // req.login(function (err) {
            //     if (err) { return next(err); }
            //     res.redirect('/');
            // });
        });
    });
*/