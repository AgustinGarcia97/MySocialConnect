import {FlatList, View,StyleSheet} from "react-native";
import Slides from "../data";
import * as React from "react";
import Slide from "../data";
import {SlideItem} from "./SlideItem";

export const Carousel = () => {
    return(
        <View style={{...styles.container}}>
            <FlatList
                data={Slide}
                renderItem={({item}) => (
                    <SlideItem item={item}/>
                )}
                horizontal
                showsHorizontalScrollIndicator
                pagingEnabled
                snapToAlignment="center"


            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'red',
    }
})
