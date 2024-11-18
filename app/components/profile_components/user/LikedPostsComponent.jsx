import {profile_style} from "../../../assets/styles/profile/profile_style";
import {Dimensions, FlatList, Image, SafeAreaView, TouchableOpacity, View} from "react-native";
import index from "../../feed_components/post_components/carousel/data";
import * as React from "react";
import {useEffect, useState} from "react";
import {fetch_likedPost} from "../../../api/fetch_post";
import {useSelector} from "react-redux";

const { width } = Dimensions.get('window');
const renderItem = ({ item }) => {

        return(
            <TouchableOpacity onPress={() => alert('post')}>
                <View  style={profile_style.imageContainer}>
                    <Image source={{  uri: item?.photoList?.[0]?.photoUrl || 'https://images.vexels.com/content/143590/preview/taped-instant-photo-b2e399.png'}} style={{width:(width/2), height:(width/2)}} />
                </View>
            </TouchableOpacity>
            )

}



export const LikedPostsComponent = () => {

    const [posts,setPost] = useState([]);
    const userId = useSelector((state) => state.user.userId);


    useEffect( () => {
        const fetchPosts = async () => {
            const fetched = await fetch_likedPost(userId);
            setPost(fetched);
        }
        fetchPosts()
    },[])

    useEffect(() => {
        console.log("liked:", posts);
    }, [posts]);


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
