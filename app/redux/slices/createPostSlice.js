import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    loading: false,
    error: false,
    taggedPeople: [],
    location:"",
    photos:[],
    text:"",
}

export const createPostSlice = createSlice({
    name: "createPost",
    initialState,
    reducers:{
        setText: (state, action) => {
            state.text = action.payload.text;
        },
        setPhotos: (state, action) => {
            state.photos = state.photos.push(action.payload.photo);
        },
        removePhoto: (state, action) => {
            state.photos = state.photos.filter((photo) => photo !== action.payload);
        },
        addTag: (state, action) => {
            if (state.taggedPeople.includes(action.payload.userId)) {
                removeTag(state, action.payload);
            } else {

                state.taggedPeople = [...state.taggedPeople, action.payload.userId];
                alert(state.taggedPeople);
            }
        },
        removeTag: (state, action) => {
            state.taggedPeople = state.taggedPeople.filter((tag) => tag !== action.payload.userId);
        },
        addLocation: (state, action) => {
            state.location = action.payload.location;
            alert(action.payload.location);
        },
        removeLocation: (state, action) => {
            state.location = "";
            alert(state.location);
        },
        clearData: (state, action) => {
            state.text = "";
            state.photos = [];
            state.location = "";
            state.taggedPeople = [];
        }

    }
});

export const {
    setText,
    setPhotos,
    removePhoto,
    addTag,
    removeTag,
    addLocation,
    removeLocation,
    clearData
} = createPostSlice.actions;
