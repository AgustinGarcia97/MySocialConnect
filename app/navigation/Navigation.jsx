import {NavigationContainer} from "@react-navigation/native";
import {Feed} from "../views/Feed";
import {Profile} from "../views/Profile";
import { createDrawerNavigator } from '@react-navigation/drawer';
import {CustomHeaderButton} from "./navigation_components/CustomHeaderButton";
import {Register} from "../views/Register";
import {Login} from "../views/Login";


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
                })}>
                <Drawer.Screen name="Feed" component={Feed}  />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Register" component={Register} options={{ headerShown: false }}/>
                <Drawer.Screen name="Login" component={Login}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
