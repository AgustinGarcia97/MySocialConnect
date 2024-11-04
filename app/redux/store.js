import { configureStore } from '@reduxjs/toolkit';
import {modalSlice} from "./slices/modalSlice";
import {registerSlice} from "./slices/registerSlice";
import {createPostSlice} from "./slices/createPostSlice";


const store = configureStore({
    reducer:{
        modal: modalSlice.reducer,
        register: registerSlice.reducer,
        createPost: createPostSlice.reducer,
    },
});

export default store;
