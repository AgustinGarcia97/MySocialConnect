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
        return  response.ok() === true;
    } catch(error){
        console.log("Error al registrarse:",error)
    }

}
