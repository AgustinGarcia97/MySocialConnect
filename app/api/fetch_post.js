import {
    addPosts, deletePost,
    fetchPostFailure,
    fetchPostsSuccess,
    fetchPostStart,
    fetchStartComment
} from "../redux/slices/postSlice";
import data from "../components/feed_components/post_components/carousel/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from '@env';
import messaging from "@react-native-firebase/messaging";
export const fetch_posts =  async (dispatch,pageNumber,pageSize) => {
    try{
        const options = {
            method: 'GET',
            contentType: 'application/json',
        }

        dispatch(fetchPostStart());
        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/api/v1/posts/fetch?page=${pageNumber}&size=${3}`,options);
        if(response.ok){

            const data = await response.json();
            dispatch(fetchPostsSuccess(data));
            return data;

        } else {
            const errorData = await data.json();
            dispatch(fetchPostFailure());
            return errorData;

        }
    } catch(error){
        console.log(error);
        dispatch(fetchPostFailure());

    }
}

export const fetch_post = async (postId,dispatch) => {

    try{
        const token = await AsyncStorage.getItem('userToken');
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token,
            },
        }
        dispatch(fetchPostStart());
        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/api/v1/posts/${postId}`,options);

        if(response.ok){
            const data = await response.json();
            return {
                postId: data.postId,
                title: data.title,
                description: data.description,
                photoList: data.photoList,
                comments: data.comments,
                tagged: data.tagged,
                user: data.user,
            };
        } else {
            console.log("Error en la solicitud: ", response.statusText);
        }
    } catch (error) {
        console.error("Error en la solicitud catch:", error);
    }

}

export const fetch_comments = async (dispatch,postId,) => {

    try{
        const token = await AsyncStorage.getItem('userToken');
        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token,
            },
        }
        dispatch(fetchStartComment());

        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/api/v1/comments/post/${postId}`,options);
        if(response.ok){
            return await response.json();
        }
        else {
            const errorData = await response.json();
            console.log(errorData);
            return null;
        }

    }
     catch(error){
        console.log(error);
     }
}

export const fetchCreateComment = async (dispatch,data) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        dispatch(fetchPostStart());

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token,
            },
            body: JSON.stringify(data),
        };


        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/api/v1/comments/create`, options);

        if (response.ok) {
            const data = await response.json();

            return {
                commentId: data.commentId,
                comment: data.comment,
                user: data.user,
                likes: data.likes
            };
        } else {
            console.log("Error en la solicitud: ", response.statusText);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

export const fetchCreatePost =  async (data,dispatch) => {
    try{
        const token = await AsyncStorage.getItem('userToken');
        const device = await messaging().getToken();
        console.log('BODY: '+JSON.stringify(data));
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token,
            },
            body: JSON.stringify(data),
        }

        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/api/v1/posts/create?device=${device}`, options);
        if (response.ok) {

            const r = await response.json();

            const newPost = {
                postId: r.postId,
                title: r.title,
                description: data.description,
                photoList: r.photoList,
                user:{
                    name: r.user.name,
                    userId: r.user.userId,
                    lastname: r.user.lastname,
                    nickname:r.user.nickname
                },
                location: r.location,

                likes: r.likes,
                comments: r.comments,
                tagged: r.tagged,
            }
            alert("New Post:"+ JSON.stringify(newPost));
            dispatch(addPosts(newPost));

        }else{
            alert("Error en la solicitud: ",  data.statusText);
        }

    }
    catch(error){
        console.log(error);
    }
}

export const fetchLikeComment = async (request) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const device = await messaging().getToken();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token,
            },
            body: JSON.stringify(request),
        };

        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/like/create?device=${device}`, options);
        if (response.ok) {
            const data = await response.json();

            return {

                userId: data.user.userId,
                likeId: data.likeId,
                commentId: request.commentId,
            };
        } else {
            console.log("Error en la solicitud: ", response.statusText);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}

export const dislike = async (likeId,commentId,dispatch) => {
    try{
        const token = await AsyncStorage.getItem('userToken');
        const options = {
            method:'DELETE',
            headers:{
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' +  token,
            }
        }

        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/like/${likeId}/${commentId}`, options);
        if(response.ok()){
            return await response.json();
        }
        else{
            console.log("Error en la solicitud: ", response.statusText);
        }
        return null;
    } catch(error){
        console.log("Error en la solicitud: ", error);
    }
}


export const dislike_post = async (postId,userId,dispatch) => {
    try{
        const token = await AsyncStorage.getItem('userToken');
        const options = {
            method: 'DELETE',
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " +  token
            },
            body: {
                postId: postId,
            },
        }
        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/like/${postId}/user/${userId}`, options);
        if (response.ok()){
            return await response.json();
        }
        else{
            console.log("Error en la solicitud: ",response.statusText);
        }
    }
    catch(error){
        console.log(error)
    }

}


export async function searchUsers(searchUser) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: searchUser.username,
        }),
    }

    const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/users/user`,options );

    if (!response.ok) {
        throw new Error("Error en la búsqueda de usuarios"+ response.error);
    }
    const data = await response.json();
    console.log("FETCHED DEL BACK ",data)
    return data;
}

export const fetchDeletePost = async (postId,dispatch) => {
    const token = await AsyncStorage.getItem('userToken');
    const options = {
        method: "DELETE",
        headers:{
            "Content-Type": "application/json",
            "Authorization": "Bearer " +  token
        }

    }

    try{
        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/api/v1/posts/${postId}`, options);
        if(response.ok){
            alert("Post borrado exitosamente");
            dispatch(deletePost(postId))
            return true;
        } else {
            alert("Error al borrar el post: "+ response.error);
            return false;
        }


    }
    catch(error){
        console.log("Hubo un error al borrar el post: ",error);
    }
}

export const fetch_taggedPost = async (userId) => {
    try{
        const token = await AsyncStorage.getItem('userToken');
        const options = {
            method: "GET",
            headers:{
                "Content-Type": "application/json",

            }
        }
        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/api/v1/posts/tag/${userId}`, options);
        if(response.ok){
            return await response.json();
        }
        else{
            console.log("Error al traer los post:", await response.error)
        }
    }
    catch(error){
        console.log("Error en la solicitud: ", error);
    }
}

export const fetch_likedPost = async (userId) => {
    try{
        const token = await AsyncStorage.getItem('userToken');
        const options = {
            method: "GET",
            headers:{
                "Content-Type": "application/json",

            }
        }

        const response = await fetch(`http://socialconnectserver-env-final.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/api/v1/posts/like/${userId}`,options);
        if(response.ok){
            return await response.json();
        }
        else{
            console.log("Error al traer los post:", response.statusText);
        }

    }
    catch(error){
        console.log("Error en la solicitud: ", error);
    }
}
