import {profile_style} from "../../assets/styles/profile/profile_style";
import {Dimensions, FlatList, Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import index from "../feed_components/post_components/carousel/data";
import * as React from "react";
import {useState} from "react";
import {useSelector} from "react-redux";

const { width } = Dimensions.get('window');

const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => alert('post')}>
        <View  style={profile_style.imageContainer}>
            <Image source={{ uri: item.photoList[0].photoUrl }} style={{width:(width/2), height:(width/2)}} />
        </View>
    </TouchableOpacity>
)



export const UserPostsComponent = () => {
    const searched = useSelector((state) => state.user.searched);
    const [postSelected, setPostSelected] = useState(useSelector(state => state.user.posts));


    return(
        <SafeAreaView style={{...profile_style.user_profile_post_container,aspectRatio:0.80}}>
            <FlatList
                data={postSelected}
                styles={{aspectRatio: 1}}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
            />
        </SafeAreaView>
    )
}
