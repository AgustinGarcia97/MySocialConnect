import {NavigationContainer} from "@react-navigation/native";
import {Feed} from "../views/Feed";
import {Profile} from "../views/Profile";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {CustomHeaderButton} from "./navigation_components/CustomHeaderButton";
import {Register} from "../views/Register";
import {Login} from "../views/Login";
import {CreateAccount} from "../components/register_components/CreateAccount";
import {CreateByApple} from "../components/register_components/CreateByApple";
import {CreateByGoogle} from "../components/register_components/CreateByGoogle";
import {CreatePassword} from "../components/register_components/registration_steps/CreatePassword";
import {Button, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";


const Drawer = createDrawerNavigator();



export const Navigation = () => {
    return (

        <NavigationContainer>
            <Drawer.Navigator
                initialRouteName="Feed"
                screenOptions={({ navigation }) => ({
                    headerRight: () => <CustomHeaderButton navigation={navigation} />,
                    drawerPosition: 'right',
                    headerLeft: () => null,
                    headerStyle: {
                        backgroundColor: '#475a7e',
                    },

                })}


            >
                <Drawer.Screen name="Feed" component={Feed}   options={{ headerTitle:'' }}  />
                <Drawer.Screen name="Profile" component={Profile}  options={ ({navigation}) => (
                    { headerTitle:'',headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                                <Icon
                                    name={'chevron-back'}
                                    size={30}
                                /></TouchableOpacity>
                        ) })}/>
                <Drawer.Screen name="Register" component={Register}
                               options={ ({navigation}) => (
                                   { headerTitle:'',headerLeft: () => (
                                           <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                                               <Icon
                                                   name={'chevron-back'}
                                                   size={30}
                                               /></TouchableOpacity>
                                       ) })}/>
                <Drawer.Screen name="Login" component={Login}
                               options={ ({navigation}) => (
                                    { headerTitle:'',headerLeft: () => (
                                <TouchableOpacity onPress={() => navigation.navigate('Feed')}>
                                    <Icon
                                        name={'chevron-back'}
                                        size={30}
                                    /></TouchableOpacity>
                        ) })}/>
                <Drawer.Screen name="CreateAccount" component={CreateAccount}
                               options={ ({navigation}) => (
                                    { headerTitle:'',drawerItemStyle:{display:'none'},headerLeft: () => (
                                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                                            <Icon
                                                name={'chevron-back'}
                                                size={30}
                                            /></TouchableOpacity>
                        ) })}/>

                <Drawer.Screen name="RegisterApple" component={CreateByApple}
                               options={ ({navigation}) => (
                                   { headerTitle:'',drawerItemStyle:{display:'none'},headerLeft: () => (
                                           <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                                               <Icon
                                                   name={'chevron-back'}
                                                   size={30}
                                               />
                                           </TouchableOpacity>

                                       ) })}/>

                <Drawer.Screen name="RegisterGoogle" component={CreateByGoogle}
                               options={ ({navigation}) => (
                                   { headerTitle:'',drawerItemStyle:{display:'none'},headerLeft: () => (
                                           <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                                               <Icon
                                                   name={'chevron-back'}
                                                   size={30}
                                               />
                                           </TouchableOpacity>

                                       ) })}/>
                <Drawer.Screen name="CreatePassword" component={CreatePassword}
                               options={ ({navigation}) => (
                    { headerTitle:'',drawerItemStyle:{display:'none'},headerLeft: () => (
                            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
                                <Icon
                                    name={'chevron-back'}
                                    size={30}
                                />
                            </TouchableOpacity>

                    ) })}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
