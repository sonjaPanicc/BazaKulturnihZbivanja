import Vote from "../models/vote.js";
import User from "../models/user.js";

export const sendVote = async (req, res) => {

    const id = req.body.eventId; // req.body = { eventId: 7 }
    const userId = req.userId;

    try {

        const userVoted = await Vote.findOne({ voterIds: userId });
        const voter = await User.findById(userId);

        if (userVoted) {
            return res.status(400).json({ message: `${voter.name}, you already voted` });
        }

        const eventVote = await Vote.findOne({ eventId: id });

        if (!eventVote && typeof (id) == "number") {
            const eventVote = new Vote({
                eventId: id,
                voters: [voter.name],
                voterIds: [userId],
                voteCount: 1,
            });
            await eventVote.save();
            res.status(201).json(eventVote);
        }

        const voters = eventVote.voters;
        voters.push(voter.name);
        const voterIds = eventVote.voterIds;
        const voteCount = voterIds.push(userId);

        const updatedVote = await Vote.findOneAndUpdate(
            { eventId: id },
            {
                voters: voters,
                voterIds: voterIds,
                voteCount: voteCount,
            },
        );
        res.status(201).json(updatedVote);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getAllVotes = async (req, res) => {

    try {
        const votes = await Vote.find();
        res.status(200).json(votes);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const sendRating = async (req, res) => {

    const ratingData = req.body;
    const id = req.body.eventId;

    try {

        const eventRating = await Vote.findOne({ eventId: id });

        if (!eventRating && typeof (id) == "number") {
            const newRating = new Vote({
                ...ratingData,
            });
            await newRating.save();
            res.status(201).json(newRating);
        }

        const rating = eventRating.rating;

        rating.push(ratingData.rating);

        const updatedRating = await Vote.findOneAndUpdate(
            { eventId: id },
            { rating: rating },
        );

        res.status(201).json(updatedRating);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};

export const getRatingOnEvent = async (req, res) => {

    const { id } = req.params;

    try {
        const ratings = await Vote.findOne({ eventId: id });

        const ratingCount = {};
        ratings.rating.forEach((item) => {
            ratingCount[item] = (ratingCount[item] || 0) + 1;
        });
        const maxRating = Object.keys(ratingCount).find((key) => ratingCount[key] === Math.max(...Object.values(ratingCount)));

        res.status(200).json(maxRating);
    } catch (error) {
        res.status(404).json({ message: "Something went wrong" });
    }
};
