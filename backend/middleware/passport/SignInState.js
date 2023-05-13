module.exports = {
    signInState(req, res, next) {
        if(req.isAuthenticated()) {
            next();
        }
        else {
            res.status(403).send({
                responseCode: 403,
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
                message: "Already Sign In"
            });
        }
    }
}