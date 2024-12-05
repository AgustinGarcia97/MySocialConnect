import {API_BASE_URL} from '@env';

export const fetch_register = async (data,dispatch) => {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        }

        const response = await fetch(`${process.env.API_BASE_URL}/api/v1/auth/register`, options);
        if(response.ok){
            return await response.json();
        }
        else{
            alert(response.error)
        }
    } catch(error){
        console.log("Error al registrarse:",error)
        alert(error)
    }

}
