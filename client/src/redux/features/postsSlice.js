import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";
import ratingDesc from "../../data/ratingDesc";

export const postComment = createAsyncThunk(
    "posts/postComment",
    async ({ commentData, toast }, { rejectWithValue }) => {
        try {
            const response = await api.postComment(commentData);
            toast.success("Comment added successfully");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getCommentsOnEvent = createAsyncThunk(
    "posts/getCommentsOnEvent",
    async (eventId, { rejectWithValue }) => {
        try {
            const response = await api.getCommentsOnEvent(eventId);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const editComment = createAsyncThunk(
    "posts/editComment",
    async ({ editData, toast }, { rejectWithValue }) => {
        try {
            const response = await api.editComment(editData);
            toast.success("Comment edited successfully");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const deleteComment = createAsyncThunk(
    "posts/deleteComment",
    async ({ commentId, toast }, { rejectWithValue }) => {
        try {
            const response = await api.deleteComment(commentId);
            toast.success("Comment deleted successfully");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const sendVote = createAsyncThunk(
    "posts/sendVote",
    async ({ eventId, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.sendVote(eventId);
            toast.success("Vote added successfully");
            navigate("/");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getAllVotes = createAsyncThunk(
    "posts/getAllVotes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.getAllVotes();
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const sendRating = createAsyncThunk(
    "posts/sendRating",
    async ({ ratingData, toast }, { rejectWithValue }) => {
        try {
            const response = await api.sendRating(ratingData);
            toast.success("Feedback added successfully");
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const getRatingOnEvent = createAsyncThunk(
    "posts/getRatingOnEvent",
    async (eventId, { rejectWithValue }) => {
        try {
            const response = await api.getRatingOnEvent(eventId);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        comment: {},
        comments: [],
        vote: "",
        eventId: "",
        votes: [],
        rating: "",
        maxRating: "",
        error: "",
        voteError: "",
        loading: false,
    },
    reducers: {
        setEventId: (state, action) => {
            state.eventId = action.payload;
        },
    },
    extraReducers: (builder) => {

        builder
            .addCase(postComment.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comment = action.payload;
            })
            .addCase(postComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getCommentsOnEvent.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getCommentsOnEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getCommentsOnEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(editComment.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(editComment.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action", action);
                const {
                    arg: { editData },
                } = action.meta;
                if (editData.commentId) {
                    state.comments = state.comments.map((item) =>
                        item._id === editData.commentId ? action.payload : item
                    );
                }
            })
            .addCase(editComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(deleteComment.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;
                console.log("action", action);
                const {
                    arg: { commentId },
                } = action.meta;
                if (commentId) {
                    state.comments = state.comments.filter((item) => item._id !== commentId);
                }
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(sendVote.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(sendVote.fulfilled, (state, action) => {
                state.loading = false;
                state.vote = action.payload;
            })
            .addCase(sendVote.rejected, (state, action) => {
                state.loading = false;
                state.voteError = action.payload.message;
            })
            .addCase(getAllVotes.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAllVotes.fulfilled, (state, action) => {
                state.loading = false;
                state.votes = action.payload;
            })
            .addCase(getAllVotes.rejected, (state, action) => {
                state.loading = false;
                state.voteError = action.payload.message;
            })
            .addCase(sendRating.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(sendRating.fulfilled, (state, action) => {
                state.loading = false;
                state.rating = action.payload;
            })
            .addCase(sendRating.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(getRatingOnEvent.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getRatingOnEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.maxRating = ratingDesc.find((item) => item.rating == action.payload).desc;
            })
            .addCase(getRatingOnEvent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })

    },
});

export const { setEventId } = postsSlice.actions;
export default postsSlice.reducer;
