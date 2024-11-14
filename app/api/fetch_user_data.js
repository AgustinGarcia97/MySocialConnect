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

export const fetch_following_posts = async (dispatch,userId,page,size) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  token
        }
    }
    try{
        const response = await fetch(`http://10.0.2.2:8080/api/v1/posts/follows?userId=${userId}&page=${page}&size=${10}`,options);
        if(response.ok){
            return await response.json();
        } else{
            const errorData = await response.json();
            console.log("Error:",errorData);
        }
    }
    catch(error){
        console.log("Error al traer post de followers:",error)
    }

}

export const fetch_update_user = async(data,userId) => {
    try{
        const token =  await AsyncStorage.getItem('userToken');
        const options = {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token,
            },
            body: JSON.stringify(data)

        }
        const response = await fetch(`http://10.0.2.2:8080/users/${userId}`, options);
        if(response.ok){
            alert("Usuario actualizado correctamente")
        }
        else{
            alert('No se puedo actualizar el usuario')
        }
    }
    catch(error){
        console.log("Error:",error);
        }

    }

    export const fetch_delete_account = async(userId) => {
        try{
            alert(userId);
            const token = await AsyncStorage.getItem('userToken');
            const options = {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' +  token
                },
            }
            const response = await fetch(`http://10.0.2.2:8080/users/${userId}`, options);
            if(response.ok){
                return true;
            } else{
                console.log("Error en la solicitud: ", await response.error);
                return false;
            }

        }
        catch(error){
            console.log("Error en la solicitud", error)
        }
}
