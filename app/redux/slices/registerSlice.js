import {createSlice} from "@reduxjs/toolkit";
import {modalSlice} from "./modalSlice";

const initialState = {
    name:"",
    email:"",
    phone_number:"",
    password:"",
    birthdate:"",
}

export const registerSlice = createSlice({
    name:'register',
    initialState,
    reducers:{
        setNameSlice: (state, action) => {
            state.name = action.payload.name;

        },
        setEmailSlice: (state, action) => {
            state.email = action.payload.email;
        },
        setPhoneNumberSlice: (state, action) => {
            state.phone_number = action.payload.phone_number;
        },
        setPasswordSlice: (state, action) => {
            state.password = action.payload.password;
        },
        setBirthdateSlice: (state, action) => {
            state.birthdate = action.payload.birthdate;
        },
        deleteDataSlice:(state, action) => {
            state.name = "";
            state.email = "";
            state.phone_number = "";
            state.password = "";
        }
    }


});
export const {
    setNameSlice,
    setEmailSlice,
    setPhoneNumberSlice,
    setPasswordSlice,
    setBirthdateSlice,
    deleteDataSlice,
} = registerSlice.actions;

