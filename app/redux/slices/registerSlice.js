import {createSlice} from "@reduxjs/toolkit";
import {modalSlice} from "./modalSlice";

const initialState = {
    name:"",
    lastname:"",
    username:"",
    email:"",
    password:"",
    profilePicture:"",
    biography:"",
    nickname:"",
}

export const registerSlice = createSlice({
    name:'register',
    initialState,
    reducers:{
        setNameSlice: (state, action) => {
            state.name = action.payload;
        },
        setLastNameSlice: (state, action) => {
            state.lastname = action.payload;
        },
        setEmailSlice: (state, action) => {
            state.email = action.payload;
        },
        setUsernameSlice: (state, action) => {
            state.username = action.payload;
        },
        setProfilePicSlice: (state, action) => {
            state.profilePicture = action.payload;
        },
        setPasswordSlice: (state, action) => {
            state.password = action.payload;
        },
        setBioSlice: (state, action) => {
            state.biography = action.payload;
        },
        setNicknameSlice: (state, action) => {
            state.nickname = action.payload;
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
    setProfilePicSlice,
    setPasswordSlice,
    setLastNameSlice,
    setBioSlice,
    deleteDataSlice,
    setNicknameSlice,
    setUsernameSlice
} = registerSlice.actions;

