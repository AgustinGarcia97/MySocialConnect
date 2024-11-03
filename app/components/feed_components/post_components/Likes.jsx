import React, { useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Fontisto';
import { IconButton, Text } from 'react-native-paper';
import { post_style } from "../../../assets/styles/feed/feed_style";

export const Likes = () => {
    const [isPressed, setIsPressed] = useState(false);

    const pressButton = () => {
        setIsPressed(!isPressed);
    };

    return (
        <TouchableOpacity style={post_style.icon_container} onPress={pressButton}>
            <Icon
                name={isPressed ? "heart" : "heart-alt"}
                size={22}
                color={isPressed ? '#d73232' : '#d2d4d7'}
                style={{ marginLeft: 2,color: isPressed ? 'red' : 'black' }}
                rippleColor={isPressed ? 'red' : 'black'}

            />

        </TouchableOpacity>
    );
};

