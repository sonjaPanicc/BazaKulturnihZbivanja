import Post from "../models/post.js";
import User from "../models/user.js";

export const postComment = async (req, res) => {

    const commentData = req.body;
    const userId = req.userId;

    try {
        const creator = await User.findById(userId);

        const newComment = new Post({
            ...commentData,
            creator: creator.name,
            creatorId: userId,
        });

        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const editComment = async (req, res) => {

    const { commentId, comment } = req.body;

    try {
        const updatedComment = await Post.findByIdAndUpdate(
            commentId,
            { comment: comment }
        );

        res.status(201).json(updatedComment);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const deleteComment = async (req, res) => {

    const id = req.body.commentId; // req.body = { commentId: '645b5a61ed76b83fc8c52ddb' }

    try {
        await Post.findByIdAndRemove(id);
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getCommentsOnEvent = async (req, res) => {

    const { id } = req.params;

    try {
        const comments = await Post.find({ eventId: id });
        res.status(200).json(comments);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};
