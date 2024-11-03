import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    open:false,
    openPostModal:false,
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

        },

        openPostModal: (state) => {
            state.openPostModal = true;


        },

        closePostModal: (state) => {
            state.openPostModal = false;
        }
    },
});

export const {
    openCommentModal,
    closeCommentModal,
    openPostModal,
    closePostModal,
} = modalSlice.actions;
