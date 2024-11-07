import {TextInput, Text, Avatar} from 'react-native-paper';
import React from "react";
import {feedStyles} from "../../../assets/styles/feed/feed_style";
import {TouchableOpacity, View} from "react-native";
import {openPostModal, closePostModal, openCommentModal} from '../../../redux/slices/modalSlice';
import {useDispatch} from "react-redux";


export const InputPost = () => {
    const [text, setText] = React.useState("");
    const dispatch = useDispatch();


    const pressButton = () => {
        dispatch(openPostModal());
    }

    return(

        <TouchableOpacity onPress={ ()=>pressButton()} >
            <View style={{
                flexDirection:'row',

                alignItems:'center',

                height:80,
                borderWidth: 2, // Grosor del borde
                borderColor: 'rgba(143,141,141,0.4)',
                borderRadius:50,
                backgroundColor:'rgba(255,255,255,0.49)',




            }} >
                <Avatar.Image
                    size={70}
                    source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                    style={{ marginHorizontal:20}}

                />
                <Text style={{width:300, fontSize:19,color:'#414141',fontWeight:'bold'}}>
                    Que esta pasando?...
                </Text>

            </View>


        </TouchableOpacity>


    )
}
