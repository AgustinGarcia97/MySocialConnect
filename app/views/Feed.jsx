import * as React from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {ScrollView, View} from "react-native";
import {styles} from "../assets/styles/home_style";
import {Post} from "../components/feed_components/Post";
import {InputPost} from "../components/feed_components/post_components/InputPost";
import {feedStyles} from "../assets/styles/feed/feed_style";
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export const Feed = () => {
    return (
        <View style={feedStyles.feed_layout}>
            <View>
                <Text>Feed</Text>
            </View>
            <View style={feedStyles.text_container}>
                <InputPost></InputPost>
            </View>
            <ScrollView>
                <View>
                    <Post>
                    </Post>
                </View>
            </ScrollView>

        </View>
    );
};


