import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email:"",
    password:"",
}

export const loginSlice = createSlice({
    initialState,
    name:'login',
    reducers:{
        login: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        logout: (state, action) => {
            state.email = "";
            state.password = "";
        }
    }
})

export const {
    login,
    logout,
} = loginSlice.actions;
