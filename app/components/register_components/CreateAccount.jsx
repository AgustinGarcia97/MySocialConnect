import {Image, TouchableOpacity, View} from "react-native";
import {TextInput,Text} from "react-native-paper";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setBioSlice,
    setBirthdateSlice,
    setEmailSlice, setLastNameSlice,
    setNameSlice,
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
        label:'Email',
    },
    {
        label:'Username',
    },

]



export const CreateAccount = ({navigation}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const dispatch = useDispatch();

    const handleTextChange = (e, label) => {

        switch (label){
            case 'Nombre':
                setName(e);
                dispatch(setNameSlice(e));
                break;
            case 'Apellido':
                setLastname(e);
                dispatch(setLastNameSlice(e));
                break;
            case 'Email':
                setEmail(e);
                dispatch(setEmailSlice(e));
                break;
            case 'Username':
                setUsername(e);
                dispatch(setUsernameSlice(e));
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
                                                item.label === 'Username' ? username :
                                                    item.label === 'Apellido' ? lastname :
                                                        ""
                                }
                                onChangeText={(value) => handleTextChange(value, item.label)}
                            />
                        </View>
                    ))
                }
            </View>
            <View style={{...createAccountStyle.next_button_container}}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfilePicBio')}>
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
