import {Animated, TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Fontisto';
import React, {useEffect, useRef, useState} from "react";
import {Badge, IconButton, Text} from 'react-native-paper';
import {post_style} from "../../../assets/styles/feed/feed_style";

export const Likes = () => {
    const myIcon = <Icon name="rocket" size={30} color="#900" />
    const [iconName,setIconName] = useState("heart-outline");
    const [isPressed, setIsPressed] = useState(false);
    const [iconColor, setIconColor] = useState('#d2d4d7');
    const pressButton = (isPressed) => {
        if(isPressed) {
            setIconName("heart-outline");
            setIconColor('#d2d4d7');

        } else{
            setIconName("heart");
            setIconColor('#e80e0e');
        }
        setIsPressed(!isPressed);
    }


    return(
        <TouchableOpacity style={{...post_style.icon_container}} onPress={() => pressButton(isPressed)}>
                <IconButton
                    icon={iconName}
                    size={37}
                    color={iconColor}
                    style={{margin:0,width:'50%'}}
                />
                <Text>
                    {100}
                </Text>



        </TouchableOpacity>
    )
}

