// redux = bibliothèque pour réact
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user.slice";
import postReducer from "../features/post.slice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer,
    }
})