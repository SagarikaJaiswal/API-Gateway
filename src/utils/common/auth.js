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

module.exports = {
    comparePassword,
    createToken
}