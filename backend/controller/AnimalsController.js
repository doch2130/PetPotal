const multer = require("multer");

const Animals = require("../models/Animals");
const Users = require("../models/Users");

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
    let checkTokenResult = await CheckToken.CheckToken(1, inputToken);

    let currentTimeStamp = CurrentDate.CurrentTimeStamp();
    let convertedCategory2 = ConvertAnimalsCategory2(request.body.animalsCategory2);
    // console.log(request.body);
    // console.log(request.file);
    // console.log(request.files)
    // console.log(`사용자 ${request.headers.account} 가 insertAnimal을 요청합니다.`);
    // console.log("multer:\n", request.files);

    if(checkTokenResult.result == true) {
        const usersIndexNumber = await Users.findOne({
            attributes: [ "usersIndexNumber" ],
            where: {
                account: checkTokenResult.account
            }
        });
        let animalsPhotosList = new Array(request.files.length);
        for(let i = 0; i < request.files.length; i++) {
            animalsPhotosList[i] = request.files[i].filename;
        }

        await Animals.create({
            animalsName: request.body.animalsName,
            animalsGender: parseInt(request.body.animalsGender),
            animalsNeutered: request.body.animalsNeutered,            
            animalsAge: parseInt(request.body.animalsAge),
            animalsWeight: parseFloat(request.body.animalsWeight),            
            animalsCategory1: parseInt(request.body.animalsCategory1),
            animalsCategory2: convertedCategory2,
            animalsPhotos: animalsPhotosList.toString(),
            animalsRegistDate: currentTimeStamp,
            animalsModifyDate: currentTimeStamp,
            animalsUsersIndexNumber: parseInt(usersIndexNumber.dataValues.usersIndexNumber),
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

/**
 * 회원색인번호 usersIndexNumber와 일치하는 동물 정보를 조회합니다.
 * @param {*} request 
 * @param {*} result 
 */
exports.findByUsersIndexNumber = async(request, result) => {
    const inputToken = request.headers.token;
    const checkTokenResult = await CheckToken.CheckToken(1, inputToken);
    
    if(checkTokenResult.result == true) {
        const usersAccount = await Users.findOne({
            attributes: [ "account" ],
            where: {
                usersIndexNumber: request.params.animalsUsersIndexNumber,
            }
        });
        // console.log(usersAccount.dataValues.account);
        if(usersAccount.dataValues.account == checkTokenResult.account) {
            await Animals.findAll({
                // attributes: ["animalsUsersIndexNumber"],
                where: { 
                    animalsUsersIndexNumber: request.params.animalsUsersIndexNumber,
                    animalsInfoActivate: 1
                }
            }).then((response) => {
                if(response == null) {
                    result.status(304).send({
                        responseCode: 304,
                        data: false,
                        message: "no result"
                    })
                } else {
                    result.status(200).send({
                        responseCode: 200,
                        data: response
                    })
                }
            })
        } else {
            result.status(403).send({
                responseCode: 403,
                data: false,
                message: "요청한 사용자는 해당 데이터에 대한 권한이 없습니다."
            })
        }

        
    } else {
        result.status(400).send({
            responseCode: 400,
            data: false,
            message: "Incorrect Auth Key"
        })
    }
};

/**
 * 등록된 동물의 정보를 업데이트 하는 함수
 * @param {*} request 
 * @param {*} response 
 */
exports.updateInfo = async(request, response) => {
    const inputToken = request.headers.token;
    const checkTokenResult = await CheckToken.CheckToken(1, inputToken);
    
    if(checkTokenResult.result == true) {
        const currentTimeStamp = CurrentDate.CurrentTimeStamp();
        await Animals.update(
            {
                animalsName: request.body.animalsName,
                animalsGender: parseInt(request.body.animalsGender),
                animalsNeutered: parseInt(request.body.animalsNeutered),
                animalsAge: parseInt(request.body.animalsAge),
                animalsWeight: parseFloat(request.body.animalsWeight),
                animalsModifyDate: currentTimeStamp,
            },
            {
            where: {
                animalsIndexNumber: parseInt(request.body.animalsIndexNumber)
            },
            }
        )
        .then((res) => {
            if(res[0] == 1) {
                response.status(200).send({
                    responseCode: 200,
                    data: true,
                    message: "정보 갱신 완료"
                })
            } else {
                response.status(400).send({
                    responseCode: 400,
                    data: false,
                    message: "정보 갱신 실패"
                })
            }
        })
        .catch((err) => {
            response.status(400).send({
                responseCode: 400,
                data: false,
                message: "정보 갱신 실패 데이터베이스 오류",
                error: err
            })
        });        
    } else {
        response.status(400).send({
            responseCode: 400,
            data: false,
            message: "Incorrect Auth Key"
        })
    }
}

/**
 * 동물의 사진을 업데이트 하는 함수
 * @param {*} request 
 * @param {*} response 
 */
exports.updateImage = async(request, response) => {
    const inputToken = request.headers.token;
    const checkTokenResult = await CheckToken.CheckToken(1, inputToken);
}

/**
 * 등록된 동물의 정보를 삭제하는 함수
 * @param {*} request 
 * @param {*} response 
 */
exports.deleteInfo = async(request, response) => {
    const inputToken = request.headers.token;
    const checkTokenResult = await CheckToken.CheckToken(1, inputToken);
    
    if(checkTokenResult.result == true) {
        const currentTimeStamp = CurrentDate.CurrentTimeStamp();
        await Animals.update(
            {
                animalsModifyDate: currentTimeStamp,
                animalsInfoActivate: 2
            },
            {
            where: {
                animalsIndexNumber: parseInt(request.body.animalsIndexNumber)
            },
            }
        )
        .then((res) => {
            if(res[0] == 1) {
                response.status(200).send({
                    responseCode: 200,
                    data: true,
                    message: "삭제 완료"
                })
            } else {
                response.status(400).send({
                    responseCode: 400,
                    data: false,
                    message: "삭제 실패"
                })
            }
        })
        .catch((err) => {
            response.status(400).send({
                responseCode: 400,
                data: false,
                message: "삭제 실패 데이터베이스 오류",
                error: err
            })
        });        
    } else {
        response.status(400).send({
            responseCode: 400,
            data: false,
            message: "Incorrect Auth Key"
        })
    }
}