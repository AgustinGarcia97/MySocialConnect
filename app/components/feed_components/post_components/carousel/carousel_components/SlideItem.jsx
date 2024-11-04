import {Image, useWindowDimensions, View,StyleSheet} from "react-native";
import * as React from "react";

export const SlideItem = ({item}) => {
    const {width} = useWindowDimensions();

    return(
        <View style = {{...styles.container,width}}>
            <Image style={{...styles.image}}   source={{uri: item.img}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

        justifyContent:'center',
        alignItems: 'center',
        height:500,
    },
    image:{

        justifyContent:'center',
        width: '100%',
        height: 500,


    }
})
