import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    open:false,
    openPostModal:false,
    openTagPeopleModal:false,
    openLocationModal:false,
    openTaggedPeopleModal:false,
    openSearchBarModal:false
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
        },
        openTaggedPeopleModal: (state) => {
            state.openTaggedPeopleModal = true;
        },
        closeTaggedPeopleModal: (state) => {
            state.openTaggedPeopleModal = false;
        },
        openSearchBarModal: (state) => {
            state.openSearchBarModal = true;
        },
        closeSearchBarModal: (state) => {
            state.openSearchBarModal = false;
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
    closeLocationModal,
    openTaggedPeopleModal,
    closeTaggedPeopleModal,
    openSearchBarModal,
    closeSearchBarModal

} = modalSlice.actions;
