import {TouchableOpacity, View,Text} from "react-native";
import {TagIcon} from "../../../../assets/icons/TagIcon";
import Icon from 'react-native-vector-icons/Ionicons';
import {openLocationModal, openPostModal, openTagPeopleModal} from "../../../../redux/slices/modalSlice";
import {useDispatch} from "react-redux";
export const Options = () => {
    const dispatch = useDispatch();

    const pressButtonTag = () => {
        dispatch(openTagPeopleModal());
    }

    const pressButtonLocation = () => {
        dispatch(openLocationModal())
    }


    return(
        <View style={{gap:5}}>
            <TouchableOpacity onPress={()=>{pressButtonTag()}} style={{alignItems:'center',width:'100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center',height:50,width:'90%',
                    backgroundColor:'rgba(255,255,255,0.43)',
                paddingLeft:10,gap:5,}}>
                    <Icon name="person-add-sharp" size={30} color="#475A7E" />
                    <Text style={{fontSize:17}}>
                        Etiquetar personas
                    </Text>

                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{pressButtonLocation()}} style={{alignItems:'center',width:'100%'}}>
                <View style={{flexDirection: 'row', alignItems: 'center',height:50,width:'90%',backgroundColor:'rgba(255,255,255,0.43)',
                    paddingLeft:10,
                    gap:5,

                }}>
                    <Icon name="location-sharp" size={30} color="#475A7E" />
                    <Text style={{fontSize:17}}>
                        Agregar ubicación
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
