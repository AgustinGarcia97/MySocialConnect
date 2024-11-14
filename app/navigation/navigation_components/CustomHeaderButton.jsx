import {TextInput, TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Avatar} from "react-native-paper";
import {Searchbar} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {openSearchBarModal} from "../../redux/slices/modalSlice";
import Icon from 'react-native-vector-icons/FontAwesome';
export const CustomHeaderButton = ({ navigation }) => {
    const profilePic = useSelector((state) => state.user.profilePic);
    return(
    <View style={{ flexDirection: 'row', justifyContent:'center' , alignItems: 'center', height:'100%', width:'40%'}}>

        <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
            <View style={{borderWidth:2,borderColor:'rgba(253,252,252,0.45)',borderRadius:50}}>
                <Avatar.Image
                    size={43}
                    style={{
                        borderColor: '#e5dede',


                    }

                    }
                    source={{ uri: profilePic?.photoUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}  />
            </View>

        </TouchableOpacity>
    </View>
); }

export const Search = () => {
    const dispatch = useDispatch();
    return (
        <TouchableOpacity onPress={() => {
            dispatch(openSearchBarModal())
        }}>
            <View style={{

                height:49,
                width:49,
                backgroundColor:'#e7dfdf',
                borderWidth:2,
                borderColor:'rgba(217,210,210,0.4)',
                marginLeft: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                overflow: 'hidden'
            }}>
                <Icon
                    name="search"

                    style={{
                       fontSize: 30,
                        borderRadius: 25,

                    }}
                />
            </View>
        </TouchableOpacity>

    );
}
