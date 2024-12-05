import { configureStore } from '@reduxjs/toolkit';
import {modalSlice} from "./slices/modalSlice";
import {registerSlice} from "./slices/registerSlice";
import {createPostSlice} from "./slices/createPostSlice";
import {userSlice} from "./slices/userSlice";
import {postsSlice} from "./slices/postSlice";
import {loginSlice} from "./slices/loginSlice";
import {searchedSlice} from "./slices/searchedSlice";
import {combineReducers} from "redux";
import {persistReducer, persistStore} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'session',
    storage: AsyncStorage,
    whiteList: ['user','posts','login'],

}

const rootReducer = combineReducers({
    modal: modalSlice.reducer,
    register: registerSlice.reducer,
    createPost: createPostSlice.reducer,
    user: userSlice.reducer,
    posts: postsSlice.reducer,
    login: loginSlice.reducer,
    searched: searchedSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig,rootReducer);


 const store = configureStore({
    reducer: persistedReducer,
});


 const persistor = persistStore(store)

export { store, persistor };


