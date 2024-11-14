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
    searched: {},
    bio: "",
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
            state.bio = action.payload.bio;
            state.name = action.payload.name;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
            state.posts = action.payload.posts;
            state.role = action.payload.role;
            state.token = action.payload.access_token;
            state.followed = action.payload.followed;
            state.following = action.payload.following;
            state.profilePic = action.payload.profilePicture;
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

        },
        setSearched(state, action) {
            state.searched = action.payload;
        },
        updateName: (state, action) => {
            state.name = action.payload;
        },
        updateLastname: (state, action) => {
            state.lastname = action.payload;
        },
        updateUsername: (state, action) => {
            state.username = action.payload;
        },
        updateProfilePic: (state, action) => {
            state.profilePic = action.payload;
        },
        updateBio:(state,action) => {
            state.bio = action.payload;
        }
    }
})

export const {
    loadingUserFetch,
    fetchUserData,
    fetchUserError,
    clearData,
    setSearched,
    updateName,
    updateLastname,
    updateUsername,
    updateProfilePic,
    updateBio,
} = userSlice.actions;
