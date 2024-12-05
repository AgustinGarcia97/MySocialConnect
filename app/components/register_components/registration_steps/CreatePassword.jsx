import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Image, TouchableOpacity, View} from "react-native";

import {Text, TextInput} from "react-native-paper";
import {createAccountStyle, register_style} from "../../../assets/styles/register/register_style";
import {fetch_login} from "../../../api/fetch_user_data";
import {setPasswordSlice} from "../../../redux/slices/registerSlice";
import {fetch_register} from "../../../api/token/fetch_auth";
import messaging from "@react-native-firebase/messaging";


const input_list = [
    {
        label:'Contraseña',
    },
    {
        label:'Ingresa nuevamente la contraseña',
    },

]

export const CreatePassword = ({navigation}) => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const name = useSelector((state) => state.register.name);
    const lastname = useSelector((state) => state.register.lastname);
    const username = useSelector((state) => state.register.username);
    const email = useSelector((state) => state.register.email);
    const profilePicture = useSelector((state) => state.register.profilePicture);
    const biography = useSelector((state) => state.register.biography);
    const nickname = useSelector((state) => state.register.nickname);
    const dispatch = useDispatch();
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    useEffect(() => {
        console.log("Name:", name);
        console.log("Lastname:", lastname);
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);
        console.log("Profile Picture URL:", profilePicture);

    }, [name, lastname, username, email, password, profilePicture]);

    const validatePassword = (password) => {

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
        return passwordRegex.test(password);
    };

    const handleTextChange = (e, label) => {

        switch (label){
            case 'Contraseña':
                setPassword(e);
                if (!validatePassword(e)) {
                    setPasswordError("La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una minúscula y un número.");
                } else {
                    setPasswordError("");
                }
                break;
            case 'Ingresa nuevamente la contraseña':
                setConfirmPassword(e)
                if (e !== password) {
                    setConfirmPasswordError("Las contraseñas no coinciden.");
                } else {
                    setConfirmPasswordError("");
                }
                break;
            default:
                alert(label);
        }
    }

    const handleRegister =  async () => {

        if (!validatePassword(password)) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres, una letra mayúscula, una minúscula y un número.");
            alert("La contraseña no cumple la regla")
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Las contraseñas no coinciden.");
            alert("Las contraseñas no coinciden")
            return;
        }



        const notificationToken = await messaging().getToken();
        if (password === confirmPassword){
            dispatch(setPasswordSlice(password));
            const data = {
                name,
                lastname,
                password,
                profilePicture,
                username,
                nickname,
                biography,
                role:"USER",
                notificationToken,

            }
            const flag = fetch_register(data,dispatch)
            if(flag){
                alert("Ya sos parte de Social Connect! Inicia sesión")

                navigation.navigate("Login");
            } else{
                alert("Hubo un error a la hora de crear tu cuenta, volve a intentar.")
            }
            setPassword("");
            setConfirmPassword("");
        } else {
            alert("Las contraseñas deben coincidir")
        }

    }
    return(
        <View style={{...createAccountStyle.create_account_container}}>
            <View style={{...createAccountStyle.logo_title_container}}>
                <View style={{...register_style.register_logo_container}}>
                    <Image source={require('../../../assets/logos/logo.png')}
                           style={{...register_style.logo,height:150,width:150,marginTop:20,}} resizeMode="cover"
                    ></Image>

                </View>
                <Text style={{...createAccountStyle.logo_title}}>Crea tu cuenta</Text>
                <Text style={{...createAccountStyle.subtitle}}>Crea una contraseña que tenga al menos 6 caracteres</Text>
            </View>
            <View style={{...createAccountStyle.inputs_texts_container}}>
                {
                    input_list.map((item, index) => (
                        <View key={index} style={{...createAccountStyle.input_text_container}}>
                            <TextInput
                                secureTextEntry
                                right={<TextInput.Icon icon="eye" />}
                                label={item.label}
                                style={{...createAccountStyle.text_input}}
                                value={
                                    item.label === 'Contraseña' ? password : confirmPassword

                                }

                                onChangeText={(value) => handleTextChange(value, item.label)}
                                error={
                                    (item.label === 'Contraseña' && passwordError !== "") ||
                                    (item.label === 'Ingresa nuevamente la contraseña' && confirmPasswordError !== "")
                                }
                            />
                            {item.label === 'Contraseña' && passwordError !== "" && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{passwordError}</Text>
                            )}
                            {item.label === 'Ingresa nuevamente la contraseña' && confirmPasswordError !== "" && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{confirmPasswordError}</Text>
                            )}
                        </View>
                    ))
                }
            </View>
            <View style={{...createAccountStyle.next_button_container,  marginVertical: 185,}}>
                <View style={{...createAccountStyle.terms_conditions_container}}>
                    <Text style={{...createAccountStyle.terms_conditions}}>Al registrarse, aceptas los</Text>
                    <TouchableOpacity><Text style={{...createAccountStyle.terms_conditions, textDecorationLine:'underline',marginRight:3,marginLeft:4,}}>Terminos de Servicio</Text></TouchableOpacity>
                    <Text style={{...createAccountStyle.terms_conditions}}>y la </Text>
                    <TouchableOpacity><Text style={{...createAccountStyle.terms_conditions, textDecorationLine:'underline'}}>Politica de Privacidad</Text></TouchableOpacity>
                    <Text style={{...createAccountStyle.terms_conditions}}>, incluida la politica del</Text>
                    <TouchableOpacity><Text style={{...createAccountStyle.terms_conditions, textDecorationLine:'underline'}}>Uso de Cookies</Text></TouchableOpacity>

                </View>

                <TouchableOpacity onPress={() => handleRegister(navigation.navigate)}>
                    <View style={{...createAccountStyle.next_button,backgroundColor:'#475a7e'}}>
                        <Text style={{...createAccountStyle.text_button,fontSize:20}}>Registrarse</Text>
                    </View>
                </TouchableOpacity>
                <View style={{...register_style.existing_account_container,height:40,
                    padding:5,margin:5}}>
                    <Text style={{...register_style.simple_text}}>Ya tenes una cuenta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text  style={{...register_style.pressable_text}}>Inicia sesion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
