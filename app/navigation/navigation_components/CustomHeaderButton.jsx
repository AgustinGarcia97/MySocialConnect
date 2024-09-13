import {TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Avatar} from "react-native-paper";

export const CustomHeaderButton = ({ navigation }) => (
    <View style={{ flexDirection: 'row', justifyContent:'center' , alignItems: 'center', height:'100%', width:'20%'}}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Avatar.Image
                size={30}
                source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} />
        </TouchableOpacity>
    </View>
);
