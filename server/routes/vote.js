import express from "express";
import auth from "../middleware/auth.js";
import {
    sendVote,
    getAllVotes,
    sendRating,
    getRatingOnEvent,
} from "../controllers/vote.js";

const voteRouter = express.Router();

voteRouter.post("/vote", auth, sendVote);
voteRouter.get("/", auth, getAllVotes);
voteRouter.post("/rating", sendRating);
voteRouter.get("/event/:id/rating", getRatingOnEvent);

export default voteRouter;
