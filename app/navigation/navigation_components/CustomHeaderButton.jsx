import {TextInput, TouchableOpacity, View} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {Avatar} from "react-native-paper";
import {Searchbar} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {openSearchBarModal} from "../../redux/slices/modalSlice";
export const CustomHeaderButton = ({ navigation }) => {
    const profilePic = useSelector((state) => state.user.profilePic);
    return(
    <View style={{ flexDirection: 'row', justifyContent:'center' , alignItems: 'center', height:'100%', width:'40%'}}>

        <TouchableOpacity onPress={() => navigation.toggleDrawer()} >
            <View style={{borderWidth:2,borderColor:'rgba(253,252,252,0.45)',borderRadius:50}}>
                <Avatar.Image
                    size={43}
                    style={{  // Incrementa el ancho del borde si es necesario
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

                width: 35,
                height: 35,
                marginLeft: 35,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
                overflow: 'hidden'
            }}>
                <Searchbar
                    icon="magnify" // Esto muestra el ícono de búsqueda
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25, // Hace el Searchbar redondo
                        backgroundColor: '#b9b6b6' // Cambia el color de fondo si lo necesitas
                    }}
                />
            </View>
        </TouchableOpacity>

    );
}
