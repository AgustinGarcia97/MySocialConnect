import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import {stringify} from "uuid";
import {removeTag} from "./createPostSlice";

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
    taggedPeople:[],
    newPost:{},

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

            state.title = "";
            state.description = "";
            state.photos = [];
            state.location = "";
            state.taggedPeople = [];

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
            const newComment = action.payload;


                state.actualPost = {
                    ...state.actualPost,
                    comments: [...state.actualPost.comments, newComment]
                };
                console.log("ADD COMMENT:", state.actualPost.comments);


        },
        updateCommentLikes: (state, action) => {
            const {commentId, userId,likeId} = action.payload;

            const comment = state.actualPost.comments.find(c => c.commentId === commentId);
            if (comment) {

                const userLiked = comment.likes.some(like => like.user.userId === userId);
                console.log( "COMMENT:",comment);
                if (userLiked) {
                    comment.likes = comment.likes.filter(like => like.user.userId !== userId);
                    return true;
                } else {
                    comment.likes = [
                        ...comment.likes,
                        { likeId, userId, commentId }
                    ];
                    return false;
                }
            }
            else{

            }
            console.log(state.actualPost.comments.likes);
        },
        createPost: (state, action) => {
            state.title = action.payload.title;
            state.location = action.payload.location;
            state.userId = action.payload.userId;

        },
        addDescription: (state, action) => {
            state.description = action.payload;
        },
        addTitle:  (state, action) =>{
            state.title += action.payload;
        },

        addPhotos: (state, action) => {
            state.photos = [...state.photos, action.payload];
        },
        addLocation: (state, action) => {
            state.location = action.payload.location;
        },

        addTag: (state, action) => {
                const userId = action.payload;
                if (state.taggedPeople.includes(userId)) {
                    state.taggedPeople = state.taggedPeople.filter((tag) => tag !== userId);
                } else {
                    state.taggedPeople = [...state.taggedPeople, userId];
                }
        },
        removeTag: (state, action) => {

        },
        addPosts: (state, action) => {
            state.posts = [...state.posts, action.payload];
            alert("Nuevo post agregado:"+state.posts.posts);

        },
        fetchStartComment:(state,action) => {
            state.loading = true;
        },
        fetchCommentsSuccess:(state, action) => {
            state.comment_actualPost = action.payload.comments;
        },
        fetchStartCommentFailure:(state, action) => {
            state.loading = true;
            state.error = true;
        },
        clearDataNewPost:(state) => {

        },
        deletePost:(state,action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);

        },
        deleteLocation:(state, action) => {
            state.location = '';
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
    addPosts,
    fetchStartComment,
    addTag,
    fetchCommentsSuccess,
    fetchStartCommentFailure,
    deleteLocation,
    deletePost
} = postsSlice.actions;
