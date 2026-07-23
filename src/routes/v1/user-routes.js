const express = require("express");

const userRouter = express.Router();

const { UserController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");

userRouter.post('/signup', UserMiddleware.validateCreateUser, UserController.createUser);


module.exports = userRouter;