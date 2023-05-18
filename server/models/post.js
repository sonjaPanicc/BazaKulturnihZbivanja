import mongoose from "mongoose";

const postSchema = mongoose.Schema({

    creator: { type: String },
    creatorId: { type: String },
    eventId: { type: Number },
    comment: { type: String }
    
});

const Post = mongoose.model("Post", postSchema);

export default Post;
