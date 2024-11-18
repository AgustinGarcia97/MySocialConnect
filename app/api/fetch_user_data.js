import {fetchUserData, fetchUserError, loadingUserFetch} from "../redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {API_BASE_URL} from '@env';

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

        const response = await fetch(`${API_BASE_URL}/api/v1/auth/authenticate`, options);
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


export const fetch_add_follow_followers = async ( data,token) => {

    const options = {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " +  token
        }
    }


    const response = await fetch(`${API_BASE_URL}/api/v1/follow/${data.followerId}/follow/${data.followedId}`, options);
    if(response.ok){
        return await response.json();

    } else{
        const errorData = await response.json();
        console.log(errorData);
    }
}


export const unfollow = async (data) => {
    const token = await AsyncStorage.getItem('userToken');
    const followerId = data.followerId;
    const followedId = data.followedId;

    if (!token) {
        console.error('User token not found');
        alert('User not authenticated');
        return;
    }

    if (!data.followerId || !data.followedId) {
        console.error('Invalid IDs:', data.followerId, data.followedId);
        alert('Invalid follower or followed ID. Please check.');
        return;
    }

    const options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    };

    const url = `${API_BASE_URL}/api/v1/follow/${followerId}/unfollow/${followedId}`;

    try {
        const response = await fetch(url, options);

        if (response.ok) {
            return await response.json();
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
            alert('An error occurred while trying to unfollow.');
            return null;
        }
    } catch (error) {
        console.error('Request failed:', error);
        alert('An error occurred while making the request.');
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
        const response = await fetch(`${API_BASE_URL}/api/v1/posts/follows?userId=${userId}&page=${page}&size=${10}`,options);
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
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, options);
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
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, options);
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
