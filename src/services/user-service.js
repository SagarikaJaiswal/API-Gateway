const { UserRepository } = require('../repositories');
const { AppError } = require('../utils/errors');
const { StatusCodes } = require('http-status-codes'); 

const userRepository = new UserRepository();

/**
 * 
 * /signup
 * req-body : {email, password} 
 */
async function createUser(data){
    try{
        const user = await userRepository.create(data);
        return user;
    }catch(error){
        if(error.name == "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError"){
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            })
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError("User cannot be created", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createUser
}