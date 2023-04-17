const redis = require("redis");
const redisConfig = require("../config/redisClient.json");

const Animals = require("../models/Animals");
const CurrentDate = require("../middleware/CurrentDate");

const ConvertAnimalsCategory2 = (animalsCategory2) => {
    let result = "";
    animalsCategory2 = animalsCategory2.toLowerCase();
    let animalsCategory2List = animalsCategory2.split(" ");
    for(let i = 0; i < animalsCategory2List.length; i++) {
        result += animalsCategory2List[i].replace(animalsCategory2List[i].charAt(0), animalsCategory2List[i].charAt(0).toUpperCase()) + "_";
    }
    if(result.endsWith("_")) {
        result = result.substring(0, result.length - 1);
    }
    return result;
}

exports.insertAnimal = async(request, result) => {
    // console.log("REQUEST\n",request.headers.account);
    // console.log("REQUEST\n",request.headers.token);
    const redisClient = redis.createClient(redisConfig);
    await redisClient.connect();
    let standardToken = await redisClient.get(request.headers.account);
    let inputToken = request.headers.token;

    let currentTimeStamp = CurrentDate.CurrentTimeStamp();
    let convertedCategory2 = ConvertAnimalsCategory2(request.body.animalsCategory2);
    
    if(standardToken === inputToken) {
        await Animals.create({
            animalsName: request.body.animalsName,
            animalsGender: parseInt(request.body.animalsGender),
            animalsAge: parseInt(request.body.animalsAge),
            animalsCategory1: parseInt(request.body.animalsCategory1),
            animalsCategory2: convertedCategory2,
            animalsPhotos: request.body.animalsPhotos,
            animalsRegistDate: currentTimeStamp,
            animalsModifyDate: currentTimeStamp,
            animalsUsersIndexNumber: parseInt(request.body.animalsUsersIndexNumber),
        })
        .then(response => {
            if(response == null) {
                result.send({
                    responseCode: 400,
                    message: "insertAnimal Failed"
                })
            }
            else {
                result.send({
                    responseCode: 200,
                    message: "insertAnimal Coplete"
                });
            }
        })
        .catch(err => {
            console.error("error\n", err);
            result.send({
                responseCode: 400,
                message: "insertAnimal data request failed"
            })
        })
    }
    else {
        result.send({
            responseCode: 400,
            message: "Incorrect Key"
        })
    }  
};

exports.findByUsersIndexNumber = async(request, result) => {
    const findByUsersIndexNumber = await Animals.findOne({
        // attributes: ["animalsUsersIndexNumber"],
        where: { 
            animalsUsersIndexNumber: request.params.animalsUsersIndexNumber
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
};