import {TextInput, Text, Avatar} from 'react-native-paper';
import React, {useEffect, useState} from "react";
import {feedStyles} from "../../../assets/styles/feed/feed_style";
import {TouchableOpacity, View} from "react-native";
import {openPostModal, closePostModal, openCommentModal} from '../../../redux/slices/modalSlice';
import {useDispatch, useSelector} from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const InputPost =  () => {
    const [text, setText] = React.useState("");
    const dispatch = useDispatch();
    const [profilePic,setProfilePic] = useState(useSelector(state => state.user.profilePic));
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("userToken");
            setToken(storedToken);
        };

        fetchToken();
    }, []);

    const pressButton = () => {
        dispatch(openPostModal());
    }

    return(
        token? (
            <TouchableOpacity onPress={ ()=>pressButton()} >
                <View style={{
                    flexDirection:'row',

                    alignItems:'center',
                    padding:3,
                    height:60,
                    borderWidth: 2,
                    borderColor: 'rgba(143,141,141,0.4)',
                    borderRadius:50,
                    backgroundColor:'#475a7e',




                }} >
                    <View style={{borderWidth:1,  borderColor: 'rgba(143,141,141,0.4)', borderRadius:50,marginHorizontal:10,}}>
                        <Avatar.Image
                            size={40}
                            source={{ uri: profilePic.photoUrl? profilePic.photoUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}


                        />
                    </View>

                    <Text style={{
                        width:'80%',
                        fontSize:17,
                        color:'#fff',

                        textShadowColor: 'black',
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 2,

                        backgroundColor:'rgb(227,227,227)',
                        padding:5,
                        textAlign:'center',
                        borderRadius:50,
                        borderWidth:1,
                        borderColor:'rgba(143,141,141,0.4)'
                    }}>
                        ¿Qué esta pasando?...
                    </Text>

                </View>


            </TouchableOpacity>
            ) : (
            <TouchableOpacity onPress={ ()=>{alert("Debes iniciar sesion para crear un post")}} >
                <View style={{
                    flexDirection:'row',

                    alignItems:'center',
                    padding:3,
                    height:60,
                    borderWidth: 2,
                    borderColor: 'rgba(143,141,141,0.4)',
                    borderRadius:50,
                    backgroundColor:'#475a7e',




                }} >
                    <View style={{borderWidth:1,  borderColor: 'rgba(143,141,141,0.4)', borderRadius:50,marginHorizontal:10,}}>
                        <Avatar.Image
                            size={40}
                            source={{ uri: profilePic.photoUrl? profilePic.photoUrl:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}


                        />
                    </View>

                    <Text style={{
                        width:'80%',
                        fontSize:17,
                        color:'#fff',

                        textShadowColor: 'black',
                        textShadowOffset: { width: -1, height: 1 },
                        textShadowRadius: 2,

                        backgroundColor:'rgb(227,227,227)',
                        padding:5,
                        textAlign:'center',
                        borderRadius:50,
                        borderWidth:1,
                        borderColor:'rgba(143,141,141,0.4)'
                    }}>
                        ¿Qué esta pasando?...
                    </Text>

                </View>


            </TouchableOpacity>
        )








    )
}
