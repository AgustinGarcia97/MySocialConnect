import {profile_style} from "../../assets/styles/profile/profile_style";
import {Dimensions, FlatList, Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import index from "../feed_components/post_components/carousel/data";
import * as React from "react";

const { width } = Dimensions.get('window');

const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => alert('post')}>
        <View  style={profile_style.imageContainer}>
            <Image source={{ uri: item.img }} style={{width:(width/2), height:(width/2)}} />
        </View>
    </TouchableOpacity>
)



export const LikedPostsComponent = () => {
    return(
        <SafeAreaView style={{...profile_style.user_profile_post_container,aspectRatio:0.80}}>
            <FlatList
                data={index}
                styles={{aspectRatio: 1}}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </SafeAreaView>
    )
}
