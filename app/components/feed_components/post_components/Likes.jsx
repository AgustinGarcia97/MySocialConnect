import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Fontisto';
import { IconButton, Text } from 'react-native-paper';
import { post_style } from "../../../assets/styles/feed/feed_style";
import {useSelector} from "react-redux";
import {dislike, dislike_post, fetchLikeComment} from "../../../api/fetch_post";

export const Likes = ({item, isPressed, setIsPressed,countLikes,setCountLikes}) => {

    const userId = useSelector((state) => state.user.userId);
    const token = useSelector((state) => state.user.token);

    if(token){
        if(item.likes && item.likes.length > 0){
            if (item.likes.some(like => like.user.userId === userId)) {

                setIsPressed(true);
            }
        }

    }


    const pressButton = async () => {
        setIsPressed(!isPressed);
        const postId = item.postId;

        const data ={userId,postId}
        if(isPressed){
            setCountLikes(countLikes-1);
            await  dislike_post(postId,userId);

        }else{
            setCountLikes(countLikes+1);
            await fetchLikeComment(data);


        }

    };

    return (
        token? (
            <TouchableOpacity style={post_style.icon_container} onPress={pressButton}>
                <Icon
                    name={isPressed ? "heart" : "heart-alt"}
                    size={22}
                    color={isPressed ? '#d73232' : '#d2d4d7'}
                    style={{ marginLeft: 2,color: isPressed ? 'red' : 'black' }}
                    rippleColor={isPressed ? 'red' : 'black'}

                />

            </TouchableOpacity>
            ): (
            <TouchableOpacity style={post_style.icon_container} onPress={()=> alert("Debes iniciar sesion para dar like al post.")}>
                <Icon
                    name={isPressed ? "heart" : "heart-alt"}
                    size={22}
                    color={isPressed ? '#d73232' : '#d2d4d7'}
                    style={{ marginLeft: 2,color: isPressed ? 'red' : 'black' }}
                    rippleColor={isPressed ? 'red' : 'black'}

                />

            </TouchableOpacity>
        )

    );
};

