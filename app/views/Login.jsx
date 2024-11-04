import {register_style} from "../assets/styles/register/register_style";
import {Image, TouchableOpacity, View} from "react-native";
import {Text, TextInput} from "react-native-paper";
import {GoogleIcon} from "../assets/icons/GoogleIcon";
import Icon from "react-native-vector-icons/FontAwesome";

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
        name: 'google',
        text: 'Registrate con el mail o numero de movil',
        navigate: 'CreateAccount'
    }
]

export const Login = ({navigation}) => {

    return(
        <View style={{...register_style.register_container}}>
            <View style={{...register_style.register_logo_container}}>
                <Image source={require('../assets/logos/logo.png')}
                       style={{...register_style.logo}} resizeMode="cover"
                ></Image>

            </View>
            <View style={{...register_style.register_text_container,height:180, }}>
                <View style={{...register_style.register_title_container, marginTop: 30}}>
                    <Text style={{...register_style.register_title}}>
                        <Text style={{...register_style.shadow_subtitle,color:'#f5d03d'}}>My</Text> <Text style={{...register_style.shadow_subtitle,color:'#d007a4'}}>Social</Text> <Text style={{...register_style.shadow_subtitle,  color:'#0cdea6'}}>Connect</Text>
                    </Text>
                </View>
            </View>
            <View style={{...register_style.register_options_container,marginBottom:20, gap:10}}>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#888"
                    style={{backgroundColor:'#fff'}}

                />
                <TextInput
                    style={{backgroundColor:'#fff'}}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    placeholderTextColor="#888"
                />
            </View>
            <View style={{width:'100%',justifyContent:'center',alignItems:'center',}}>
                <TouchableOpacity style={{ width:'100%', justifyContent:'center', alignItems: 'center'}} >
                    <View style={{
                        width:'90%',
                        backgroundColor: '#475a7e',
                        justifyContent:'center',
                        alignItems:'center',
                        height:50,
                        borderRadius:10,
                    }}
                    >
                        <Text style={{fontSize:20, fontWeight:'bold', color:'#fff'}}>Ingresar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{...register_style.existing_account_container}}>
                <Text style={{...register_style.simple_text}}>No tenes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text  style={{...register_style.pressable_text}}>Registrate acá</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}
