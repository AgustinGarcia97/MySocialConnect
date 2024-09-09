import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    open:false,
}

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{

        openCommentModal: (state) => {
            state.open = true;

        },
        closeCommentModal: (state) => {
            state.open = false;

        }
    },
});

export const {
    openCommentModal,
    closeCommentModal,
} = modalSlice.actions;
