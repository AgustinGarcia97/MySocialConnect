import {TouchableOpacity, View} from "react-native";
import {Button, Text} from "react-native-paper";
import  Icon from 'react-native-vector-icons/FontAwesome'
import {register_style} from "../assets/styles/register/register_style";
import {GoogleIcon} from "../assets/icons/GoogleIcon";
const buttons = [
    {
        name: 'google',
        text: 'Registrate con Google'
    },
    {
        name: 'apple',
        text: 'Registrate con Apple'
    },
    {
        name: '',
        text: 'Registrate con el mail o numero de movil'
    }
]


export const Register = ({navigation}) => {
    return(
        <View style={{...register_style.register_container}}>
            <View style={{...register_style.register_logo_container}}>
                <Text style={{}}>Logo app title</Text>
            </View>
            <View style={{...register_style.register_text_container}}>
                <View style={{...register_style.register_title_container}}>
                    <Text style={{...register_style.register_title}}>My Social Connect</Text>
                </View>
                <View style={{...register_style.register_subtitle_container}}>
                    <Text style={{...register_style.register_subtitle}}>Unite a MySocialConnect hoy mismo.</Text>
                </View>
            </View>
            <View style={{...register_style.register_options_container}}>
                {buttons.map((button, index) => (
                        <TouchableOpacity onPress={() => {}} index={index}>
                            <View style={{...register_style.register_option_button,
                                backgroundColor:button.name==='apple'?'#000':'#fff'}}>
                                {button.name==='google'?
                                   <GoogleIcon></GoogleIcon>
                                    :
                                    <Icon
                                        name={button.name}
                                        size={25}
                                        style={{ marginRight: 8, display:button.name===''?"none":'flex' }}
                                        color={button.name==='apple'?'#fff':''}>

                                    </Icon>

                                }

                                <Text style={{...register_style.text_button,color:button.name==='apple'?'#fff':''}}>{button.text}</Text>
                            </View>
                        </TouchableOpacity>
                ))}
            </View>
            <View style={{...register_style.existing_account_container}}>
                <Text style={{...register_style.simple_text}}>Ya tenes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text  style={{...register_style.pressable_text}}>Inicia sesion</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
