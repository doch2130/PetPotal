const multer = require("multer");
const fs = require("fs");

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

/**
 * 반려동물 정보를 추가하는 함수
 * @param {*} request 
 * @param {*} result 
 */
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

        let animalsPhotosList;
        if(request.files == undefined) {
            animalsPhotosList = "";
        } else {
            animalsPhotosList = new Array(request.files.length);
            for(let i = 0; i < request.files.length; i++) {
                animalsPhotosList[i] = request.files[i].filename;
            }
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
exports.findByUsersAccount = async(request, response) => {
    const inputToken = request.headers.token;
    const checkTokenResult = await CheckToken.CheckToken(1, inputToken);
    
    if(checkTokenResult.result == true) {
        const usersIndexNumber = await Users.findOne({
            attributes: ["usersIndexNumber"],
            where: {
                account: checkTokenResult.account
            }
        });        
        // console.log("findByAccount's IndexNumber:", usersIndexNumber);
        // console.log(usersIndexNumber.dataValues.usersIndexNumber);
        if(usersIndexNumber == null) {
            result.status(403).send({
                responseCode: 403,
                data: false,
                message: "데이터가 없습니다."
            })
        }
        else {
            await Animals.findAll({
                // attributes: ["animalsUsersIndexNumber"],
                where: { 
                    animalsUsersIndexNumber: usersIndexNumber.dataValues.usersIndexNumber,
                    animalsInfoActivate: 1
                }
            }).then((res) => {
                if(res == null) {
                    response.status(304).send({
                        responseCode: 304,
                        data: false,
                        message: "no result"
                    })
                } else {
                    if(res.length > 0) {
                        res.forEach(e => {
                            const prev = e.dataValues.animalsPhotos;
                            if(prev == "") { 
                                e.dataValues.animalsPhotos = "";
                            } else {
                                e.dataValues.animalsPhotos = `http://${request.hostname}:${request.socket.localPort}/api/animals/animalsPhotos/${prev}`;
                            }
                        });
                    }
                    response.status(200).send({
                        responseCode: 200,
                        data: res
                    })
                }
            }).catch((err) => {
                console.error("Animals findByAccount error");
                console.error(err);
                response.status(500).send({
                    responseCode: 500,
                    data: false
                })
            })
        }        
    } else {
        response.status(400).send({
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
                animalsAge: parseInt(request.body.animalsAge),
                animalsCategory1: parseInt(request.body.animalsCategory1),
                animalsCategory2: request.body.animalsCategory2,
                animalsWeight: parseFloat(request.body.animalsWeight),
                animalsNeutered: parseInt(request.body.animalsNeutered),   
                animalsModifyDate: currentTimeStamp,
            },
            {
                where: {
                    animalsIndexNumber: parseInt(request.body.animalsIndexNumber)
                }
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
    const prevImage = await Animals.findOne({
        attributes: ["animalsPhotos"],
        where: { animalsIndexNumber: parseInt(request.body.animalsIndexNumber) }
    })
    if(checkTokenResult) {
        if(
            prevImage.dataValues.animalsPhotos === undefined || prevImage.dataValues.animalsPhotos == "" ||
            prevImage.dataValues.animalsPhotos == null || prevImage.dataValues.animalsPhotos == "null"
        ) {
            await Animals.update(
                {
                    animalsPhotos: request.file.filename,
                },
                {
                    where: {
                        animalsIndexNumber: request.body.animalsIndexNumber
                    }
                }
            ).then((res) => {
                if(res[0] == 1) {
                    Animals.findOne({
                        attributes: ["animalsPhotos"],
                        where: {
                            animalsIndexNumber: parseInt(request.body.animalsIndexNumber)
                        }
                    })
                    .then((res2) => {
                        response.status(200).send({
                            responseCode: 200,
                            message: '반려동물 사진 업데이트 완료',
                            data: `http://${request.hostname}:${request.socket.localPort}/api/animals/animalsPhotos/${res2.dataValues.animalsPhotos}`,
                        });
                    })
                    .catch((err) => {
                        console.log("업데이트된 반려동물 사진 링크 불러오기 실패");
                        console.error(err);
                        response.status(500).send({
                            responseCode: 500,
                            message: "업데이트된 반려동물 사진 링크 불러오기 실패",
                            data: false,
                        });
                    })
                } else {
                    response.status(403).send({
                        responseCode: 403,
                        message: '반려동물 사진 업데이트 실패',
                        data: false,
                    });
                }
            })
            .catch((err) => {
                console.log("반려동물 사진 업데이트1 실패")
                console.error(err);
                response.status(403).send({
                    responseCode: 403,
                    message: '반려동물 사진 업데이트 실패(데이터베이스 오류)',
                    data: false,
                });
            });
        } else {
            const fileExistCheck = fs.existsSync(`./data/animals/${prevImage.dataValues.animalsPhotos}`);
            if(fileExistCheck == true) {
                fs.rmSync(`./data/animals/${prevImage.dataValues.animalsPhotos}`);
            }

            await Animals.update(
                {
                    animalsPhotos: request.file.filename,
                },
                {
                    where: {
                        animalsIndexNumber: parseInt(request.body.animalsIndexNumber)
                    }
                }   
            ).then((res) => {
                if(res[0] == 1) {
                    Animals.findOne({
                        attributes: ["animalsPhotos"],
                        where: {
                            animalsIndexNumber: parseInt(request.body.animalsIndexNumber)
                        }
                    })
                    .then((res2) => {
                        response.status(200).send({
                            responseCode: 200,
                            message: '반려동물 사진 업데이트 완료',
                            data: `http://${request.hostname}:${request.socket.localPort}/api/animals/animalsPhotos/${res2.dataValues.animalsPhotos}`,
                        });
                    })
                    .catch((err) => {
                        console.log("업데이트된 반려동물 사진 링크 불러오기 실패");
                        console.error(err);
                        response.status(500).send({
                            responseCode: 500,
                            message: "업데이트된 반려동물 사진 링크 불러오기 실패",
                            data: false,
                        });
                    })
                 } else {
                    response.status(403).send({
                        responseCode: 403,
                        message: '반려동물 사진 업데이트 실패',
                        data: false,
                    });
                }
            })
            .catch((err) => {
                console.info("반려동물 사진 업데이트2 실패")
                console.error(err);
                response.status(403).send({
                    responseCode: 403,
                    message: '반려동물 사진 업데이트 실패(데이터베이스 오류)',
                    data: false,
                });
            });
        }
    } else {
        response.status(500).send({
            responseCode: 500,
            message: 'Invalid Key',
            data: false,
          });
    }
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