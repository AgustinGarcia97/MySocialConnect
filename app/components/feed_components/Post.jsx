import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {post_style} from "../../assets/styles/feed/feed_style";
import {View} from "react-native";
import {CarouselPost} from "./post_components/carousel/carousel_components/CarouselPost";
import {Comments} from "./post_components/Comments";
import {Likes} from "./post_components/Likes";


const LeftContent = props => <Avatar.Icon {...props} icon="heart" />
const list = [1,2,3,4,5,6,7,8,9];
const list2 = [1,2];
export const Post = () => (

    list.map((item, index) => (
        <Card style={post_style.container} key={index}>
            <View  style={post_style.title_container}>
                <Card.Title
                    title="John Doe"
                    subtitle="@username"
                    left={LeftContent}
                    style={post_style.post_title}
                />
            </View>
            <View style={{height:270}}>
                <CarouselPost/>
            </View>



            <View style={post_style.social_container}>

                <View style={{width:'100%',flexDirection:'row'}}>
                    <Likes></Likes>
                    <Comments></Comments>
                </View>
            </View>

        </Card>
    ))



);


