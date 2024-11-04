import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {post_style} from "../assets/styles/feed/feed_style";
import {TouchableOpacity, View, StyleSheet, FlatList, useWindowDimensions, Image} from "react-native";

import {Comments} from "../components/feed_components/post_components/Comments";
import {Likes} from "../components/feed_components/post_components/Likes";
import {useState} from "react";
import {closeCommentModal, openCommentModal} from "../redux/slices/modalSlice";
import {useDispatch} from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {Carousel} from "../components/feed_components/post_components/carousel/carousel_components/Carousel";







const LeftContent = props => (  <Avatar.Image
    size={45}
    source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
    style={{flex:1,justifyContent:'center',backgroundColor:'transparent'}} /> )

const list = [1,2,3,4,5,6,7,8,9];
const list2 = [1,2];


export const Post = () => {
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.`;
    const maxLength = 100;
    const dispatch = useDispatch();
    const [showFullText, setShowFullText] = useState(false);
    const pressButton = () => {
        dispatch(openCommentModal());

    }

    const toggleText = () => {
        setShowFullText(!showFullText);
    };

    return(
        <View style={{...style.feed_container}}>
            <View style={{...style.user_data}}>
                <View>
                   <LeftContent/>
                </View>
                <View>
                    <Text>Username</Text>
                    <Text>@Username</Text>
                </View>
            </View>
            <View>

            </View>
            <View style={{...style.carousel_container}}>
                <Carousel/>
            </View>
            <View style={{
                width:'100%',

                padding:14,
                marginLeft:10,
            }}>
                <Text>
                    <Text style={{fontWeight:'bold', fontSize:14, }}>Username</Text>
                    {' '}
                    {showFullText ? text : `${text.substring(0, maxLength)}...`}
                    <Text  onPress={toggleText} style={{color:'#4b62b6'}}>
                        {showFullText ? 'View Less' : 'View More'}
                    </Text>
                </Text>
                <TouchableOpacity style={{marginVertical:5}} onPress={pressButton}>
                    <Text>Ver los comentarios</Text>
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
            gap:20,
        },
        user_data:{
            backgroundColor:'#475a7e',
            width:'100%',
        },
        carousel_container:{
            flex:1,
            backgroundColor:'#fff',
            alignItems:"center",
            justifyContent:'center',
        }
    })








/*
 const [showFullText, setShowFullText] = useState(false);
    const text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.`;
    const maxLength = 100;
    const dispatch = useDispatch();
    const pressButton = () => {
        dispatch(openCommentModal());

    }


    const toggleText = () => {
        setShowFullText(!showFullText);
    };
    return(
    list.map((item, index) => (
        <Card style={post_style.container} key={index}>
            <View  style={post_style.title_container}>
                <Card.Title
                    title="John Doe"
                    subtitle="@username"
                    left={LeftContent}
                    style={post_style.post_title}
                    titleStyle={{ color: '#fff',fontSize:20,fontWeight: 'bold' }}
                    subtitleStyle={{ color: '#fff',fontSize:15, }}

                />
            </View>
            <View style={{height:25,backgroundColor:'#7c7b7b',width:450,padding:2}}>
                <Icon name="location-sharp" size={20} color="#475A7E" />
                <Text style={{color:'#fff'}}>Ubicacion</Text>
            </View>
            <View style={{height:270}}>
                <CarouselPost/>
            </View>

            <View style={post_style.social_container}>

                <View style={{width:'100%',flexDirection:'row',flexWrap:'wrap'}}>
                    <Likes></Likes>
                    <Comments ></Comments>
                    <Text style={{width:'100%', marginLeft:8, marginVertical:5}}>100 Me gusta</Text>
                </View>


            </View>
            <View style={{
                width:'100%',
                height:'auto',
                padding:14,
                marginLeft:10,
            }}>
                <Text>
                    <Text style={{fontWeight:'bold', fontSize:14, }}>Username</Text>
                    {' '}
                    {showFullText ? text : `${text.substring(0, maxLength)}...`}
                    <Text  onPress={toggleText} style={{color:'#4b62b6'}}>
                        {showFullText ? 'View Less' : 'View More'}
                    </Text>
                </Text>
                <TouchableOpacity style={{marginVertical:5}} onPress={pressButton}>
                    <Text>Ver los comentarios</Text>
                </TouchableOpacity>
                <Text>Hace un dia</Text>
            </View>


        </Card>
    ))



);
*
*
* */
