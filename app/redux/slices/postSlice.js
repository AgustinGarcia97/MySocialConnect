import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {stringify} from "uuid";

const initialState = {
    loading: false,
    error:false,
    posts: [],
    actualPost:[],
    comment_actualPost: {},
    likes_actualPost: {},
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        fetchPostStart:(state, action) => {
            state.loading = true;
        },
        fetchPostsSuccess:(state, action) => {
            state.loading = false;
            state.posts = [
                ...state.posts,
                ...action.payload.filter(newPost =>
                    !state.posts.some(existingPost => existingPost.postId === newPost.postId)
                )
            ];

        },
        fetchPostFailure:(state, action) => {
            state.loading = false;
            state.error = true;
        },
        setActualPost: (state, action) =>{
            state.actualPost = action.payload;
            state.comment_actualPost = action.payload.comments;

        },
        addComment: (state, action) => {
            // Crea una nueva referencia de `actualPost` con el comentario añadido
                state.actualPost = {
                ...state.actualPost,
                comments: [...state.actualPost.comments, action.payload] // Cambiar la referencia de comments
            }},
        updateCommentLikes: (state, action) => {
            const {commentId, userId} = action.payload;

            // Encuentra el comentario por ID
            const comment = state.actualPost.comments.find(c => c.commentId === commentId);
            if (comment) {
                // Si el usuario ya ha dado like, elimina el like
                if (comment.likes.includes(userId)) {
                    comment.likes = comment.likes.filter(id => id !== userId);
                } else {
                    // Si no ha dado like, añade el like
                    comment.likes.push(userId);
                }
            }
        }

    }
})

export const {
    fetchPostStart,
    fetchPostsSuccess,
    fetchPostFailure,
    setActualPost,
    addComment,
    updateCommentLikes
} = postsSlice.actions;
