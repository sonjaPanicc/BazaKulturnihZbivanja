import express from "express";
import auth from "../middleware/auth.js";
import {
    postComment,
    editComment,
    deleteComment,    
    getCommentsOnEvent,    
} from "../controllers/post.js";

const postRouter = express.Router();

postRouter.post("/", auth, postComment);
postRouter.patch("/", auth, editComment);
postRouter.delete("/", auth, deleteComment);
postRouter.get("/event/:id/comments", getCommentsOnEvent);

export default postRouter;
