const express = require("express");

const userRouter = express.Router();

const { UserController } = require("../../controllers");
const { UserMiddleware } = require("../../middlewares");

userRouter.post('/signup', UserMiddleware.validateCreateUser, UserController.createUser);
userRouter.post('/signin', UserMiddleware.validateSignIn, UserController.signIn);

module.exports = userRouter;