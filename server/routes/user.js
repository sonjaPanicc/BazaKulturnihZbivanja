import express from "express";
import {
    login,
    register,
    getAllMembers,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.get("/members", getAllMembers);

export default userRouter;
