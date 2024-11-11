import {fetchUserData, fetchUserError, loadingUserFetch} from "../redux/slices/userSlice";
import {storeToken} from "./token/manage_token";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const fetch_login = async (dispatch, auth) => {
    try{
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: auth.email,
                password: auth.password,
            })
        }
        dispatch(loadingUserFetch());
        const response = await fetch("http://10.0.2.2:8080/api/v1/auth/authenticate", options);
        if(response.ok){
            const data = await response.json();
            console.log("LOGIN:",data);
            dispatch(fetchUserData(data));
            return data;
        } else {
            const errorData = await response.json();
            dispatch(fetchUserError());
            alert('Login failed:', errorData);
            return null;
        }

    }
    catch(error){
        alert(error);
        dispatch(fetchUserError());
        console.error('Login failed:', error);
        return null;
    }
}


export const fetch_add_follow_followers = async (dispatch, data,token) => {
    alert(token)
    const options = {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " +  token
        }
    }

    const response = await fetch(`http://10.0.2.2:8080/api/v1/follow/${data.followerId}/follow/${data.followedId}`, options);
    if(response.ok){
        return await response.json();

    } else{
        const errorData = await response.json();
        console.log(errorData);
    }
}


export const unfollow = async (dispatch, followerId,followedId) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
        method: 'DELETE',
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " +  token
        }
    }

    const response = await fetch(`http://10.0.2.2:8080/api/v1/follow/${data.followerId}/unfollow/${data.followedId}`, options);
    if(response.ok){
        return await response.json();

    } else{
        const errorData = await response.json();
        console.log(errorData);
    }
}
