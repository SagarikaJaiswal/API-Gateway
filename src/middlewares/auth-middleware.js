const UserService = require("../services/user-service");

async function authCheck(req, res, next) {
    try {
        const response = await UserService.isAuthenticated(req.headers["x-access-token"]);
        if (response) {
            req.user = response;
            next();
        }
    } catch (error) {
        return res
            .status(error.statusCode)
            .json({ error: error.message });
    }
}

module.exports = { authCheck };