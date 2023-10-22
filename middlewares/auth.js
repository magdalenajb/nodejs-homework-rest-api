const passport = require("passport");
require("dotenv").config();

const auth = (requiredSubscription) => (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {

        if (!req.get('Authorization')) {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized',
                data: 'Unauthorized',
            });
        };

        const token = req
            .get('Authorization')
            .replace('Bearer ', '');

        if (!user || err || !token || token !== user.token) {
            return res.status(401).json({
                status: "error",
                message: "Unauthorized",
                data: "Unauthorized",
            });
        };

        if (requiredSubscription && user.subscription !== requiredSubscription) {
            return res.status(403).json({
                status: "error",
                message: "Forbidden",
                data: "Forbidden: Subscription mismatch",
            });
        };

        req.user = user;
        next();
    })(req, res, next);
};

module.exports = auth;
