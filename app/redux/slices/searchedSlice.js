import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    searchedUser:{},
}


export const searchedSlice = createSlice({
    name: "searched",
    initialState,
    reducers:{
        setSearched: (state, action) => {

            state.searchedUser = action.payload;
        }

    }
})
export const {
    setSearched,
} = searchedSlice.actions;
