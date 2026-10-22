const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/errors");

function validateCreateUser(req, res, next){
    if(!req.body.email){
        ErrorResponse.error = new AppError(
            "Email not found in the request",
            StatusCodes.BAD_REQUEST
        );
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }else if(!req.body.password){
        ErrorResponse.error = new AppError(
            "Password not found in the request",
            StatusCodes.BAD_REQUEST
        );
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

function validateSignIn(req, res, next){
    if(!req.body.email){
        ErrorResponse.error = new AppError(
            "Email not found in the request",
            StatusCodes.BAD_REQUEST
        );
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }else if(!req.body.password){
        ErrorResponse.error = new AppError(
            "Password not found in the request",
            StatusCodes.BAD_REQUEST
        );
        return res
        .status(StatusCodes.BAD_REQUEST)
        .json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateUser,
    validateSignIn
}