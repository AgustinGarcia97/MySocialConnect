import { configureStore } from '@reduxjs/toolkit';
import {modalSlice} from "./slices/modalSlice";
import {registerSlice} from "./slices/registerSlice";


const store = configureStore({
    reducer:{
        modal: modalSlice.reducer,
        register: registerSlice.reducer,
    },
});

export default store;
