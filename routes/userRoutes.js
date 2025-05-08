const express = require("express");
const userRouter = express.Router();

const { signup, signin ,getAllUsers} = require("../controller/userController");

userRouter.post("/signup", signup);

userRouter.post("/signin", signin);
userRouter.get("/",getAllUsers)

module.exports = userRouter;
