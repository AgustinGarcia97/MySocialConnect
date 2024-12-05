import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userId:"",
    name:"",
    lastname:"",
    username:"",
    email:"",
    posts: [],
    role: "",
    token: "",
    followers: [],
    following: [],
    profilePic: {},
    loading:false,
    error:false,
    searched: {},
    bio: "",
    notifications: [],
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
            state.username = action.payload.nickname;
            state.bio = action.payload.biography;
            state.name = action.payload.name;
            state.lastname = action.payload.lastname;
            state.email = action.payload.username;
            state.posts = action.payload.posts;
            state.role = action.payload.role;
            state.token = action.payload.access_token;
            state.followers = action.payload.followers;
            state.following = action.payload.following;
            state.profilePic = action.payload.profilePicture;
            state.userId = action.payload.userId;
            state.searched = [];
        },
        fetchNotifications: (state, action) => {
            state.notifications = action.payload;
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
            state.posts = [];
            state.role = "";
            state.followers = [];
            state.following = [];
            state.profilePic = "";
            state.notifications = [];
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
            state.nickname = action.payload;
        },
        updateProfilePic: (state, action) => {
            state.profilePic = action.payload;
        },
        updateBio:(state,action) => {
            state.bio = action.payload;
        },

        addFollowingUser: (state, action) => {
            const isAlreadyFollowing = state.following.some(
                (user) => user.username === action.payload.username
            );

            if (!isAlreadyFollowing) {

                state.following = state.following.concat(action.payload);

                alert(JSON.stringify(state.following));
            } else {
                console.warn(`User ${action.payload.username} is already being followed.`);
            }
        },
        removeFollowingUser:(state,action) => {

            state.following = state.following.filter((f) => f.userId !== action.payload);

            alert(JSON.stringify(state.following))
        },

        addPostsToUserList:(state,action) => {
            state.posts = [...state.posts, action.payload];
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
    removeFollowingUser,
    addFollowingUser,
    addPostsToUserList,
    fetchNotifications
} = userSlice.actions;
