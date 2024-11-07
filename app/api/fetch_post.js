import {fetchPostFailure, fetchPostsSuccess, fetchPostStart, setActualPost} from "../redux/slices/postSlice";
import data from "../components/feed_components/post_components/carousel/data";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetch_posts =  async (dispatch) => {
    try{
        const options = {
            method: 'GET',
            contentType: 'application/json',
        }

        dispatch(fetchPostStart());
        const response = await fetch("http://10.0.2.2:8080/api/v1/posts/fetch",options);
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

export const fetch_post = async (dispatch) => {
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
        const response = await fetch("http://10.0.2.2:8080/post/{postId}",options);
        if(response.ok){
            const data = await response.json();
            dispatch(fetchPostsSuccess());
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
        console.error("Error en la solicitud:", error);
    }

}

export const fetchCreateComment = async (dispatch,data) => {
    try {
        const token = await AsyncStorage.getItem('userToken');

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token,
            },
            body: JSON.stringify(data),
        };

        const response = await fetch("http://10.0.2.2:8080/api/v1/comments/create", options);

        if (response.ok) {
            const data = await response.json();
            console.log("Comentario creado:", data);
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

export const fetchLikeComment = async (data) => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        alert(JSON.stringify(data));

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  token,
            },
            body: JSON.stringify(data),
        };

        const response = await fetch("http://10.0.2.2:8080/like/create", options);

        if (response.ok) {
            const data = await response.json();
            console.log("Like creado:", data);
            return {

                userId: data.user,
                likeId: data.likeId
            };
        } else {
            console.log("Error en la solicitud: ", response.statusText);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
}
