import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    open:false,
    openPostModal:false,
    openTagPeopleModal:false,
    openLocationModal:false,
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
        },

        openTagPeopleModal: (state) => {
            state.openTagPeopleModal = true;
        },
        closeTagPeopleModal: (state) => {
            state.openTagPeopleModal = false;
        },
        openLocationModal: (state) =>{
            state.openLocationModal = true;
        },
        closeLocationModal: (state) =>{
            state.openLocationModal = false;
        }

    },
});

export const {
    openCommentModal,
    closeCommentModal,
    openPostModal,
    closePostModal,
    openTagPeopleModal,
    closeTagPeopleModal,
    openLocationModal,
    closeLocationModal
} = modalSlice.actions;
