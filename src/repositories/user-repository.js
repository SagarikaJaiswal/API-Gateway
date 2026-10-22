const CrudRepository = require('./crud-repository');
const { User } = require('../models/index');

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async getUserByEmail(userEmail){
        const user = await User.findOne({
            where: {
                email: userEmail
            }
        });
        return user;
    }
}

module.exports = UserRepository;