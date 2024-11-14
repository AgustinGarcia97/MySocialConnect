import {TouchableOpacity, View, Image} from "react-native";
import {Button, Text} from "react-native-paper";
import  Icon from 'react-native-vector-icons/FontAwesome'
import {register_style} from "../assets/styles/register/register_style";
import {GoogleIcon} from "../assets/icons/GoogleIcon";

const buttons = [
    {
        name: 'google',
        text: 'Registrate con Google',
        navigate: 'RegisterGoogle'
    },
    {
        name: 'apple',
        text: 'Registrate con Apple',
        navigate: "RegisterApple"
    },
    {
        name: '',
        text: 'Registrate con el mail o numero de movil',
        navigate: 'CreateAccount'
    }
]


export const Register = ({navigation}) => {
    return(
        <View style={{...register_style.register_container}}>
            <View style={{...register_style.register_logo_container}}>
                <Image source={require('../assets/logos/logo.png')}
                    style={{...register_style.logo}} resizeMode="cover"
                ></Image>

            </View>
            <View style={{...register_style.register_text_container}}>
                <View style={{...register_style.register_title_container}}>
                    <Text style={{...register_style.register_title}}>
                        <Text style={{...register_style.shadow_subtitle,color:'rgba(34,59,232,0.42)'}}>My</Text> <Text style={{...register_style.shadow_subtitle,color:'rgba(34,59,232,0.42)'}}>Social</Text> <Text style={{...register_style.shadow_subtitle,  color:'rgba(34,59,232,0.42)'}}>Connect</Text>
                    </Text>
                </View>
                <View style={{...register_style.register_subtitle_container}}>
                    <Text style={{...register_style.register_subtitle}}>Unite a <Text style={{...register_style.shadow_subtitle,color:'#526ce7'}}>My</Text> <Text style={{...register_style.shadow_subtitle,color:'#526ce7'}}>Social</Text> <Text style={{...register_style.shadow_subtitle,  color:'#526ce7'}}>Connect</Text> hoy mismo.</Text>
                </View>
            </View>
            <View style={{...register_style.register_options_container}}>
                {buttons.map((button, index) => (
                        <TouchableOpacity onPress={() => navigation.navigate(button.navigate)} key={index}>
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
