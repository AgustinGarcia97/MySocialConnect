import { Appbar } from 'react-native-paper';
import {useNavigation} from "@react-navigation/native";

export const Navbar = ({navigation}) => {

    return(
        <Appbar.Header >
            <Appbar.BackAction onPress={() => {navigation.navigate("Feed")}} />
            <Appbar.Content title="Title" />
            <Appbar.Action icon="calendar" onPress={() => {navigation.navigate('Profile')}} />
            <Appbar.Action icon="magnify" onPress={() => {}} />
        </Appbar.Header>
        )

}
