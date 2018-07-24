const createError = require('http-errors');

module.exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.isAuthenticated() && req.user.role === role) {
            next();
        } else {
            next(createError(403, 'Insufficient privileges'))
        }
    }
}