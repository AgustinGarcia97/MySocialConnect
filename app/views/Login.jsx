import { useState } from "react";
import { register_style } from "../assets/styles/register/register_style";
import { Image, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { fetch_login } from "../api/fetch_user_data";
import { useDispatch } from "react-redux";
import {getToken, removeToken, storeToken} from "../api/token/manage_token";
import {fetchUserData} from "../redux/slices/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const data = await fetch_login(dispatch, { email, password });
        if(data){
            dispatch(fetchUserData(data))
            console.log("DATA:",JSON.stringify(data))
            await AsyncStorage.setItem("userToken", data.access_token);
            navigation.navigate('Feed');

        } else{
            console.log(data);
            alert("login: datos erroneos")
        }


    };

    const signout = async () => {
        await removeToken();
        navigation.navigate("Feed");
    };

    return (
        <View style={register_style.register_container}>
            <View style={register_style.register_logo_container}>
                <Image source={require('../assets/logos/logo.png')}
                       style={register_style.logo} resizeMode="cover"
                />
            </View>
            <View style={{...register_style.register_text_container, height:200 }}>
                <View style={{...register_style.register_title_container}}>
                    <Text style={register_style.register_title}>
                        <Text style={{...register_style.shadow_subtitle, color:'rgba(34,59,232,0.42)'}}>My </Text>
                        <Text style={{...register_style.shadow_subtitle, color:'rgba(34,59,232,0.42)'}}>Social </Text>
                        <Text style={{...register_style.shadow_subtitle, color:'rgba(34,59,232,0.42)'}}>Connect</Text>
                    </Text>
                </View>
            </View>
            <View style={{...register_style.register_options_container, marginBottom: 20, gap: 10}}>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#888"
                    style={{backgroundColor:'#fff'}}
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={{backgroundColor:'#fff'}}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
            </View>
            <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{ width: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={handleLogin}>
                    <View style={{
                        width: '90%',
                        backgroundColor: '#475a7e',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50,
                        borderRadius: 10,
                    }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff' }}>Ingresar</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={register_style.existing_account_container}>
                <Text style={register_style.simple_text}>No tenes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={register_style.pressable_text}>Registrate acá</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
