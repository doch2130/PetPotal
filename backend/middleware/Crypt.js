const crypto = require("crypto");
const { resolve } = require("path");

const encrypt = (password) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if(err) reject(err);
            const salt = buf.toString("base64");
            crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hashedpw) => {
                if(err) {
                    reject(err);
                }           
                else {
                    resolve({
                        hashedpw: hashedpw.toString("base64"),
                        salt: salt
                    });
                }
            });
        });
    });
}

const decrypt = (salt, password) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 310000, 32, "sha256", (err, hashedpw) => {
            if(err) reject(err);
            else {
                resolve(hashedpw.toString("base64"));
            }
        });
    });
}

module.exports = { encrypt, decrypt }