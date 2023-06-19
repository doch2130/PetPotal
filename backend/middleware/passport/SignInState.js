module.exports = {
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