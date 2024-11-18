import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {post_style} from "../assets/styles/feed/feed_style";
import {TouchableOpacity, View, StyleSheet, FlatList, useWindowDimensions, Image} from "react-native";

import {Comments} from "../components/feed_components/post_components/Comments";
import {Likes} from "../components/feed_components/post_components/Likes";
import {useEffect, useState} from "react";
import {closeCommentModal, openCommentModal, openTaggedPeopleModal} from "../redux/slices/modalSlice";
import {useDispatch, useSelector} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {Carousel} from "../components/feed_components/post_components/carousel/carousel_components/Carousel";
import {BlurView} from "@react-native-community/blur";
import {setActualPost} from "../redux/slices/postSlice";
import {fetchDeletePost, fetchLikeComment} from "../api/fetch_post";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {TaggedPeople} from "../components/feed_components/post_components/tagged_people/TaggedPeople";







const list = [1,2,3,4,5,6,7,8,9];
const list2 = [1,2];


export const Post = ({item,updatePosts}) => {
    const maxLength = 100;
    const dispatch = useDispatch();
    const [showFullText, setShowFullText] = useState(false);
    const userId = useSelector((state) => state.user.userId);
    const [isPressed, setIsPressed] = useState(false);
    const [countLikes,setCountLikes] = useState(item.likes?item.likes.length:0);
    const isLongText = item.description.length > maxLength;

    const [showViewMore, setShowViewMore] = useState(false);



    const handleTextLayout = (e) => {
        const { lines } = e.nativeEvent;
        if (lines.length > 2) {
            setShowViewMore(true);
        }
    };

    const handlePressButton = async (item) => {
        dispatch(openCommentModal());

    }

    const LeftContent = props => (  <Avatar.Image
        size={55}
        source={{ uri: item.user.profilePicture?.photoUrl? item.user.profilePicture.photoUrl :  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
        style={{justifyContent:'center',backgroundColor:'transparent'}} />
    )


    const handleTaggedPeople = () => {
        dispatch(setActualPost(item));
        dispatch(openTaggedPeopleModal());
    }


    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    const handleDeletePost = async (postId, dispatch) => {
        const posts = await fetchDeletePost(postId, dispatch);
        updatePosts(postId);



    }

    return(


                <View style={{...style.feed_container}}>
                    <View style={{...style.user_data}}>
                        <View style={{marginLeft:17.5,borderRadius:50,borderWidth:2.5,borderColor:'rgb(148,146,146)'}}>
                            <LeftContent/>
                        </View>
                        <View style={{...style.user_text}}>
                            <Text
                                style={{
                                    color:'#fff',
                                    fontWeight:'bold',
                                    fontSize:23,
                                }}
                            >{item.user.name} {item.user.lastname}</Text>
                            <Text style={{
                                color:'#fff',
                                fontSize:15,
                            }}>@{item.user.nickname}</Text>
                        </View>
                        <View  style={{marginLeft:110,alignItems:'center',gap:20}}>
                            {userId === item.user.userId? (
                                    <TouchableOpacity onPress={()=>handleDeletePost(item.postId,dispatch)}>
                                        <EvilIcons name={'trash'} style={{fontSize:30,color:'#fff'}} />
                                    </TouchableOpacity>)
                                :
                                (<></>)
                            }
                            {item.tagged && item.tagged.length>0? (
                                    <TouchableOpacity onPress={()=>{handleTaggedPeople()}}>
                                        <FontAwesome name={"user-circle-o"} style={{
                                            backgroundColor:'#fff',
                                            borderRadius:50,
                                            fontSize:30,
                                            color: 'rgba(0,0,0,0.74)',
                                        }}/>
                                    </TouchableOpacity>
                                )
                                :
                                (<></>)
                            }

                        </View>

                    </View>
                    {
                        item.location? (
                            <View style={{height:25,backgroundColor:'rgba(50,87,100,0.6)',width:450,padding:2,flexDirection:'row',gap:10}}>
                                <Icon name="location-sharp" size={20} color="#475A7E" />
                                <Text style={{color:'#fff',fontSize:13}}>{item.location}</Text>
                            </View>
                        ) : (
                            <>
                            </>
                        )
                    }


                    <View style={{...style.carousel_container}}>
                        <Carousel item={item}/>
                    </View>
                    <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap',marginHorizontal:10,marginVertical:10}}>
                        <Likes item={item} isPressed={isPressed} setIsPressed={setIsPressed} countLikes={countLikes} setCountLikes={setCountLikes}></Likes>
                        <Comments item={item}></Comments>
                        <Text style={{width:'100%', marginLeft:8, marginVertical:5}}>{countLikes} Me gusta</Text>
                    </View>
                    <View style={{
                        width:'93%',
                        marginHorizontal:20,
                        paddingBottom:15,

                    }}>
                        <Text style={{ marginHorizontal: -3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.user.nickname}</Text>
                            {' '}
                            {isLongText
                                ? (showFullText ? item.description : item.description.substring(0, maxLength) + '...')
                                : item.description}
                            {isLongText && (
                                <Text onPress={toggleText} style={{ color: '#4b62b6' }}>
                                    {showFullText ? 'View Less' : 'View More'}
                                </Text>
                            )}
                        </Text>
                        <TouchableOpacity style={{marginVertical:5}} onPress={handlePressButton}>
                            <Text style={{paddingBottom:2}}>Ver los comentarios</Text>
                        </TouchableOpacity>
                        <Text>Hace un dia</Text>
                    </View>

                </View>



    )
    }



    const style = StyleSheet.create({
        feed_container:{
            width:'100%',
            height:'auto',
            backgroundColor:'#fff',
            borderRadius:20,

        },
        user_data:{
            backgroundColor:'#475a7e',
            width:'100%',
            height:100,
            alignItems:'center',

            flexDirection:'row',
            gap:20,

        },
        user_text:{
            color:'#fff',
            gap: 4,
        },
        carousel_container:{
            flex:1,
            backgroundColor:'#fff',
            alignItems:"center",
            justifyContent:'center',
        }
    })









