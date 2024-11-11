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
                console.log( "COMMENT:::::",comment);
                if (userLiked) {
                    comment.likes = comment.likes.filter(like => like.user.userId !== userId);
                    return true;
                } else {
                    comment.likes = [
                        ...comment.likes,  // Mantener los likes existentes
                        { likeId, userId, commentId } // Agregar el nuevo like
                    ];
                    return false;
                }
            }
            else{
                alert(3);
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
            alert(1);
        },
        addLocation: (state, action) => {
            state.location = action.payload.location;
        },

        addPosts: (state, action) => {
            state.posts = [...state.posts,action.payload.post];

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
    fetchCommentsSuccess,
    fetchStartCommentFailure
} = postsSlice.actions;
