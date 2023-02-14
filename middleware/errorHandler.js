const ApiError = require('../exceptions/apiError');
module.exports = function errorHandler(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({message: err.message, errors: err.errors});
    }
    return res.status(500).json({message: 'Internal server error'});
}
