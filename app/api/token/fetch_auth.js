export const fetch_register = async (data,dispatch) => {
    try{
        const options = {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',

            },
            body: JSON.stringify(data)
        }
        const response = await fetch("http://10.0.2.2:8080/api/v1/auth/register", options);
        return  response.ok() === true;
    } catch(error){
        console.log("Error al registrarse:",error)
    }

}
