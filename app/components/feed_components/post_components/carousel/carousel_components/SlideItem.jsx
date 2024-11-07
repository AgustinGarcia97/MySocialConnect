import {Image, useWindowDimensions, View, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import {useDispatch} from "react-redux";
import {openTaggedPeopleModal} from "../../../../../redux/slices/modalSlice";
export const SlideItem = ({item}) => {
    const {width} = useWindowDimensions();
    const dispatch = useDispatch();

    const handleTaggedPeople = () => {
        dispatch(openTaggedPeopleModal());
    }
    return(

            <View style = {{...styles.container,width}}>
                <Image style={{...styles.image}}   source={{uri: item.img}}/>
                <TouchableOpacity onPress={()=>{handleTaggedPeople()}}>
                    <Icon name={"user-circle-o"} style={{
                        position: 'absolute',
                        fontSize:30,
                        color: 'rgba(0, 0, 0, 0.7)',
                        bottom: 10,
                        right: 160,
                    }}/>
                </TouchableOpacity>
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


