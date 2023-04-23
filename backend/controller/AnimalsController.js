const multer = require("multer");

const Animals = require("../models/Animals");
const CheckToken = require("../middleware/CheckToken");
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
    let inputToken = request.headers.token;
    let checkTokenResult = await CheckToken.CheckToken(1, request.headers.account, inputToken);

    let currentTimeStamp = CurrentDate.CurrentTimeStamp();
    let convertedCategory2 = ConvertAnimalsCategory2(request.body.animalsCategory2);
    // console.log(request.body);
    // console.log(request.file);
    // console.log(request.files)
    // console.log(`사용자 ${request.headers.account} 가 insertAnimal을 요청합니다.`);
    // console.log("multer:\n", request.files);

    if(checkTokenResult == true) {
        let animalsPhotosList = new Array(request.files.length);
        for(let i = 0; i < request.files.length; i++) {
            animalsPhotosList[i] = request.files[i].filename;
        }

        await Animals.create({
            animalsName: request.body.animalsName,
            animalsGender: parseInt(request.body.animalsGender),
            animalsNeutered: request.body.animalsNeutered,            
            animalsAge: parseInt(request.body.animalsAge),
            animalsWeight: parseInt(request.body.animalsWeight),            
            animalsCategory1: parseInt(request.body.animalsCategory1),
            animalsCategory2: convertedCategory2,
            animalsPhotos: animalsPhotosList.toString(),
            animalsRegistDate: currentTimeStamp,
            animalsModifyDate: currentTimeStamp,
            animalsUsersIndexNumber: parseInt(request.body.animalsUsersIndexNumber),
        })
        .then(response => {
            if(response == null) {
                // console.error(`사용자 ${request.headers.account} 의 insertAnimal 수행을 실패했습니다.`);
                console.error("error message:\n", response);
                result.send({
                    responseCode: 400,
                    message: "insertAnimal Failed"
                })
            }
            else {
                // console.log(`사용자 ${request.headers.account} 의 insertAnimal 수행이 완료되었습니다.`);
                result.send({
                    responseCode: 200,
                    message: "insertAnimal Coplete"
                });
            }
        })
        .catch(err => {
            // console.error(`사용자 ${request.headers.account} 의 insertAnimal 요청에 실패했습니다.`);
            console.error("error message:\n", err);
            result.send({
                responseCode: 400,
                message: "insertAnimal data request failed"
            })
        })
    }
    else {
        // console.error(`사용자 ${request.headers.account}의 요청에 실패했습니다.`);
        result.send({
            responseCode: 400,
            message: "Incorrect Auth Key"
        })
    }  
};

exports.findByUsersIndexNumber = async(request, result) => {
    let inputToken = request.headers.token;
    let checkTokenResult = await CheckToken.CheckToken(1, request.headers.account, inputToken);

    if(checkTokenResult == true) {
        await Animals.findAll({
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
    }
    else {
        result.send({
            responseCode: 400,
            message: "Incorrect Auth Key"
        })
    }
};