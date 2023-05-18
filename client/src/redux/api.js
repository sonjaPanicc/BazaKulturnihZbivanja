import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`;
    }
    return req;
});

export const login = (formData) => API.post("/users/login", formData);
export const register = (formData) => API.post("/users/register", formData);
export const getAllMembers = () => API.get("/users/members");

export const postComment = (commentData) => API.post("/posts", commentData);
export const editComment = (editData) => API.patch("/posts", editData);
export const deleteComment = (commentId) => API.delete("/posts", { data: { commentId } });
export const getCommentsOnEvent = (eventId) => API.get(`/posts/event/${eventId}/comments`);

export const sendVote = (eventId) => API.post("/votes/vote", eventId);
export const getAllVotes = () => API.get("/votes");

export const sendRating = (ratingData) => API.post(`/votes/rating`, ratingData);
export const getRatingOnEvent = (eventId) => API.get(`/votes/event/${eventId}/rating`);
