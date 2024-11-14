import {NavigationContainer, useNavigation} from "@react-navigation/native";
import { Feed } from "../views/Feed";
import { Profile } from "../views/Profile";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {CustomHeaderButton, Search, Searchbar} from "./navigation_components/CustomHeaderButton";
import { Register } from "../views/Register";
import { Login } from "../views/Login";
import { CreateAccount } from "../components/register_components/CreateAccount";
import { CreateByApple } from "../components/register_components/CreateByApple";
import { CreateByGoogle } from "../components/register_components/CreateByGoogle";
import { CreatePassword } from "../components/register_components/registration_steps/CreatePassword";
import {TouchableOpacity, Text, Button, View} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getToken, removeToken } from "../api/token/manage_token";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {clearData} from "../redux/slices/userSlice";
import {SearchedProfile} from "../views/SearchedProfile";
import {SetProfilePicBio} from "../components/register_components/registration_steps/SetProfilePicBio";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetch_delete_account} from "../api/fetch_user_data";



const Drawer = createDrawerNavigator();

export const Navigation = () => {
    const [hasToken, setHasToken] = useState(false);
    const isFocused = useIsFocused();
    const [token, setToken] = useState(null);
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userId);
    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("userToken");
            setToken(storedToken);
        };

        fetchToken();
    }, []);



    const handleLogout = async () => {
        dispatch(clearData());
        await AsyncStorage.removeItem("userToken");
        setHasToken(false);
    };

    const handlerDeleteAccount = async () => {
        const flag = await fetch_delete_account(userId)
        if(flag){
            alert("Tu cuenta ha sido dada de baja.")
            await handleLogout()

        } else {
            alert("Hubo un error al dar de baja tu cuenta.")
        }


    }

    useEffect(() => {
        if (token) {
            setHasToken(true);
        } else {
            setHasToken(false);
        }
    }, [token]);

    function CustomDrawerContent() {
        const navigation = useNavigation();
        const token = useSelector(state => state.user.token);
        return (
            <>
                {token ? (

                     <View style={{alignItems:"center",width:'100%', gap:20,}}>
                        <TouchableOpacity style={{width:'100%', alignItems:'center'}}  onPress={() => {handleLogout(navigation);}}>
                            <View style={{width:'95%',height:40, backgroundColor:'rgba(255,255,255,0.72)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                                <Text style={{fontSize:18, fontWeight:'700'}}>Logout</Text>
                            </View>

                        </TouchableOpacity>

                         <TouchableOpacity style={{width:'100%', alignItems:'center'}} onPress={() => navigation.navigate("Feed")}>
                             <View style={{width:'95%',height:40, backgroundColor:'rgba(255,255,255,0.72)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                                 <Text style={{fontSize:18, fontWeight:'700'}}>Feed</Text>
                             </View>

                         </TouchableOpacity>

                         <TouchableOpacity style={{width:'100%', alignItems:'center'}} onPress={() => navigation.navigate("Profile")}>
                             <View style={{width:'95%',height:40, backgroundColor:'rgba(255,255,255,0.72)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                                 <Text style={{fontSize:18, fontWeight:'700'}}>Mi Perfil</Text>
                             </View>
                         </TouchableOpacity>

                         <TouchableOpacity style={{width:'100%', alignItems:'center'}} onPress={() => handlerDeleteAccount()}>
                             <View style={{width:'95%',height:40, backgroundColor:'rgba(255,255,255,0.72)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                                 <Text style={{fontSize:18, fontWeight:'700'}}>Borrar cuenta</Text>
                             </View>
                         </TouchableOpacity>


                    </View>
                ) : (

                        <View style={{alignItems:"center",width:'100%', gap:20,}}>

                                <TouchableOpacity style={{width:'100%', alignItems:'center'}} onPress={() => navigation.navigate("Feed")}>
                                    <View style={{width:'95%',height:40, backgroundColor:'rgba(255,255,255,0.72)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                                        <Text style={{fontSize:18, fontWeight:'700'}}>Feed</Text>
                                    </View>
                                </TouchableOpacity>




                            <TouchableOpacity  style={{width:'100%', alignItems:'center'}}   onPress={() => navigation.navigate("Login")}>
                                <View style={{width:'95%',height:40, backgroundColor:'rgba(255,255,255,0.72)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                                    <Text  style={{fontSize:18, fontWeight:'700'}}>Iniciar sesión</Text>
                                </View>

                            </TouchableOpacity>

                            <TouchableOpacity style={{width:'100%', alignItems:'center'}}    onPress={() => navigation.navigate("Register")}>
                                <View style={{width:'95%',height:40, backgroundColor:'rgba(255,255,255,0.72)',alignItems:'center',justifyContent:'center',borderRadius:50}}>
                                    <Text  style={{fontSize:18, fontWeight:'700'}}>Registrarse</Text>
                                </View>
                            </TouchableOpacity>

                        </View>


                )}
            </>
        );
    }



    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            initialRouteName="Feed"
            screenOptions={({ navigation }) => ({
                headerRight: () => <CustomHeaderButton navigation={navigation} />,
                drawerPosition: 'right',
                headerLeft: () =>    <Search/>,
                headerStyle: {
                    backgroundColor: '#475a7e',
                    height:75,
                },
                drawerStyle: {
                    backgroundColor: 'rgba(71,90,126,0.27)',
                    width: 260,
                    color: '#fff',
                    marginVertical: 10,
                },
                drawerLabelStyle: {
                    color: '#fff',
                    fontSize: 16,
                    textAlign: 'center',
                    justifyContent: 'center',
                    textShadowColor: '#000000',
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 1,
                },
            })}
        >
            <Drawer.Screen name="Feed" component={Feed} options={{ headerTitle: '', color: '#fff' }} />
            <Drawer.Screen name="Profile" component={Profile} options={{ headerTitle: '' }} />
            <Drawer.Screen name="SearchedProfile" component={SearchedProfile} options={{ headerTitle: '' }} />
            <Drawer.Screen name="ProfilePicBio" component={SetProfilePicBio} options={{headerTitle:''}}/>
                <Drawer.Screen
                    name="Logout"
                    component={Feed}
                    options={({ navigation }) => ({
                        headerTitle: '',


                    })}
                />




                    <Drawer.Screen
                        name="Register"
                        component={Register}
                        options={({ navigation }) => ({
                            headerTitle: '',
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                                    <Icon name="chevron-back" size={30} />
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Drawer.Screen
                        name="Login"
                        component={Login}
                        options={({ navigation }) => ({
                            headerTitle: '',
                            headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                                    <Icon name="chevron-back" size={30} />
                                </TouchableOpacity>
                            ),
                        })}
                    />




            {/* Hidden Screens */}
            <Drawer.Screen
                name="CreateAccount"
                component={CreateAccount}
                options={({ navigation }) => ({
                    headerTitle: '',
                    drawerItemStyle: { display: 'none' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Icon name={'chevron-back'} size={30} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Drawer.Screen
                name="RegisterApple"
                component={CreateByApple}
                options={({ navigation }) => ({
                    headerTitle: '',
                    drawerItemStyle: { display: 'none' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                            <Icon name={'chevron-back'} size={30} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Drawer.Screen
                name="RegisterGoogle"
                component={CreateByGoogle}
                options={({ navigation }) => ({
                    headerTitle: '',
                    drawerItemStyle: { display: 'none' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                            <Icon name={'chevron-back'} size={30} />
                        </TouchableOpacity>
                    ),
                })}
            />
            <Drawer.Screen
                name="CreatePassword"
                component={CreatePassword}
                options={({ navigation }) => ({
                    headerTitle: '',
                    drawerItemStyle: { display: 'none' },
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                            <Icon name={'chevron-back'} size={30} />
                        </TouchableOpacity>
                    ),
                })}
            />
        </Drawer.Navigator>
    );
};
