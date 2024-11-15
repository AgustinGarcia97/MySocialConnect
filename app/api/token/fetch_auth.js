export const fetch_register = async (data,dispatch) => {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        }
        const response = await fetch("http://socialconnectserver-env-2.eba-39bs2mf3.us-east-1.elasticbeanstalk.com/api/v1/auth/register", options);
        if(response.ok){
            console.log(await response.json());
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
