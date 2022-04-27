const HttpError = require('../models/https-error');
const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            throw new Error('Authentication Failed');
        }
        const decodedToken = jwt.verify(token, 'secret_pickHandle');
        req.userData = {userId:decodedToken.user.id}
        next();
    } catch(err) {
        const error = new HttpError('Authentication Failed', 401);
        return next(error);
    }

};