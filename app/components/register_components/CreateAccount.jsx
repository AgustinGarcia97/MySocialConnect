import {Image, TouchableOpacity, View} from "react-native";
import {TextInput,Text} from "react-native-paper";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setBirthdateSlice,
    setEmailSlice,
    setNameSlice,
    setPasswordSlice,
    setPhoneNumberSlice
} from "../../redux/slices/registerSlice";
import {createAccountStyle, register_style} from "../../assets/styles/register/register_style";


const input_list = [
    {
        label:'Nombre',
    },
    {
        label:'Numero de movil',
    },
    {
        label:'Email',
    },
    {
        label:'Fecha de nacimiento',
    }
]



export const CreateAccount = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const dispatch = useDispatch();

    const handleTextChange = (e, label) => {

        switch (label){
            case 'Nombre':
                setName(e);
                break;
            case 'Email':
                setEmail(e);
                break;
            case 'Password':
                setPassword(e);
                break;
            case 'Numero de movil':
                setPhone(e);
                break;
            case 'Fecha de nacimiento':
                setBirthdate(e);
                break;
            default:
                alert(label);
        }
    }
    return(
        <View style={{...createAccountStyle.create_account_container}}>
            <View style={{...createAccountStyle.logo_title_container}}>
                <View style={{...register_style.register_logo_container}}>
                    <Image source={require('../../assets/logos/logo.png')}
                           style={{...register_style.logo,height:150,width:150}} resizeMode="cover"
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
                                        item.label === 'Email' ? email :
                                            item.label === 'Password' ? password :
                                                item.label === 'Numero de movil' ? phone :
                                                    item.label === 'Fecha de nacimiento' ? birthdate :
                                                        ""
                                }
                                onChangeText={(value) => handleTextChange(value, item.label)}
                            />
                        </View>
                    ))
                }
            </View>
            <View style={{...createAccountStyle.next_button_container}}>
                <TouchableOpacity onPress={() => navigation.navigate('CreatePassword')}>
                    <View style={{...createAccountStyle.next_button}}>
                        <Text style={{...createAccountStyle.text_button}}>Siguiente</Text>
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
