import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import postRouter from "./routes/post.js";
import voteRouter from "./routes/vote.js";

const app = express();

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/votes", voteRouter);

const MONGODB_URL = "mongodb://0.0.0.0:27017/BazaKulturnihZbivanja";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    })
}).catch((error) => {
    console.log(`${error} did not connect`);
});
