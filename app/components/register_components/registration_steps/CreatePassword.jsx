import {useState} from "react";
import {useDispatch} from "react-redux";
import {Image, TouchableOpacity, View} from "react-native";

import {Text, TextInput} from "react-native-paper";
import {createAccountStyle, register_style} from "../../../assets/styles/register/register_style";
import {create} from "react-test-renderer";


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

    const dispatch = useDispatch();

    const handleTextChange = (e, label) => {

        switch (label){
            case 'Contraseña':
                setPassword(e);
                break;
            case 'Ingresa nuevamente la contraseña':
                setConfirmPassword(e);
                break;
            default:
                alert(label);
        }
    }
    return(
        <View style={{...createAccountStyle.create_account_container}}>
            <View style={{...createAccountStyle.logo_title_container}}>
                <View style={{...register_style.register_logo_container}}>
                    <Image source={require('../../../assets/logos/logo.png')}
                           style={{...register_style.logo,height:150,width:150}} resizeMode="cover"
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

                            />
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

                <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                    <View style={{...createAccountStyle.next_button}}>
                        <Text style={{...createAccountStyle.text_button}}>Registrarse</Text>
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
