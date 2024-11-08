import {fetchUserData, fetchUserError, loadingUserFetch} from "../redux/slices/userSlice";
import {storeToken} from "./token/manage_token";


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
            console.log(data);
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
