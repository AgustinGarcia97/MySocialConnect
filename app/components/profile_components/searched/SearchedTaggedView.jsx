import {Dimensions, FlatList, Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import {profile_style} from "../../../assets/styles/profile/profile_style";
import * as React from "react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {fetch_taggedPost} from "../../../api/fetch_post";

const { width } = Dimensions.get('window');

const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => alert('post')}>
        <View  style={profile_style.imageContainer}>
            <Image source={{  uri: item?.photoList?.[0]?.photoUrl || 'https://images.vexels.com/content/143590/preview/taped-instant-photo-b2e399.png'}} style={{width:(width/2), height:(width/2)}} />
        </View>
    </TouchableOpacity>
)

export const SearchedTaggedView = () => {
    const [posts,setPost] = useState([]);
    const userId = useSelector((state) => state.user.searched.userId);


    useEffect( () => {
        const fetchPosts = async () => {
            const fetched = await fetch_taggedPost(userId);
            setPost(fetched);
        }
        fetchPosts()
    },[])

    useEffect( () => {
            console.log("TAGED",posts);
    },
       [posts]
    )

    return(
        <SafeAreaView style={{...profile_style.user_profile_post_container,aspectRatio:0.80}}>
            <FlatList
                data={posts}
                styles={{aspectRatio: 1}}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </SafeAreaView>
    )
}
