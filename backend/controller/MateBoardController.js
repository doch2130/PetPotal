const MateBoard = require("../models/MateBoard");
const CurrentDate = require("../middleware/CurrentDate");

exports.insertMateBoard = async (request, result) => {
    let currentTimeStamp = CurrentDate.CurrentTimeStamp();

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

    })
    .catch(error => {
        
    })
}