import {NavigationContainer} from "@react-navigation/native";
import {Feed} from "../views/Feed";

import {Profile} from "../views/Profile";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {TouchableOpacity, View} from "react-native";
import {CustomHeaderButton} from "./navigation_components/CustomHeaderButton";


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
                <Drawer.Screen name="Feed" component={Feed} />
                <Drawer.Screen name="Profile" component={Profile} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
