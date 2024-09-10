import {NavigationContainer} from "@react-navigation/native";
import {Feed} from "../views/Feed";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Navbar} from "../components/Navbar";
const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="Feed">
                <Stack.Screen name="none" component={Feed} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
