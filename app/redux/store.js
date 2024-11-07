import { configureStore } from '@reduxjs/toolkit';
import {modalSlice} from "./slices/modalSlice";
import {registerSlice} from "./slices/registerSlice";
import {createPostSlice} from "./slices/createPostSlice";
import {userSlice} from "./slices/userSlice";
import {postsSlice} from "./slices/postSlice";
import {loginSlice} from "./slices/loginSlice";



const store = configureStore({
    reducer:{
        modal: modalSlice.reducer,
        register: registerSlice.reducer,
        createPost: createPostSlice.reducer,
        user: userSlice.reducer,
        posts: postsSlice.reducer,
        login: loginSlice.reducer,
    },
});

export default store;
