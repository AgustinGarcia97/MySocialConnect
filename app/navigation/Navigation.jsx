import {NavigationContainer} from "@react-navigation/native";
import {Feed} from "../views/Feed";

import {Navbar} from "../components/Navbar";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Profile} from "../views/Profile";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export const Navigation = () => {
    return (

        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Feed} />
                <Tab.Screen name="Settings" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
