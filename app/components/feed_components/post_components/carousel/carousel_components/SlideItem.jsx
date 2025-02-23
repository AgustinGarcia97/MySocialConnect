import {Image, useWindowDimensions, View, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";

import {useDispatch} from "react-redux";
import {openTaggedPeopleModal} from "../../../../../redux/slices/modalSlice";
export const SlideItem = ({item}) => {
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();


    return(

            <View style = {{...styles.container,width}}>
                <Image style={{...styles.image}}   source={{uri: item.photoUrl}}/>

            </View>

    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center',
        height:500,
        position: 'relative',
    },
    image:{
        justifyContent:'center',
        width: '100%',
        height: 500,
    }
})


