function isLogin(req, res, next) {
    // is logged in, allow
    if (req.isAuthenticated()) {
        next();
    }
    // isn't logged in, redirect
    else {
        req.session.returnTo = req.originalUrl;
        res.render('login', { message : "You need to be logged in!" });
    }
}

module.exports = { isLogin };