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
import {TouchableOpacity, Text, Button} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getToken, removeToken } from "../api/token/manage_token";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {clearData} from "../redux/slices/userSlice";
import {SearchedProfile} from "../views/SearchedProfile";
import {SetProfilePicBio} from "../components/register_components/registration_steps/SetProfilePicBio";



const Drawer = createDrawerNavigator();

export const Navigation = () => {
    const [hasToken, setHasToken] = useState(false);
    const isFocused = useIsFocused(); // Detecta si la pantalla está enfocada
    const [token,setToken] = useState( useSelector(state => state.user.token) );
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(clearData());
        setHasToken(false);
    };

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

                    <>
                        <Button
                            title="Logout"
                            onPress={() => {
                                handleLogout(navigation);
                            }}
                        />
                        <Button
                            title={"Feed"}
                            onPress={() => navigation.navigate("Feed")}
                        />
                        <Button
                            title={"Perfil"}
                            onPress={() => navigation.navigate("Profile")}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            title={"Iniciar sesión"}
                            onPress={() => navigation.navigate("Login")}
                        />
                        <Button
                            title={"Registrarse"}
                            onPress={() => navigation.navigate("Register")}
                        />
                    </>
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
