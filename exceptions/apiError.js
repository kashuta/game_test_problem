module.exports = class ApiError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static unauthorized(message, errors = []) {
        return new ApiError(401, message, errors);
    }

    static forbidden(message, errors = []) {
        return new ApiError(403, message, errors);
    }

    static notFound(message, errors = []) {
        return new ApiError(404, message, errors);
    }
};
