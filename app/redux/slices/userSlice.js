import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userId:"",
    name:"",
    lastname:"",
    username:"",
    email:"",
    posts: {},
    role: "",
    token: "",
    followed: {},
    following: {},
    profilePic: {},
    loading:false,
    error:false,
}

export const userSlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        loadingUserFetch : (state, action) => {
            state.loading = true;
        },
        fetchUserData : (state, action) => {
            state.loading = false;
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
            state.posts = action.payload.posts;
            state.role = action.payload.role;
            state.token = action.payload.access_token;
            state.followed = action.payload.followed;
            state.following = action.payload.following;
            state.profilePic = action.payload.profilePic;
            state.userId = action.payload.userId;

        },
        fetchUserError : (state, action) => {
            state.loading = false;
            state.error = true;
        },
        clearData:(state, action) => {
            state.userId = "";
            state.name = "";
            state.lastname = "";
            state.username = "";
            state.email = "";
            state.posts = {};
            state.role = "";
            state.followed = {};
            state.following = {};
            state.profilePic = "";
            state.token = null;

        }
    }
})

export const {
    loadingUserFetch,
    fetchUserData,
    fetchUserError,
    clearData,
} = userSlice.actions;
