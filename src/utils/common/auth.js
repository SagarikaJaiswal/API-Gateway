const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AppError } = require('../errors/app-error');
const { StatusCodes } = require('http-status-codes');
const { ServerConfig } = require('../../config');

async function comparePassword(encryptedPassword, plainPassword) {
    return await bcrypt.compare(plainPassword, encryptedPassword);
}

function createToken(data) {
    try {
        const token = jwt.sign(data, ServerConfig.JWT_SECRET, { expiresIn: ServerConfig.JWT_EXPIRY });
        return token;
    } catch (error) {
        throw new AppError("Token cannot be generated", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, ServerConfig.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new AppError("Invalid token", StatusCodes.UNAUTHORIZED);
    }
}
module.exports = {
    comparePassword,
    createToken,
    verifyToken
}