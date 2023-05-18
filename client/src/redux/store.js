import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import PostReducer from "./features/postsSlice";

const store = configureStore({
    reducer: {
        auth: AuthReducer,
        posts: PostReducer,
    }
});

export default store;
