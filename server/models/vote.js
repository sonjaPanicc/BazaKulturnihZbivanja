import mongoose from "mongoose";

const voteSchema = mongoose.Schema({

    eventId: { type: Number },
    voters: { type: Array },
    voterIds: { type: Array },
    voteCount: { type: Number },
    rating: { type: Array }

});

const Vote = mongoose.model("Vote", voteSchema);

export default Vote;
