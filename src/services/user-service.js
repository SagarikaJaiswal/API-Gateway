const { UserRepository } = require('../repositories');
const { AppError } = require('../utils/errors');
const { StatusCodes } = require('http-status-codes');
const { Auth } = require('../utils/common');
const userRepository = new UserRepository();

/**
 * 
 * /signup
 * req-body : {email, password} 
 */
async function createUser(data) {
    try {
        const user = await userRepository.create(data);
        return user;
    } catch (error) {
        if (error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError") {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("User cannot be created", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

/**
 * 
 * @param {Object} data Contains email and password
 * @returns JWT token if user is authenticated
 */
async function signIn(data) {
    try {
        const user = await userRepository.getUserByEmail(data.email);
        if (!user) {
            throw new AppError("User not found", StatusCodes.NOT_FOUND);
        }
        const passwordMatch = await Auth.comparePassword(user.password, data.password);
        if (!passwordMatch) {
            throw new AppError("Invalid password", StatusCodes.BAD_REQUEST);
        }
        const token = Auth.createToken({ id: user.id, email: user.email });
        return token;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAuthenticated(token) {
    try {
        const decoded = Auth.verifyToken(token);
        const user = await userRepository.get(decoded.id);
        if (!user) {
            throw new AppError("User not found", StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Something went wrong", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    createUser,
    signIn,
    isAuthenticated
}