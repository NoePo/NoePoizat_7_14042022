import { createSlice } from "@reduxjs/toolkit";

// Tout ce qui est nécessaire pour le post (like, modifier, supprimer...)
export const postSlice = createSlice({
    name: "post",
    initialState: {
        getPostsValue: null,
        getLikesValue: null,
    },
    reducers: {
        getPosts: (state, action) => {
            state.getPostsValue = action.payload;
        },
        getLikes: (state, action) => {
            state.getLikesValue = action.payload;
        },
        addLike: (state, action) => {
            state.getLikesValue.push(action.payload);
        },
        removeLike: (state, action) => {
            state.getLikesValue = state.getLikesValue.filter(element => element.id !== action.payload);
        },
        editPost: (state, action) => {
            const postToEdit = state.getPostsValue.find(post => post.id === action.payload.postID);
            postToEdit.message = action.payload.textUpdate;
        },
        deletePost: (state, action) => {
            state.getPostsValue = state.getPostsValue.filter(element => element.id !== action.payload);
        }
    }
});

export const { getPosts, getLikes, addLike, removeLike, editPost, deletePost } = postSlice.actions;
export default postSlice.reducer;