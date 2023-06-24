/**
 * 사용자의 로그인 상태를 Session기반으로 관리할 때 사용하는 함수들
 */

module.exports = {
    /**
     * 서버 세션의 로그인 상태를 확인  
     * if(true) 로그인이 된 상태  
     * else 로그인이 안된 상태
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    signInState(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        }
        else {
            res.clearCookie('token');
            res.status(403).send({
                responseCode: 403,
                data: false,
                message: "Need SignIn"
            });
        }
    },
    noSignInState(req, res, next) {
        if(!req.isAuthenticated()) {
            next();
        }
        else {
            res.status(403).send({
                responseCode: 403,
                data: false,
                message: "Already Sign In"
            });
        }
    }
}