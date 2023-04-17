const redis = require("redis");

const MateBoard = require("../models/MateBoard");
const CheckToken = require("../middleware/CheckToken");
const CurrentDate = require("../middleware/CurrentDate");

exports.insertMateBoard = async (request, result) => {   
    let inputToken = request.headers.token;
    let checkTokenResult = await CheckToken.CheckToken(1, request.headers.account, inputToken);
    let currentTimeStamp = CurrentDate.CurrentTimeStamp();

    if(checkTokenResult == true) {
        await MateBoard.create({
            mateBoardTitle: request.body.mateBoardTitle,
            mateBoardContent1: request.body.mateBoardContent1,
            mateBoardContent2: request.body.mateBoardContent2,
            mateBoardCategory: parseInt(request.body.mateBoardCategory),
            mateBoardRegistDate: currentTimeStamp,
            mateBoardModifyDate: currentTimeStamp,
            usersIndexNumber: parseInt(request.body.usersIndexNumber),
            animalsIndexNumber: parseInt(request.body.animalsIndexNumber)
        })
        .then(response => {
            if(response == null) {
                result.send({
                    responseCode: 304,
                    message: "no result"
                })
            }
            else {
                result.send({
                    responseCode: 200,
                    data: response
                })
            }
        })
        .catch(error => {
            if(error != null) {
                result.send({
                    responseCode: 400,
                    message: "Something wrong...",
                    error: error
                })
            }
        })
    }
    else {
        result.send({
            responseCode: 400,
            message: "Incorrect Key"
        })
    }
    
}

exports.findByUsersIndexNumber = async(request, result) => {
    let inputToken = request.headers.token;
    const checkTokenResult = await CheckToken.CheckToken(1, request.headers.account, inputToken);

    if(checkTokenResult === true) {
        await MateBoard.findAll({
            // attributes: ["animalsUsersIndexNumber"],
            where: { 
                usersIndexNumber: request.params.usersIndexNumber
            }
        }).then((response) => {
            if(response == null) {
                result.send({
                    responseCode: 304,
                    message: "no result"
                })
            }
            else {
                result.send({
                    responseCode: 200,
                    data: response
                })
            }
        })
    }
    else {
        result.send({
            responseCode: 400,
            message: "Incorrect Key"
        })
    }
}