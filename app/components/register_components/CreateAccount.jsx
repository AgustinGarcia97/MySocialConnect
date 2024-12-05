import {Image, TouchableOpacity, View} from "react-native";
import {TextInput,Text} from "react-native-paper";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setBioSlice,
    setBirthdateSlice,
    setEmailSlice, setLastNameSlice,
    setNameSlice, setNicknameSlice,
    setPasswordSlice,
    setPhoneNumberSlice, setUsernameSlice
} from "../../redux/slices/registerSlice";
import {createAccountStyle, register_style} from "../../assets/styles/register/register_style";


const input_list = [

    {
        label:'Nombre',
    },
    {
        label:'Apellido',
    },
    {
        label:'Nickname',
    },
    {
        label:'Mail',
    },

]



export const CreateAccount = ({navigation}) => {
    const [name, setName] = useState("");

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [nickname,setNickname] = useState("");
    const [emailError, setEmailError] = useState("");
    const [nameError, setNameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [nicknameError, setNicknameError] = useState("");
    const dispatch = useDispatch();

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateName = (value) => {
        const nameRegex = /^[A-Za-z]{3,16}$/;
        return nameRegex.test(value);
    };

    const handleTextChange = (e, label) => {

        switch (label){
            case 'Nombre':
                setName(e);
                dispatch(setNameSlice(e));
                if (!validateName(e)) {
                    setNameError("El nombre debe tener entre 3 y 16 letras, sin números ni caracteres especiales.");
                } else {
                    setNameError("");
                }
                break;
            case 'Apellido':
                setLastname(e);
                dispatch(setLastNameSlice(e));
                if (!validateName(e)) {
                    setLastnameError("El apellido debe tener entre 3 y 16 letras, sin números ni caracteres especiales.");
                } else {
                    setLastnameError("");
                }
                break;
            case 'Mail':
                setEmail(e);
                dispatch(setUsernameSlice(e));
                if (!validateEmail(e)) {
                    setEmailError("Correo inválido. Ingresa un correo válido.");
                } else {
                    setEmailError("");
                }
                break;
            case 'Nickname':
               setNickname(e);
               dispatch(setNicknameSlice(e));
                if (!validateName(e)) {
                    setNicknameError("El nickname debe tener entre 3 y 16 letras, sin números ni caracteres especiales.");
                } else {
                    setNicknameError("");
                }
                break;
            default:
                alert(label);
        }
    }


    const handleNext = () => {
        if (!validateName(name)) {
            setNameError("El nombre debe tener entre 3 y 16 letras, sin números ni caracteres especiales.");
            alert("Corregí los cambios antes de avanzar");
            return;
        }

        if (!validateName(lastname)) {
            setLastnameError("El apellido debe tener entre 3 y 16 letras, sin números ni caracteres especiales.");
            alert("Corregí los cambios antes de avanzar");
            return;
        }

        if (!validateName(nickname)) {
            setNicknameError("El nickname debe tener entre 3 y 16 letras, sin números ni caracteres especiales.");
            alert("Corregí los cambios antes de avanzar");
            return;
        }

        if (!validateEmail(email)) {
            setEmailError("Correo inválido. Ingresa un correo válido.");
            alert("Corregí los cambios antes de avanzar");
            return;
        }

        setEmail("");
        setNickname("");
        setName("");
        setLastname("");

        navigation.navigate('ProfilePicBio');
    };




    return(
        <View style={{...createAccountStyle.create_account_container}}>
            <View style={{...createAccountStyle.logo_title_container}}>
                <View style={{...register_style.register_logo_container}}>
                    <Image source={require('../../assets/logos/logo.png')}
                           style={{...register_style.logo,height:150,width:150,marginTop:20,}} resizeMode="cover"
                    ></Image>

                </View>
                <Text style={{...createAccountStyle.logo_title}}>Crea tu cuenta</Text>
            </View>
            <View style={{...createAccountStyle.inputs_texts_container}}>
                {
                    input_list.map((item, index) => (
                        <View key={index} style={{...createAccountStyle.input_text_container}}>
                            <TextInput
                                label={item.label}
                                style={{...createAccountStyle.text_input}}
                                value={
                                    item.label === 'Nombre' ? name :
                                        item.label === 'Mail' ? email :
                                            item.label === 'Password' ? password :
                                                item.label === 'Nickname' ? nickname :
                                                    item.label === 'Apellido' ? lastname :
                                                        ""
                                }
                                onChangeText={(value) => handleTextChange(value, item.label)}
                                error={
                                    (item.label === 'Nombre' && nameError !== "") ||
                                    (item.label === 'Apellido' && lastnameError !== "") ||
                                    (item.label === 'Nickname' && nicknameError !== "") ||
                                    (item.label === 'Mail' && emailError !== "")
                                }

                            />
                            {item.label === 'Nombre' && nameError !== "" && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{nameError}</Text>
                            )}
                            {item.label === 'Apellido' && lastnameError !== "" && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{lastnameError}</Text>
                            )}
                            {item.label === 'Nickname' && nicknameError !== "" && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{nicknameError}</Text>
                            )}
                            {item.label === 'Mail' && emailError !== "" && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{emailError}</Text>
                            )}
                        </View>
                    ))
                }
            </View>
            <View style={{...createAccountStyle.next_button_container}}>
                <TouchableOpacity onPress={handleNext}>
                    <View style={{...createAccountStyle.next_button,backgroundColor:'#475a7e'}}>
                        <Text style={{...createAccountStyle.text_button,fontSize:20}}>Siguiente</Text>
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
