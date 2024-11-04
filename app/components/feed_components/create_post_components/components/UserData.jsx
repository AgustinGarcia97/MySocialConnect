import {View,Text,StyleSheet} from "react-native";
import AvatarIcon from "react-native-paper/src/components/Avatar/AvatarIcon";
import {Avatar} from "react-native-paper";
import {modal_comments} from "../../../../assets/styles/feed/feed_style";

export const UserData = () => {
    return(
        <View style={userDataStyle.container}>
            <View style={userDataStyle.img_container}>
                <Avatar.Image
                    size={70}
                    source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}} />
            </View>
            <View style={userDataStyle.text_container}>
                <Text style={userDataStyle.title}>User</Text>
                <Text style={userDataStyle.subtitle}>@username</Text>
            </View>
        </View>
    )
}

const userDataStyle = StyleSheet.create({
    container: {

        height: 100,
        width:'100%',
        flexDirection:'row',
        boxSizing: 'border-box',
        justifyContent:'center',
        gap:0,


    },
    img_container:{

        justifyContent:'center',

    },
    text_container:{

        width:'70%',
        justifyContent:'center',
        marginLeft:20,

    },
    title:{
        fontSize:33,
        fontWeight:'bold',
        bottom:0,
        color:'#000'
    },
    subtitle:{
        fontSize:18,
        fontWeight:'',
    }
})
