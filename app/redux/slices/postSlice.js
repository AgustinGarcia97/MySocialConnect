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
    title: "",
    description: "",
    photos: [],
    comments:[],
    location: "",
    userId:"",


}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{
        fetchPostStart:(state, action) => {
            state.loading = true;
        },
        fetchPostsSuccess:(state, action) => {
            console.log(action.payload);
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
            console.log("setActualPost", state.actualPost);
            state.comment_actualPost = action.payload.comments;

        },
        addComment: (state, action) => {

                state.actualPost = {
                ...state.actualPost,
                comments: [...state.actualPost.comments, action.payload]
            }
            console.log("ADD COMMENT:",state.actualPost.comments);
            },
        updateCommentLikes: (state, action) => {
            const {commentId, userId} = action.payload;


            const comment = state.actualPost.comments.find(c => c.commentId === commentId);
            if (comment) {

                if (comment.likes.includes(userId)) {
                    comment.likes = comment.likes.filter(id => id !== userId);
                } else {

                    comment.likes.push(userId);
                }
            }
        },
        createPost: (state, action) => {
            state.title = action.payload.title;

            state.location = action.payload.location;
            state.userId = action.payload.userId;

        },
        addDescription: (state, action) => {
            state.description += action.payload.description;
        },
        addTitle:  (state, action) =>{
            state.title += action.payload.title;
        },

        addPhotos: (state, action) => {
            alert(action.payload);
            state.images = [...state.images, action.payload];
        },
        addLocation: (state, action) => {
            state.location = action.payload.location;
        },

        addPosts: (state, action) => {
            state.posts = [...state.posts,action.payload.post];

        }



    }
})

export const {
    fetchPostStart,
    fetchPostsSuccess,
    fetchPostFailure,
    setActualPost,
    addComment,
    updateCommentLikes,
    createPost,
    addTitle,
    addPhotos,
    addDescription,
    addLocation,
    addPosts
} = postsSlice.actions;
